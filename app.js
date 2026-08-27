"use strict";

// ===== 語音（Web Speech API，iPad 免費內建） =====
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  return voices.find(v => v.lang && /^en[-_]US$/i.test(v.lang))
      || voices.find(v => v.lang && v.lang.toLowerCase().startsWith("en"))
      || null;
}
function primeSpeech() {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(" ");
    u.voice = pickVoice();
    speechSynthesis.speak(u);
  } catch (e) {}
}
function speak(text) {
  if (!("speechSynthesis" in window)) { alert("此裝置不支援語音發音"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.82;
  const v = pickVoice();
  if (v) u.voice = v;
  setTimeout(() => { try { speechSynthesis.speak(u); } catch (e) {} }, 60);
}
if ("speechSynthesis" in window) {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => {};
}

// ===== 狀態 =====
const MIX_TYPES = ["listen", "en2zh", "zh2en", "sentence"];
const MODE_NAMES = { listen: "聽音寫字", en2zh: "英→中", zh2en: "中→英填空", sentence: "句子填空", mixed: "混合題型" };
let selectedModes = new Set(["listen"]); // 題型可複選，至少一項
let mode = "listen";    // 相容舊變數（單選時的首個）
function syncModeVar() {
  const arr = Array.from(selectedModes);
  if (arr.includes("mixed")) mode = "mixed";
  else if (arr.length === 1) mode = arr[0];
  else mode = arr[0]; // 多選時 mode 取首個，實際以 selectedModes 為準
}
function getSelectedModes() {
  if (selectedModes.has("mixed")) return MIX_TYPES.slice();
  // 若四項全選，視為混合
  if (MIX_TYPES.every(m => selectedModes.has(m))) return MIX_TYPES.slice();
  return Array.from(selectedModes).filter(m => MIX_TYPES.includes(m));
}
function getModeLabel() {
  const ms = getSelectedModes();
  if (ms.length === 4) return "混合四種題型";
  if (ms.length === 1) return MODE_NAMES[ms[0]] || ms[0];
  return ms.map(m => MODE_NAMES[m]).join("＋");
}
function getKK(en, unit) {
  if (!en) return "";
  if (typeof KK_BY_UNIT !== 'undefined') {
    if (unit && KK_BY_UNIT[unit] && KK_BY_UNIT[unit][en]) return KK_BY_UNIT[unit][en];
    if (KK_BY_UNIT["JUL"] && KK_BY_UNIT["JUL"][en]) return KK_BY_UNIT["JUL"][en];
    for (const u in KK_BY_UNIT) { if (KK_BY_UNIT[u][en]) return KK_BY_UNIT[u][en]; }
  }
  return "";
}
let questionCount = 0;  // 0 = 全部
let questions = [];     // 題目序列（索引）
let qIndex = 0;
let score = 0;
let wrong = [];
let hintLevel = 0;   // 0=未用 1=首字母 2=完整答案
let hintUsed = false; // 是否曾使用過提示（用於計分）
let reviewMode = false;   // 是否為錯題複習模式（結果頁不另存成績）

const $ = id => document.getElementById(id);

function fmtScore(n) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(1);
}

// ===== 範圍選擇 =====
const HS0710_UNITS = ["07","08","09","10"];
const JUL_UNITS = ["JUL"];
const SUBJECT_UNITS = ["國文","數學","自然","社會","英文"];   // 開學考五科
const HSEXAM_UNITS = ["國文","數學","自然","社會","英文","B1","B2"];
const ALL_UNITS = [...HS0710_UNITS, ...JUL_UNITS, ...HSEXAM_UNITS];

let selectedUnits = new Set(); // 可複選：HS0710, JUL, HSEXAM, 或各單獨單元
function getActiveUnits() {
  const units = Array.from(selectedUnits);
  let expanded = [];
  units.forEach(u => {
    if (u === "HS0710") expanded.push(...HS0710_UNITS);
    else if (u === "JUL") expanded.push(...JUL_UNITS);
    else if (u === "HSEXAM") expanded.push(...HSEXAM_UNITS);
    else expanded.push(u);
  });
  return expanded;
}
// 某單元題數（英文單字/句子 or 科目題庫）
function unitQuestionCount(u) {
  if (SUBJECT_QUESTIONS[u]) return SUBJECT_QUESTIONS[u].length;
  let n = 0;
  if (WORDS_BY_UNIT[u]) n += WORDS_BY_UNIT[u].length;
  if (SENTENCES_BY_UNIT[u]) n += SENTENCES_BY_UNIT[u].length;
  return n;
}
// 是否為科目單元
function isSubjectUnit(u) { return SUBJECT_UNITS.includes(u); }
function getFilteredWords() {
  const units = getActiveUnits();
  let out = [];
  units.forEach(u => { if (WORDS_BY_UNIT[u]) out = out.concat(WORDS_BY_UNIT[u].map(w => ({ w, unit: u }))); });
  return out;
}
function getFilteredSentences() {
  const units = getActiveUnits();
  let out = [];
  units.forEach(u => { if (SENTENCES_BY_UNIT[u]) out = out.concat(SENTENCES_BY_UNIT[u].map(s => ({ s, unit: u }))); });
  return out;
}
function updateRangeCounts() {
  // 顯示三大類計數
  const hs0710Count = HS0710_UNITS.reduce((a,u)=>a+unitQuestionCount(u),0);
  const julCount = JUL_UNITS.reduce((a,u)=>a+unitQuestionCount(u),0);
  const hsexamCount = HSEXAM_UNITS.reduce((a,u)=>a+unitQuestionCount(u),0);

  const e0710 = document.getElementById("cnt-HS0710");
  if (e0710) e0710.textContent = hs0710Count + " 題";
  const ejul = document.getElementById("cnt-JUL");
  if (ejul) ejul.textContent = julCount + " 題";
  const ehexam = document.getElementById("cnt-HSEXAM");
  if (ehexam) ehexam.textContent = hsexamCount + " 題";

  // 各科題數
  SUBJECT_UNITS.forEach(u => {
    const e = document.getElementById("cnt-" + u);
    if (e) e.textContent = unitQuestionCount(u) + " 題";
  });

  // 停用空的單元
  document.querySelectorAll(".range-btn[data-unit]").forEach(b => {
    const u = b.dataset.unit;
    if (u === "HS0710" || u === "JUL" || u === "HSEXAM") { b.disabled = false; b.title = ""; return; }
    if (unitQuestionCount(u) === 0) {
      b.disabled = true;
      b.title = "此單元尚未建置";
    } else {
      b.disabled = false;
      b.title = "";
    }
  });
  updateFooter();
}
function updateFooter() {
  const w = getFilteredWords().length;
  const s = getFilteredSentences().length;
  let subj = 0;
  const active = getActiveUnits();
  active.forEach(u => { if (SUBJECT_QUESTIONS[u]) subj += SUBJECT_QUESTIONS[u].length; });
  const el = document.querySelector(".footer");
  if (el) {
    let txt = `已選範圍：單字 ${w} 題・句子 ${s} 題`;
    if (subj > 0) txt += `・科目 ${subj} 題`;
    txt += `・點喇叭可發音`;
    el.textContent = txt;
  }
}
setTimeout(updateRangeCounts, 100);

const rangeContainer = document.getElementById("range-options");

function updateRangeUI() {
  // HS0710 category: selected = has subunits selected, expanded = UI expanded state
  const hs0710Btn = document.querySelector('.category-toggle[data-category="HS0710"]');
  if (hs0710Btn) {
    const hasSubunits = HS0710_UNITS.some(u => selectedUnits.has(u));
    hs0710Btn.classList.toggle("selected", hasSubunits);
    // expanded state is managed by click handler, just sync submenu visibility
    const subEl = document.getElementById("sub-HS0710");
    if (subEl) subEl.style.display = hs0710Btn.classList.contains("expanded") ? "grid" : "none";
  }
  // 簡單單元按鈕狀態 (JUL)
  ["JUL"].forEach(u => {
    const btn = document.querySelector(`.range-btn[data-unit="${u}"]`);
    if (btn) btn.classList.toggle("selected", selectedUnits.has(u));
  });
  // HSEXAM category: selected = has subunits selected (incl. subjects & B1/B2), expanded = UI
  const hsexamBtn = document.querySelector('.category-toggle[data-category="HSEXAM"]');
  if (hsexamBtn) {
    const hasSubunits = HSEXAM_UNITS.some(u => selectedUnits.has(u));
    hsexamBtn.classList.toggle("selected", hasSubunits);
    const subEl = document.getElementById("sub-HSEXAM");
    if (subEl) subEl.style.display = hsexamBtn.classList.contains("expanded") ? "grid" : "none";
  }
  // 子單元按鈕狀態 (07,08,09,10, 國文,數學,自然,社會,B1,B2)
  document.querySelectorAll(".sub-btn").forEach(btn => {
    const u = btn.dataset.unit;
    btn.classList.toggle("selected", selectedUnits.has(u));
  });
  // 全部按鈕
  const allBtn = document.querySelector('.range-btn[data-unit="ALL"]');
  if (allBtn) allBtn.classList.toggle("selected", selectedUnits.has("ALL"));
  // 停用空單元
  document.querySelectorAll(".range-btn[data-unit]").forEach(b => {
    const u = b.dataset.unit;
    if (u === "ALL") return;
    if (unitQuestionCount(u) === 0) {
      b.disabled = true; b.title = "此單元尚未建置";
    } else { b.disabled = false; b.title = ""; }
  });
}

function toggleCategory(cat) {
  // HS0710 category: toggle expanded state, don't auto-select subunits
  // JUL is not a category anymore, HSEXAM is now a simple unit
  if (cat === "HS0710") {
    const isExpanded = selectedUnits.has(cat);
    // Just toggle expanded state for UI, but keep subunit selection separate
    // The "selected" on category means "expanded" for UI purposes
    // Actual selection is tracked at subunit level
  }
}

function toggleSubUnit(u) {
  if (selectedUnits.has(u)) {
    selectedUnits.delete(u);
  } else {
    selectedUnits.add(u);
  }
  // If all 4 subunits selected, add category for UI (auto-collapse)
  if (HS0710_UNITS.every(x => selectedUnits.has(x))) {
    selectedUnits.add("HS0710");
  } else {
    selectedUnits.delete("HS0710");
  }
  // HSEXAM is now a simple unit, no auto-category
  if (HSEXAM_UNITS.every(x => selectedUnits.has(x))) {
    // keep both B1 and B2 selected, no auto-category
  }
}

function toggleAll() {
  if (selectedUnits.has("ALL")) {
    selectedUnits.clear();
  } else {
    selectedUnits.clear();
    selectedUnits.add("ALL");
    selectedUnits.add("HS0710");
    selectedUnits.add("JUL");
    selectedUnits.add("HSEXAM");
    selectedUnits.add("B1");
    selectedUnits.add("B2");
    SUBJECT_UNITS.forEach(u => selectedUnits.add(u));
  }
}

rangeContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".range-btn");
  if (!btn) return;
  const cat = btn.dataset.category;
  const unit = btn.dataset.unit;
  if (cat) {
    // Category button (HS0710 / HSEXAM): toggle expanded state for UI only
    if (cat === "HS0710" || cat === "HSEXAM") {
      btn.classList.toggle("expanded");
      const subEl = document.getElementById("sub-" + cat);
      if (subEl) subEl.style.display = btn.classList.contains("expanded") ? "grid" : "none";
      updateFooter();
      updateRangeCounts();
      return;
    }
  }
  else if (unit === "ALL") { toggleAll(); }
  else if (unit) { toggleSubUnit(unit); }
  updateRangeUI();
  updateFooter();
  updateRangeCounts();
});

// 初始預設
setTimeout(() => {
  if (selectedUnits.size === 0) { selectedUnits.add("07"); selectedUnits.add("08"); }
  updateRangeUI();
  updateFooter();
  updateRangeCounts();
}, 100);

// ===== 首頁 UI =====
const modeBtns = document.querySelectorAll(".mode-btn");
// 初始化預設選聽音寫字
document.querySelector('.mode-btn[data-mode="listen"]')?.classList.add("selected");
modeBtns.forEach(b => b.addEventListener("click", () => {
  const m = b.dataset.mode;
  if (m === "mixed") {
    const isSelected = b.classList.contains("selected");
    if (isSelected) {
      b.classList.remove("selected");
      selectedModes.delete("mixed");
      if (selectedModes.size === 0) {
        selectedModes.add("listen");
        document.querySelector('.mode-btn[data-mode="listen"]')?.classList.add("selected");
      }
    } else {
      MIX_TYPES.forEach(t => selectedModes.add(t));
      selectedModes.add("mixed");
      modeBtns.forEach(x => x.classList.add("selected"));
    }
  } else {
    if (selectedModes.has("mixed")) {
      selectedModes.delete("mixed");
      document.querySelector('.mode-btn[data-mode="mixed"]')?.classList.remove("selected");
    }
    if (selectedModes.has(m)) {
      if (selectedModes.size === 1) return; // 至少保留一項
      selectedModes.delete(m);
      b.classList.remove("selected");
    } else {
      selectedModes.add(m);
      b.classList.add("selected");
      if (MIX_TYPES.every(t => selectedModes.has(t))) {
        selectedModes.add("mixed");
        document.querySelector('.mode-btn[data-mode="mixed"]')?.classList.add("selected");
      }
    }
  }
  syncModeVar();
}));
const countBtns = document.querySelectorAll(".count-btn");
countBtns.forEach(b => b.addEventListener("click", () => {
  countBtns.forEach(x => x.classList.remove("selected"));
  b.classList.add("selected");
  questionCount = parseInt(b.dataset.count, 10);
}));

$("start-btn").addEventListener("click", () => {
  primeSpeech();
  startQuiz();
});

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function poolSize() {
  const w = getFilteredWords().length;
  const s = getFilteredSentences().length;
  const ms = getSelectedModes();
  if (ms.length === 1 && ms[0] === "sentence") return s;
  if (ms.length > 1) return w + s;
  if (ms[0] === "sentence") return s;
  return w;
}

function startQuiz() {
  qIndex = 0; score = 0; wrong = [];
  reviewMode = false;
  const fWords = getFilteredWords();       // [{w:[en,zh],unit}]
  const fSents = getFilteredSentences();   // [{s:{...},unit}]

  // 科目模式：只要選了任一開學考科目，就走科目測驗引擎
  const active = getActiveUnits();
  const subjActive = active.filter(u => SUBJECT_QUESTIONS[u]);
  if (subjActive.length > 0) { startSubjectQuiz(subjActive); return; }

  const modes = getSelectedModes();
  if (fWords.length === 0 && fSents.length === 0) { alert("此範圍尚未有題目"); return; }
  if (!modes.includes("sentence") && fWords.length === 0) { alert("此範圍沒有單字題"); return; }
  if (modes.length === 1 && modes[0] === "sentence" && fSents.length === 0) { alert("此範圍沒有句子題"); return; }
  if (modes.some(m => m==="sentence") && fSents.length===0 && modes.every(m=>m==="sentence")) { alert("此範圍沒有句子題"); return; }

  // 取得同姓名錯題加權清單
  const stuName = ($("name-input")?.value || "").trim();
  const wrongPool = getWrongWordsByName(stuName);
  const wrongSet = new Set(wrongPool.map(w => w.base));

  function weightedPick(pool, n, isSent) {
    if (n >= pool.length) return pool.slice();
    // 建立加權索引：錯題重複 3 次，其餘 1 次
    let weighted = [];
    pool.forEach((item, i) => {
      const base = isSent ? item.s.blank : item.w[0];
      const times = wrongSet.has(base) ? 3 : 1;
      for (let t = 0; t < times; t++) weighted.push(i);
    });
    weighted = shuffle(weighted);
    const picked = new Set();
    const result = [];
    for (const idx of weighted) {
      if (picked.has(idx)) continue;
      picked.add(idx);
      result.push(pool[idx]);
      if (result.length >= n) break;
    }
    return result;
  }

  if (modes.length > 1) {
    const per = questionCount === 0 ? Infinity : Math.ceil(questionCount / modes.length);
    let all = [];
    modes.forEach(t => {
      const isSent = t === "sentence";
      const pool = isSent ? fSents : fWords;
      const take = Math.min(per, pool.length);
      const picked = weightedPick(pool, take, isSent);
      picked.forEach(item => {
        const entry = isSent ? item.s : item.w;
        all.push({ type: t, entry, unit: item.unit });
      });
    });
    const n = questionCount === 0 ? all.length : Math.min(questionCount, all.length);
    questions = shuffle(all).slice(0, n);
  } else if (modes[0] === "sentence") {
    const n = (questionCount === 0) ? fSents.length : Math.min(questionCount, fSents.length);
    const picked = weightedPick(fSents, n, true);
    questions = picked.map(item => ({ type: modes[0], entry: item.s, unit: item.unit }));
  } else {
    const n = (questionCount === 0) ? fWords.length : Math.min(questionCount, fWords.length);
    const picked = weightedPick(fWords, n, false);
    questions = picked.map(item => ({ type: modes[0], entry: item.w, unit: item.unit }));
  }

  show("screen-quiz");
  renderQuestion();
}

// 目前題目的單字資料（支援三種：{type, idx} 舊、{type, snap} 複習、{type, entry} 範圍過濾）
function curEntry() {
  const q = questions[qIndex];
  if (q.snap) return q.snap;   // 複習快照 {base, zh, s?, blank?}
  if (q.entry) return q.entry; // 範圍過濾後的實際資料 ([en,zh] 或 {s,blank,base,zh})
  return q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx];
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

// ===== 題目 =====
// 選項：正確答案 en（listen/聽音）或 zh（en2zh/英中），干擾項取中文不同者
function buildChoices(en, zh, isZh) {
  const others = WORDS.filter(w => w[1] !== zh);
  const dist = shuffle(others).slice(0, 3);
  const correct = isZh ? zh : en;
  const choices = shuffle([correct, ...dist.map(w => isZh ? w[1] : w[0])]);
  return choices;
}

function renderQuestion() {
  const q = questions[qIndex];
  if (q.type === "subject") { renderSubjectQuestion(); return; }
  const entry = curEntry();
  const en = entry.base !== undefined ? entry.base : entry[0];
  const zh = entry.zh !== undefined ? entry.zh : entry[1];

  clearTimeout(autoTimer);
  const nbEl = $("next-btn");
  nbEl.classList.remove("pulse");

  // 重置提醒狀態
  hintLevel = 0;
  hintUsed = false;
  const hintBtn = $("hint-btn");
  hintBtn.classList.remove("used");
  hintBtn.textContent = "💡 不會";
  hintBtn.style.display = "";
  $("hint-box").textContent = "";

  // 圖片已全面移除（WORD_IMAGES 仍對應舊清單，為避免誤導，所有題型皆不顯示圖片）
  const imgWrap = document.querySelector(".word-img-wrap");
  imgWrap.classList.remove("show");

  $("progress-text").textContent = `第 ${qIndex + 1} / ${questions.length} 題`;
  $("score-text").textContent = `✓ ${fmtScore(score)}`;
  $("bar-fill").style.width = ((qIndex) / questions.length * 100) + "%";
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("next-btn").style.display = "none";
  $("zh-hint").textContent = "";

  const box = $("options");
  box.innerHTML = "";
  $("type-wrap").style.display = "none";
  $("speak-btn").style.display = "";
  $("speak-hint").textContent = "點一下聽發音";

  if (q.type === "listen") {
    $("qtype-tag").textContent = "👂 聽音寫字";
    $("qword").textContent = zh;
    $("speak-btn").style.display = "";
    $("speak-hint").textContent = "點一下再聽一次";
    setupTyping(en, en);
    setTimeout(() => speak(en), 200);
  } else if (q.type === "en2zh") {
    $("qtype-tag").textContent = "🇬🇧 英 → 中";
    $("qword").textContent = en;
    // 顯示 KK 音標（僅 JUL 目前有）
    const kk = getKK(en, q.unit);
    $("zh-hint").textContent = kk || "";
    $("zh-hint").style.color = kk ? "#64748b" : "";
    $("zh-hint").style.fontSize = kk ? "1.05rem" : "";
    $("zh-hint").style.fontFamily = kk ? "'Times New Roman', serif" : "";
    $("hint-btn").style.display = "none";   // 答案為中文，不提供提醒
    const choices = buildChoices(en, zh, true);
    choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = c;
      b.addEventListener("click", () => answer(b, c, zh));
      box.appendChild(b);
    });
  } else if (q.type === "zh2en") {
    $("qtype-tag").textContent = "⌨️ 中 → 英（填空）";
    $("qword").textContent = zh;
    $("speak-btn").style.display = "none";
    $("speak-hint").textContent = "";
    setupTyping(en, en);
  } else { // sentence
    $("qtype-tag").textContent = "📝 句子填空";
    const s = q.snap ? q.snap : (q.entry ? q.entry : SENTENCES[q.idx]);
    const display = s.s.replace("{blank}", '<span class="blank">＿＿＿＿</span>');
    $("qword").innerHTML = display;
    $("zh-hint").textContent = "💡 " + s.zh;
    setupTyping(s.blank, s.base);
  }
}

function setupTyping(blankWord, baseWord) {
  const wrap = $("type-wrap");
  const input = $("type-input");
  wrap.style.display = "block";
  input.value = "";
  input.className = "type-input";
  input.disabled = false;
  input.focus();
  $("check-btn").onclick = () => checkTyping(input, blankWord, baseWord);
  input.onkeydown = e => {
    if (e.key === "Enter") checkTyping(input, blankWord, baseWord);
  };
}

function norm(s) {
  return s.trim().toLowerCase().replace(/[.,!?'"]+$/, "");
}

function checkTyping(input, blankWord, baseWord) {
  if (input.disabled) return;
  const val = norm(input.value);
  const ok = val === norm(blankWord) || val === norm(baseWord);
  const correctLabel = blankWord === baseWord ? baseWord : `${baseWord}（${blankWord}）`;
  input.disabled = true;
  if (ok) {
    input.className = "type-input ok";
    finalize(true, "✓ 答對了！", "");
  } else {
    input.className = "type-input no";
    finalize(false, `✗ 正確答案：${correctLabel}`, input.value);
  }
  try { input.blur(); } catch (e) {}
}

// 選擇題作答（b:被點按鈕, chosen:選的文字, correct:正確文字）
function answer(btn, chosen, correctLabel) {
  const optBtns = document.querySelectorAll(".opt");
  optBtns.forEach(b => b.classList.add("disabled"));
  const isRight = chosen === correctLabel;
  optBtns.forEach(b => {
    if (b.textContent === correctLabel) b.classList.add("correct");
  });
  if (!isRight) btn.classList.add("wrong");
  const entry = curEntry();
  const en = entry.base !== undefined ? entry.base : entry[0];
  if (isRight) {
    finalize(true, "✓ 答對了！", "");
  } else {
    finalize(false, `✗ 正確答案是「${correctLabel}」`, "");
    if (questions[qIndex].type === "listen") setTimeout(() => speak(en), 400);
  }
}

function finalize(isRight, fbText, rawAnswer) {
  const q = questions[qIndex];
  const stuName = ($("name-input")?.value || "").trim();
  let correctCountKey = null;
  let wrongSnap = null;

  if (q.type === "subject") {
    correctCountKey = q.unit + "::" + q.q.q;
    if (!isRight) wrongSnap = { type: "subject", unit: q.unit, q: q.q };
  } else {
    const entry = curEntry();
    const en = entry.base !== undefined ? entry.base : entry[0];
    correctCountKey = en;
    if (!isRight) {
      const zh = entry.base !== undefined ? entry.zh : entry[1];
      wrongSnap = q.type === "sentence"
        ? { type: q.type, base: entry.base, zh: entry.zh, s: entry.s, blank: entry.blank }
        : { type: q.type, base: en, zh };
    }
  }

  if (isRight) {
    score += hintUsed ? 0.5 : 1;
    // 記錄答對次數，用於降低錯題權重
    if (stuName && correctCountKey) {
      const key = (q.type === "subject" ? `correct_subj_${stuName}` : `correct_${stuName}`);
      const counts = JSON.parse(localStorage.getItem(key)) || {};
      counts[correctCountKey] = (counts[correctCountKey] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(counts));
    }
  } else if (wrongSnap) {
    wrong.push(wrongSnap);
  }
  const fb = $("feedback");
  fb.className = isRight ? "feedback ok" : "feedback no";
  fb.textContent = fbText;
  $("score-text").textContent = `✓ ${fmtScore(score)}`;
  $("bar-fill").style.width = ((qIndex + 1) / questions.length * 100) + "%";

  const last = qIndex === questions.length - 1;
  const nb = $("next-btn");
  nb.textContent = last ? "看結果 🎉" : "下一題 ▶";
  nb.style.display = "";
  nb.classList.add("pulse");

  // 自動跳下一題（讓小朋友看得到對錯後自動繼續）
  clearTimeout(autoTimer);
  autoTimer = setTimeout(() => {
    nb.classList.remove("pulse");
    goNext();
  }, 1200);
}

// ===== 科目測驗引擎（國文/數學/自然/社會）=====
function startSubjectQuiz(subjActive) {
  const stuName = ($("name-input")?.value || "").trim();
  let pool = [];
  subjActive.forEach(subj => {
    (SUBJECT_QUESTIONS[subj] || []).forEach(q => pool.push({ type: "subject", q, unit: subj }));
  });
  if (pool.length === 0) { alert("此科目尚未有題目"); return; }
  // 同姓名錯題加權：曾答錯的題目（以「科目+題幹」為 key）重複出現
  const wrongSubj = getWrongSubjectByName(stuName);
  const wrongSet = new Set(wrongSubj.map(w => w.key));
  let weighted = [];
  pool.forEach((item, i) => {
    const key = item.unit + "::" + item.q.q;
    const times = wrongSet.has(key) ? 3 : 1;
    for (let t = 0; t < times; t++) weighted.push(i);
  });
  weighted = shuffle(weighted);
  const picked = new Set();
  let chosen = [];
  for (const idx of weighted) {
    if (picked.has(idx)) continue;
    picked.add(idx);
    chosen.push(pool[idx]);
    if (chosen.length >= (questionCount === 0 ? Infinity : questionCount)) break;
  }
  questions = chosen;
  show("screen-quiz");
  renderQuestion();
}

function renderSubjectQuestion() {
  const q = questions[qIndex];
  const item = q.q;
  clearTimeout(autoTimer);
  $("next-btn").classList.remove("pulse");

  // 重置提醒狀態（科目題不提供英文式提示）
  hintLevel = 0; hintUsed = false;
  const hintBtn = $("hint-btn");
  hintBtn.classList.remove("used");
  hintBtn.textContent = "💡 不會";
  hintBtn.style.display = "none";
  $("hint-box").textContent = "";

  // 隱藏英文專用元件
  $("speak-btn").style.display = "none";
  $("speak-hint").textContent = "";
  document.querySelector(".word-img-wrap").classList.remove("show");
  $("type-wrap").style.display = "none";
  $("options").innerHTML = "";
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("next-btn").style.display = "none";
  $("zh-hint").textContent = "";
  $("zh-hint").style.color = "";
  $("zh-hint").style.fontSize = "";
  $("zh-hint").style.fontFamily = "";

  const typeName = { single: "☝️ 單選題", multi: "✋ 多選題", fill: "✍️ 填空題", calc: "🧮 計算題" }[item.type] || "題目";
  $("qtype-tag").textContent = `📘 ${q.unit}｜${typeName}`;
  // 閱讀文章
  let html = "";
  if (item.passage) html += `<div class="subj-passage">${item.passage}</div>`;
  if (item.image) html += `<div class="subj-image"><img src="${item.image}" alt="示意圖"></div>`;
  html += `<div class="qword">${item.q}</div>`;
  $("qword").innerHTML = html;

  const box = $("options");
  if (item.type === "single" || item.type === "multi") {
    item.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = String.fromCharCode(65 + i) + ". " + opt;
      if (item.type === "multi") {
        b.addEventListener("click", () => {
          b.classList.toggle("chosen");
        });
      } else {
        b.addEventListener("click", () => checkSubjectSingle(b, i));
      }
      box.appendChild(b);
    });
    if (item.type === "multi") {
      const submit = document.createElement("button");
      submit.className = "check-btn";
      submit.textContent = "送出 ✓";
      submit.style.marginTop = "10px";
      submit.addEventListener("click", () => checkSubjectMulti());
      box.appendChild(submit);
    }
  } else { // fill / calc
    const wrap = $("type-wrap");
    wrap.style.display = "block";
    const input = $("type-input");
    input.value = "";
    input.className = "type-input";
    input.disabled = false;
    input.focus();
    input.placeholder = "輸入答案…";
    $("check-btn").onclick = () => checkSubjectFill(input);
    input.onkeydown = e => { if (e.key === "Enter") checkSubjectFill(input); };
  }
}

function subjectCorrectKey(item) {
  if (item.type === "single") return [item.answer];
  if (item.type === "multi") return item.answer.slice().sort();
  return null;
}

function checkSubjectSingle(btn, idx) {
  const optBtns = document.querySelectorAll(".opt");
  optBtns.forEach(b => b.classList.add("disabled"));
  const correct = questions[qIndex].q.answer;
  const isRight = idx === correct;
  optBtns.forEach((b, i) => { if (i === correct) b.classList.add("correct"); });
  if (!isRight) btn.classList.add("wrong");
  if (isRight) finalize(true, "✓ 答對了！", "");
  else finalize(false, `✗ 正確答案是 ${String.fromCharCode(65 + correct)}`, "");
}

function checkSubjectMulti() {
  const optBtns = document.querySelectorAll(".opt");
  optBtns.forEach(b => b.classList.add("disabled"));
  const correct = questions[qIndex].q.answer.slice().sort();
  const chosen = [];
  optBtns.forEach((b, i) => { if (b.classList.contains("chosen")) chosen.push(i); });
  chosen.sort();
  const isRight = chosen.length === correct.length && chosen.every((v, i) => v === correct[i]);
  optBtns.forEach((b, i) => { if (correct.includes(i)) b.classList.add("correct"); });
  if (!isRight) optBtns.forEach((b, i) => { if (b.classList.contains("chosen") && !correct.includes(i)) b.classList.add("wrong"); });
  if (isRight) finalize(true, "✓ 全部選對了！", "");
  else finalize(false, `✗ 正確答案：${correct.map(i => String.fromCharCode(65 + i)).join("、")}`, "");
}

function checkSubjectFill(input) {
  if (input.disabled) return;
  const item = questions[qIndex].q;
  const val = norm(input.value);
  const ans = norm(item.answerText);
  let isRight = (val === ans);
  // 數值寬容：都為數字時比較數值
  const numVal = parseFloat(val.replace(/[^\d.\-]/g, ""));
  const numAns = parseFloat(ans.replace(/[^\d.\-]/g, ""));
  if (!isNaN(numVal) && !isNaN(numAns) && val !== ans) isRight = (numVal === numAns);
  input.disabled = true;
  if (isRight) {
    input.className = "type-input ok";
    finalize(true, "✓ 答對了！", "");
  } else {
    input.className = "type-input no";
    finalize(false, `✗ 正確答案：${item.answerText}`, input.value);
  }
}

let autoTimer = null;
let lastReviewIdx = -1;   // 錯題複習來源紀錄索引（供「再考一次」）
function goNext() {
  clearTimeout(autoTimer);
  qIndex++;
  if (qIndex >= questions.length) { showResult(); return; }
  renderQuestion();
}

$("speak-btn").addEventListener("click", () => {
  const q = questions[qIndex];
  if (q.type === "zh2en") return;
  const entry = curEntry();
  if (q.type === "sentence") {
    const s = entry.s !== undefined ? entry.s : (q.entry ? q.entry.s : SENTENCES[q.idx].s);
    speak(s.replace("{blank}", "blank"));
  } else {
    speak(entry.base !== undefined ? entry.base : entry[0]);
  }
});

// ===== 提醒（分階：先首字母，再完整答案；不影響計分） =====
function getHintText(q, level) {
  const entry = q.snap ? q.snap : (q.entry ? q.entry : (q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx]));
  const en = q.type === "sentence" ? entry.blank : (entry.base !== undefined ? entry.base : entry[0]);
  const zh = entry.zh !== undefined ? entry.zh : entry[1];
  if (q.type === "listen") {
    // 聽音選字：顯示英文首字母或完整英文
    return level === 1 ? `英文開頭是「${en[0].toUpperCase()}」` : `答案是「${en}」`;
  }
  if (q.type === "en2zh") {
    // 英→中：顯示中文提示或完整中文
    return level === 1 ? `中文意思開頭是「${zh[0]}」` : `答案是「${zh}」`;
  }
  if (q.type === "zh2en") {
    return level === 1 ? `英文開頭是「${en[0].toUpperCase()}」` : `答案是「${en}」`;
  }
  // sentence
  return level === 1 ? `答案開頭是「${en[0].toUpperCase()}」` : `答案是「${en}」`;
}

$("hint-btn").addEventListener("click", () => {
  const q = questions[qIndex];
  if (qIndex >= questions.length) return;
  hintLevel = (hintLevel + 1) % 3; // 0→1→2→0
  const btn = $("hint-btn");
  const box = $("hint-box");
  if (hintLevel === 0) {
    btn.classList.remove("used");
    btn.textContent = "💡 不會";
    box.textContent = "";
    // 填空題：清掉提醒填入的文字
    const input = $("type-input");
    if (input && !input.disabled) { input.value = ""; input.placeholder = "輸入英文單字…"; }
    return;
  }
  hintUsed = true; // 曾使用過提示
  btn.classList.add("used");
  box.textContent = getHintText(q, hintLevel);
  btn.textContent = hintLevel === 1 ? "💡 再看完整答案" : "✨ 收回提示";

  // 填空題：直接把提示字填入輸入框，方便手寫/打字
  if (q.type === "zh2en" || q.type === "sentence" || q.type === "listen") {
    const entry = q.snap ? q.snap : (q.entry ? q.entry : (q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx]));
    const en = q.type === "sentence" ? entry.blank : (entry.base !== undefined ? entry.base : entry[0]);
    const input = $("type-input");
    if (input && !input.disabled) {
      if (hintLevel === 1) {
        input.value = en[0];
        input.placeholder = "繼續輸入剩下的字母…";
      } else {
        input.value = en;
        input.placeholder = "按「送出」檢查";
      }
    }
  }
});

$("next-btn").addEventListener("click", () => goNext());

// ===== 結果 =====
function getRangeLabel() {
  const m = {"07":"第七回","08":"第八回","09":"第九回","10":"第十回","JUL":"空中英語","B1":"龍騰B1","B2":"龍騰B2",
    "HS0710":"高中Level 4 Unit 07-10","HSEXAM":"高二開學考","國文":"國文","數學":"數學","自然":"自然","社會":"社會","英文":"英文"};
  const active = getActiveUnits();
  if (active.length === ALL_UNITS.length) return "全部";
  // 優先顯示大類標籤
  const selected = Array.from(selectedUnits);
  if (selected.length > 0) {
    return selected.map(u => m[u] || u).join("＋");
  }
  return active.sort().map(u=>m[u]||u).join("＋");
}
function showResult() {
  try {
    const elCorrect = $("rs-correct");
    if (elCorrect) elCorrect.textContent = fmtScore(score);
    const elTotal = $("rs-total");
    if (elTotal) elTotal.textContent = questions.length;
    const pct = questions.length ? Math.round(score / questions.length * 100) : 0;
    let msg;
    if (pct === 100) msg = "🏆 太厲害了，全部答對！";
    else if (pct >= 90) msg = "🌟 超棒！差一點就滿分";
    else if (pct >= 70) msg = "👍 很不錯，繼續加油！";
    else if (pct >= 50) msg = "💪 有進步空間，再試一次！";
    else msg = "📚 再多練習幾次吧！";
    const elMsg = $("rs-message");
    if (elMsg) elMsg.textContent = msg;
    const elRT = $("review-title") || document.querySelector("#screen-result .review-title");
    if (elRT) elRT.textContent = reviewMode ? "📖 錯題複習結果（不會另存成績）" : "📖 答錯的題目（可點喇叭複習）";

    // 記錄成績（複習模式不再另存成績）— 防禦：避免 localStorage 錯誤阻斷成績顯示
    if (!reviewMode) {
      try {
        const name = ($("name-input")?.value || "").trim();
        saveRecord({ name, mode: getModeLabel(), range: getRangeLabel(), score, total: questions.length, ts: Date.now(), wrong: wrong.slice() });
      } catch (e) { console.warn("saveRecord failed", e); }
    }

    const list = $("review-list");
    list.innerHTML = "";
    if (wrong.length === 0) {
      list.innerHTML = '<li class="empty-review">沒有答錯的題目，太棒了！</li>';
    } else {
      wrong.forEach(w => {
        const li = document.createElement("li");
        li.className = "review-item";
        if (w.type === "subject") {
          const ans = w.q.answerText || (Array.isArray(w.q.answer) ? w.q.answer.map(i => String.fromCharCode(65 + i)).join("、") : String.fromCharCode(65 + w.q.answer));
          li.innerHTML = `<span class="tag">${w.unit}</span><span class="w">${w.q.q}</span>` +
            `<div class="sol" style="display:none; color:#475569; font-size:.85rem; margin-top:4px;">正解：${ans}<br>${w.q.solution || ""}</div>`;
          const btn = document.createElement("button");
          btn.className = "spk";
          btn.textContent = "🔍";
          btn.title = "看解析";
          btn.addEventListener("click", () => {
            const sol = li.querySelector(".sol");
            sol.style.display = sol.style.display === "none" ? "block" : "none";
          });
          li.appendChild(btn);
        } else {
          li.innerHTML = `<span class="w">${w.base}</span><span class="c">${w.zh}</span>`;
          const spk = document.createElement("button");
          spk.className = "spk";
          spk.textContent = "🔊";
          spk.addEventListener("click", () => speak(w.base));
          li.appendChild(spk);
        }
        list.appendChild(li);
      });
    }
  } catch (e) {
    console.error("showResult error", e);
    alert("顯示成績時發生錯誤：" + e.message);
  } finally {
    show("screen-result");
    // 確保進度條滿格
    const bar = $("bar-fill");
    if (bar) bar.style.width = "100%";
  }
}

// ===== 成績紀錄（存本機 localStorage + 雲端自動同步） =====
const REC_KEY = "vocab_quiz_records";
const SYNC_KEY = "vocab_sync_id";
const NPOINT_BASE = "https://api.npoint.io";

function loadRecords() {
  try { return JSON.parse(localStorage.getItem(REC_KEY)) || []; }
  catch (e) { return []; }
}
function saveRecord(entry) {
  const recs = loadRecords();
  recs.unshift(entry);
  if (recs.length > 200) recs.length = 200;
  localStorage.setItem(REC_KEY, JSON.stringify(recs));
  // 自動雲端備份（非同步，不阻斷）
  syncUpload().catch(()=>{});
}
function deleteRecord(idx) {
  const recs = loadRecords();
  if (idx < 0 || idx >= recs.length) return;
  recs.splice(idx, 1);
  localStorage.setItem(REC_KEY, JSON.stringify(recs));
  syncUpload().catch(()=>{});
  renderRecords();
}
function getWrongWordsByName(name) {
  if (!name) return [];
  const recs = loadRecords();
  const wrongMap = {};
  recs.forEach(r => {
    if (r.name !== name || !r.wrong) return;
    r.wrong.forEach(w => {
      const key = w.base;
      if (!wrongMap[key]) wrongMap[key] = { base: w.base, zh: w.zh, type: w.type, wrongCount: 0 };
      wrongMap[key].wrongCount++;
    });
  });
  // 讀取答對次數
  const correctKey = `correct_${name}`;
  const correctCounts = JSON.parse(localStorage.getItem(correctKey)) || {};
  // 計算有效權重 = max(0, wrongCount - correctCount)
  // 每答對 3 次抵銷 1 次錯誤權重
  return Object.entries(wrongMap)
    .map(([base, w]) => {
      const correct = correctCounts[base] || 0;
      const effectiveWrong = Math.max(0, w.wrongCount - Math.floor(correct / 3));
      return { base: w.base, zh: w.zh, type: w.type, count: effectiveWrong };
    })
    .filter(w => w.count > 0)
    .sort((a, b) => b.count - a.count);
}
function getWrongSubjectByName(name) {
  if (!name) return [];
  const recs = loadRecords();
  const wrongMap = {};
  recs.forEach(r => {
    if (r.name !== name || !r.wrong) return;
    r.wrong.forEach(w => {
      if (w.type !== "subject" || !w.q) return;
      const key = w.unit + "::" + w.q.q;
      if (!wrongMap[key]) wrongMap[key] = { key, unit: w.unit, q: w.q, wrongCount: 0 };
      wrongMap[key].wrongCount++;
    });
  });
  // 讀取答對次數（科目用獨立 key），每 3 次答對抵銷 1 次錯誤權重
  const correctKey = `correct_subj_${name}`;
  const correctCounts = JSON.parse(localStorage.getItem(correctKey)) || {};
  return Object.values(wrongMap)
    .map(w => {
      const correct = correctCounts[w.key] || 0;
      const effectiveWrong = Math.max(0, w.wrongCount - Math.floor(correct / 3));
      return { key: w.key, unit: w.unit, q: w.q, count: effectiveWrong };
    })
    .filter(w => w.count > 0)
    .sort((a, b) => b.count - a.count);
}
async function getSyncId(createIfMissing=true) {
  let id = localStorage.getItem(SYNC_KEY);
  if (id) return id;
  if (!createIfMissing) return null;
  try {
    const res = await fetch(NPOINT_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([]) });
    if (!res.ok) throw new Error("create failed");
    const data = await res.json();
    id = data.id;
    if (id) localStorage.setItem(SYNC_KEY, id);
    return id;
  } catch(e) { console.warn("getSyncId failed", e); return null; }
}
async function syncUpload() {
  let id = localStorage.getItem(SYNC_KEY);
  if (!id) {
    // 自動建立同步碼以實現自動雲端備份
    id = await getSyncId(true);
    if (!id) return;
  }
  const recs = loadRecords();
  try {
    await fetch(`${NPOINT_BASE}/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recs) });
    const el = document.getElementById("sync-status");
    if (el) { el.textContent = "☁️ 已同步 " + new Date().toLocaleTimeString(); el.style.color = "#059669"; }
  } catch(e) { console.warn("syncUpload failed", e); const el=document.getElementById("sync-status"); if(el){el.textContent="☁️ 同步失敗（離線）"; el.style.color="#dc2626";} }
}
async function syncDownload() {
  const id = localStorage.getItem(SYNC_KEY);
  if (!id) return null;
  try {
    const res = await fetch(`${NPOINT_BASE}/${id}`);
    if (!res.ok) throw new Error("fetch failed");
    const cloudRecs = await res.json();
    if (!Array.isArray(cloudRecs)) return null;
    const localRecs = loadRecords();
    const seen = new Set(cloudRecs.map(r => `${r.ts}-${r.name}-${r.score}-${r.total}`));
    let added = 0;
    for (const r of localRecs) {
      const key = `${r.ts}-${r.name}-${r.score}-${r.total}`;
      if (!seen.has(key)) { cloudRecs.push(r); added++; }
    }
    cloudRecs.sort((a,b)=>b.ts-a.ts);
    if (cloudRecs.length>200) cloudRecs.length=200;
    // 若有新增，更新本機與雲端
    if (added>0) {
      localStorage.setItem(REC_KEY, JSON.stringify(cloudRecs));
      // 回寫雲端（不等待）
      fetch(`${NPOINT_BASE}/${id}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(cloudRecs) }).catch(()=>{});
    } else {
      // 僅用雲端覆蓋本機（以雲端為準，已排序）
      localStorage.setItem(REC_KEY, JSON.stringify(cloudRecs));
    }
    const el=document.getElementById("sync-status");
    if(el){ el.textContent="☁️ 已同步 " + new Date().toLocaleTimeString(); el.style.color="#059669"; }
    return cloudRecs;
  } catch(e){ console.warn("syncDownload failed", e); const el=document.getElementById("sync-status"); if(el){el.textContent="☁️ 同步失敗（離線）"; el.style.color="#dc2626";} return null; }
}
function pad2(n) { return n < 10 ? "0" + n : "" + n; }
function fmtTime(ts) {
  const d = new Date(ts);
  return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

async function renderRecords() {
  // 先嘗試雲端同步（若已有同步碼）
  const syncId = localStorage.getItem(SYNC_KEY);
  if (syncId) {
    const statusEl = document.getElementById("sync-status");
    if (statusEl) { statusEl.textContent = "☁️ 同步中…"; statusEl.style.color = "#64748b"; }
    await syncDownload();
  }
  const recs = loadRecords();
  const list = $("records-list");
  list.innerHTML = "";
  // 更新同步碼顯示
  const syncCodeEl = document.getElementById("sync-code");
  if (syncCodeEl) syncCodeEl.textContent = syncId || "（尚未建立）";
  const syncInput = document.getElementById("sync-input");
  if (syncInput && !syncInput.value) syncInput.placeholder = syncId ? "輸入他班同步碼" : "貼上同步碼";
  if (recs.length === 0) {
    list.innerHTML = '<li class="empty-records">還沒有任何成績紀錄。</li>';
    return;
  }
  recs.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = "records-item";
    li.innerHTML =
      `<span class="rn">${r.name || "（未署名）"}</span>` +
      `<span class="rm">${r.mode || ""}${r.range?"・"+r.range:""}・${r.total} 題</span>` +
      `<span class="rs">${fmtScore(r.score)} 分</span>` +
      `<span class="rd">${fmtTime(r.ts)}</span>` +
      `<button class="rdel" title="刪除此筆紀錄">✕</button>`;
    li.querySelector(".rdel").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`確定刪除 ${r.name || "（未署名）"} ${fmtTime(r.ts)} 的成績？`)) {
        deleteRecord(i);
      }
    });
    li.addEventListener("click", () => openRecordDetail(i));
    list.appendChild(li);
  });
}

function openRecordDetail(i) {
  const recs = loadRecords();
  const r = recs[i];
  if (!r) return;
  $("rd-title").textContent = `${r.name || "（未署名）"}・${r.mode || ""}${r.range?"・"+r.range:""}・${fmtScore(r.score)} 分`;
  $("rd-sub").textContent = `${r.total} 題・${r.range||""}・${fmtTime(r.ts)}`;
  const w = r.wrong || [];
  const list = $("rd-list");
  list.innerHTML = "";
  if (w.length === 0) {
    list.innerHTML = '<li class="empty-records">這份紀錄沒有答錯的題目。</li>';
  } else {
    w.forEach(x => {
      const li = document.createElement("li");
      li.className = "review-item";
      if (x.type === "subject") {
        const ans = x.q.answerText || (Array.isArray(x.q.answer) ? x.q.answer.map(i => String.fromCharCode(65 + i)).join("、") : String.fromCharCode(65 + x.q.answer));
        li.innerHTML = `<span class="rt">${x.unit}</span><span class="w">${x.q.q}</span>` +
          `<div class="sol" style="display:none; color:#475569; font-size:.85rem; margin-top:4px;">正解：${ans}<br>${x.q.solution || ""}</div>`;
        const btn = document.createElement("button");
        btn.className = "spk";
        btn.textContent = "🔍";
        btn.title = "看解析";
        btn.addEventListener("click", () => {
          const sol = li.querySelector(".sol");
          sol.style.display = sol.style.display === "none" ? "block" : "none";
        });
        li.appendChild(btn);
      } else {
        const tag = { listen: "聽音", en2zh: "英中", zh2en: "中英", sentence: "句子" }[x.type] || "單字";
        li.innerHTML = `<span class="rt">${tag}</span><span class="w">${x.base}</span><span class="c">${x.zh}</span>`;
        const spk = document.createElement("button");
        spk.className = "spk";
        spk.textContent = "🔊";
        spk.addEventListener("click", () => speak(x.base));
        li.appendChild(spk);
      }
      list.appendChild(li);
    });
  }
  const rep = $("rd-replay");
  rep.style.display = w.length > 0 ? "" : "none";
  rep.dataset.idx = i;
  show("screen-record-detail");
}

function startReviewFromRecord(i) {
  const recs = loadRecords();
  const r = recs[i];
  if (!r || !r.wrong || r.wrong.length === 0) return;
  lastReviewIdx = i;
  qIndex = 0; score = 0; wrong = [];
  reviewMode = true;
  questions = r.wrong.map(x => {
    if (x.type === "subject") return { type: "subject", q: x.q, unit: x.unit };
    return {
      type: x.type,
      snap: x.type === "sentence"
        ? { base: x.base, zh: x.zh, s: x.s, blank: x.blank }
        : { base: x.base, zh: x.zh }
    };
  });
  show("screen-quiz");
  renderQuestion();
}

$("records-btn").addEventListener("click", () => {
  renderRecords();
  show("screen-records");
});
$("records-home-btn").addEventListener("click", () => show("screen-home"));
$("rd-home-btn").addEventListener("click", () => show("screen-records"));
$("rd-replay").addEventListener("click", () => {
  const i = parseInt($("rd-replay").dataset.idx, 10);
  if (!isNaN(i)) { primeSpeech(); startReviewFromRecord(i); }
});
$("clear-records-btn").addEventListener("click", () => {
  if (confirm("確定要清空本機成績紀錄嗎？（雲端仍保留）")) {
    localStorage.removeItem(REC_KEY);
    renderRecords();
  }
});
// 建立同步碼
$("create-sync-btn")?.addEventListener("click", async () => {
  const btn = $("create-sync-btn");
  const old = btn.textContent;
  btn.textContent = "建立中…"; btn.disabled = true;
  try {
    // 強制建立新 ID（覆蓋舊的）
    localStorage.removeItem(SYNC_KEY);
    const id = await getSyncId(true);
    if (id) {
      await syncUpload();
      alert("已建立同步碼：\n" + id + "\n\n請複製並貼到其他 iPad 的「貼上同步碼」後按加入。");
      renderRecords();
    } else throw new Error("建立失敗");
  } catch(e) { alert("建立失敗：" + e.message); }
  finally { btn.textContent = old; btn.disabled = false; }
});
$("copy-sync-btn")?.addEventListener("click", async () => {
  const id = localStorage.getItem(SYNC_KEY);
  if (!id) { alert("尚未建立同步碼，請先按「建立同步碼」"); return; }
  try { await navigator.clipboard.writeText(id); alert("已複製同步碼"); } catch(e) { prompt("請手動複製同步碼：", id); }
});
$("join-sync-btn")?.addEventListener("click", async () => {
  const input = $("sync-input");
  const id = (input?.value || "").trim();
  if (!id) { alert("請貼上同步碼"); return; }
  // 驗證是否有效
  try {
    const res = await fetch(`${NPOINT_BASE}/${id}`);
    if (!res.ok) throw new Error("同步碼無效或不存在");
    await res.json(); // 驗證為合法 JSON
    localStorage.setItem(SYNC_KEY, id);
    input.value = "";
    alert("已加入同步碼，正在合併成績…");
    await syncDownload();
    renderRecords();
  } catch(e) { alert("加入失敗：" + e.message); }
});
$("manual-sync-btn")?.addEventListener("click", async () => {
  const btn = $("manual-sync-btn");
  const old = btn.textContent;
  btn.textContent = "同步中…"; btn.disabled = true;
  try {
    await syncDownload();
    await syncUpload();
    renderRecords();
  } finally { btn.textContent = old; btn.disabled = false; }
});
$("export-btn")?.addEventListener("click", () => {
  const recs = loadRecords();
  if (recs.length===0) { alert("沒有可匯出的紀錄"); return; }
  const blob = new Blob([JSON.stringify(recs, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vocab_records_" + new Date().toISOString().slice(0,10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
});
$("import-btn")?.addEventListener("click", () => { $("import-file")?.click(); });
$("import-file")?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error("格式錯誤");
    const local = loadRecords();
    const seen = new Set(local.map(r=>`${r.ts}-${r.name}-${r.score}-${r.total}`));
    let added=0;
    for (const r of data) {
      const key=`${r.ts}-${r.name}-${r.score}-${r.total}`;
      if(!seen.has(key)){ local.push(r); added++; }
    }
    local.sort((a,b)=>b.ts-a.ts);
    if(local.length>200) local.length=200;
    localStorage.setItem(REC_KEY, JSON.stringify(local));
    alert(`已匯入 ${added} 筆新紀錄（共 ${local.length} 筆）`);
    // 若已有同步碼，自動上傳
    if (localStorage.getItem(SYNC_KEY)) await syncUpload();
    renderRecords();
  } catch(err){ alert("匯入失敗："+err.message); }
  finally { e.target.value=""; }
});

// ===== QR 分享 =====
$("qr-btn").addEventListener("click", () => {
  $("qr-url").textContent = location.href;
  show("screen-qr");
});
$("qr-home-btn").addEventListener("click", () => show("screen-home"));

$("retry-btn").addEventListener("click", () => {
  primeSpeech();
  if (reviewMode && lastReviewIdx >= 0) {
    startReviewFromRecord(lastReviewIdx);
  } else {
    startQuiz();
  }
});
$("home-btn").addEventListener("click", () => show("screen-home"));
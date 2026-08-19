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
let mode = "listen";      // listen | en2zh | zh2en | sentence
let questionCount = 0;    // 0 = 全部
let questions = [];       // 題目序列（索引）
let qIndex = 0;
let score = 0;
let wrong = [];
let hintLevel = 0;   // 0=未用 1=首字母 2=完整答案

const $ = id => document.getElementById(id);

function fmtScore(n) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(1);
}

// ===== 首頁 UI =====
const modeBtns = document.querySelectorAll(".mode-btn");
modeBtns.forEach(b => b.addEventListener("click", () => {
  modeBtns.forEach(x => x.classList.remove("selected"));
  b.classList.add("selected");
  mode = b.dataset.mode;
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
  return mode === "sentence" ? SENTENCES.length : WORDS.length;
}

const MIX_TYPES = ["listen", "en2zh", "zh2en", "sentence"];

function startQuiz() {
  qIndex = 0; score = 0; wrong = [];

  if (mode === "mixed") {
    // 混合模式：四種題型平均分配後再打亂
    const per = questionCount === 0 ? Infinity : Math.ceil(questionCount / MIX_TYPES.length);
    let all = [];
    MIX_TYPES.forEach(t => {
      const total = t === "sentence" ? SENTENCES.length : WORDS.length;
      const idx = shuffle(Array.from({ length: total }, (_, i) => i));
      const take = Math.min(per, idx.length);
      idx.slice(0, take).forEach(i => all.push({ type: t, idx: i }));
    });
    const n = questionCount === 0 ? all.length : Math.min(questionCount, all.length);
    questions = shuffle(all).slice(0, n);
  } else {
    const total = poolSize();
    const idx = shuffle(Array.from({ length: total }, (_, i) => i));
    const n = (questionCount === 0) ? idx.length : Math.min(questionCount, idx.length);
    questions = idx.slice(0, n).map(i => ({ type: mode, idx: i }));
  }

  show("screen-quiz");
  renderQuestion();
}

// 目前題目的單字資料
function curEntry() {
  const q = questions[qIndex];
  return q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx];
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

// ===== 題目 =====
function buildChoices(wordIdx, isZh) {
  const pool = WORDS;
  const others = pool
    .map((_, i) => i)
    .filter(i => i !== wordIdx && pool[i][1] !== pool[wordIdx][1]);
  const dist = shuffle(others).slice(0, 3);
  const choices = shuffle([wordIdx, ...dist]);
  return choices.map(i => isZh ? pool[i][1] : pool[i][0]);
}

function renderQuestion() {
  const q = questions[qIndex];
  const entry = q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx];
  const en = q.type === "sentence" ? entry.base : entry[0];
  const zh = q.type === "sentence" ? entry.zh : entry[1];

  clearTimeout(autoTimer);
  const nbEl = $("next-btn");
  nbEl.classList.remove("pulse");

  // 重置提醒狀態
  hintLevel = 0;
  const hintBtn = $("hint-btn");
  hintBtn.classList.remove("used");
  hintBtn.textContent = "💡 不會";
  hintBtn.style.display = "";
  $("hint-box").textContent = "";

  // 顯示單字圖片（有圖就顯示，無圖則隱藏）
  const imgWrap = document.querySelector(".word-img-wrap");
  const imgEl = $("word-img");
  const imgUrl = WORD_IMAGES ? WORD_IMAGES[en] : null;
  if (imgUrl) {
    imgEl.src = imgUrl;
    imgEl.onerror = () => imgWrap.classList.remove("show");
    imgWrap.classList.add("show");
  } else {
    imgWrap.classList.remove("show");
  }

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
    $("qtype-tag").textContent = "👂 聽音選字";
    $("qword").textContent = zh;   // 加上中文提示
    const choices = buildChoices(q.idx, false);
    choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = c;
      b.addEventListener("click", () => answer(b, c, en));
      box.appendChild(b);
    });
    setTimeout(() => speak(en), 200);
  } else if (q.type === "en2zh") {
    $("qtype-tag").textContent = "🇬🇧 英 → 中";
    $("qword").textContent = en;
    $("hint-btn").style.display = "none";   // 答案為中文，不提供提醒
    const choices = buildChoices(q.idx, true);
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
    const s = SENTENCES[q.idx];
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
  const entry = curEntry();
  const en = entry.base !== undefined ? entry.base : entry[0];
  const zh = entry.base !== undefined ? entry.zh : entry[1];
  if (isRight) {
    score += hintLevel > 0 ? 0.5 : 1;   // 用過提醒只算半分
  } else {
    wrong.push({ en, zh });
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

let autoTimer = null;
function goNext() {
  clearTimeout(autoTimer);
  qIndex++;
  if (qIndex >= questions.length) { showResult(); return; }
  renderQuestion();
}

$("speak-btn").addEventListener("click", () => {
  const q = questions[qIndex];
  if (q.type === "zh2en") return;
  if (q.type === "sentence") {
    const s = SENTENCES[q.idx];
    speak(s.s.replace("{blank}", "blank"));
  } else {
    speak(WORDS[q.idx][0]);
  }
});

// ===== 提醒（分階：先首字母，再完整答案；不影響計分） =====
function getHintText(q, level) {
  const entry = q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx];
  const en = q.type === "sentence" ? entry.blank : entry[0];
  const zh = q.type === "sentence" ? entry.zh : entry[1];
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
  btn.classList.add("used");
  box.textContent = getHintText(q, hintLevel);
  btn.textContent = hintLevel === 1 ? "💡 再看完整答案" : "✨ 收回提示";

  // 填空題：直接把提示字填入輸入框，方便手寫/打字
  if (q.type === "zh2en" || q.type === "sentence") {
    const entry = q.type === "sentence" ? SENTENCES[q.idx] : WORDS[q.idx];
    const en = q.type === "sentence" ? entry.blank : entry[0];
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
function showResult() {
  $("rs-correct").textContent = fmtScore(score);
  $("rs-total").textContent = questions.length;
  const pct = Math.round(score / questions.length * 100);
  let msg;
  if (pct === 100) msg = "🏆 太厲害了，全部答對！";
  else if (pct >= 90) msg = "🌟 超棒！差一點就滿分";
  else if (pct >= 70) msg = "👍 很不錯，繼續加油！";
  else if (pct >= 50) msg = "💪 有進步空間，再試一次！";
  else msg = "📚 再多練習幾次吧！";
  $("rs-message").textContent = msg;

  // 記錄成績
  const name = $("name-input").value.trim();
  saveRecord({ name, mode: MODE_NAMES[mode], score, total: questions.length, ts: Date.now() });

  const list = $("review-list");
  list.innerHTML = "";
  if (wrong.length === 0) {
    list.innerHTML = '<li class="empty-review">沒有答錯的題目，太棒了！</li>';
  } else {
    wrong.forEach(w => {
      const li = document.createElement("li");
      li.className = "review-item";
      li.innerHTML = `<span class="w">${w.en}</span><span class="c">${w.zh}</span>`;
      const spk = document.createElement("button");
      spk.className = "spk";
      spk.textContent = "🔊";
      spk.addEventListener("click", () => speak(w.en));
      li.appendChild(spk);
      list.appendChild(li);
    });
  }
  show("screen-result");
}

// ===== 成績紀錄（存本機 localStorage） =====
const REC_KEY = "vocab_quiz_records";
const MODE_NAMES = { listen: "聽音選字", en2zh: "英→中", zh2en: "中→英填空", sentence: "句子填空", mixed: "混合題型" };

function loadRecords() {
  try { return JSON.parse(localStorage.getItem(REC_KEY)) || []; }
  catch (e) { return []; }
}
function saveRecord(entry) {
  const recs = loadRecords();
  recs.unshift(entry);
  if (recs.length > 200) recs.length = 200;
  localStorage.setItem(REC_KEY, JSON.stringify(recs));
}
function pad2(n) { return n < 10 ? "0" + n : "" + n; }
function fmtTime(ts) {
  const d = new Date(ts);
  return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function renderRecords() {
  const recs = loadRecords();
  const list = $("records-list");
  list.innerHTML = "";
  if (recs.length === 0) {
    list.innerHTML = '<li class="empty-records">還沒有任何成績紀錄。</li>';
    return;
  }
  recs.forEach(r => {
    const li = document.createElement("li");
    li.className = "records-item";
    li.innerHTML =
      `<span class="rn">${r.name || "（未署名）"}</span>` +
      `<span class="rm">${r.mode || ""}・${r.total} 題</span>` +
      `<span class="rs">${fmtScore(r.score)} 分</span>` +
      `<span class="rd">${fmtTime(r.ts)}</span>`;
    list.appendChild(li);
  });
}

$("records-btn").addEventListener("click", () => {
  renderRecords();
  show("screen-records");
});
$("records-home-btn").addEventListener("click", () => show("screen-home"));
$("clear-records-btn").addEventListener("click", () => {
  if (confirm("確定要清空所有成績紀錄嗎？")) {
    localStorage.removeItem(REC_KEY);
    renderRecords();
  }
});

// ===== QR 分享 =====
$("qr-btn").addEventListener("click", () => {
  $("qr-url").textContent = location.href;
  show("screen-qr");
});
$("qr-home-btn").addEventListener("click", () => show("screen-home"));

$("retry-btn").addEventListener("click", () => {
  primeSpeech();
  startQuiz();
});
$("home-btn").addEventListener("click", () => show("screen-home"));
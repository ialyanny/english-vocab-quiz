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

const $ = id => document.getElementById(id);

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

function startQuiz() {
  const total = poolSize();
  const idx = shuffle(Array.from({ length: total }, (_, i) => i));
  const n = (questionCount === 0) ? idx.length : Math.min(questionCount, idx.length);
  questions = idx.slice(0, n);
  qIndex = 0; score = 0; wrong = [];
  show("screen-quiz");
  renderQuestion();
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

// ===== 題目 =====
function buildChoices(correctIdx, isZh) {
  const pool = WORDS;
  const others = pool
    .map((_, i) => i)
    .filter(i => i !== correctIdx && pool[i][1] !== pool[correctIdx][1]);
  const dist = shuffle(others).slice(0, 3);
  const choices = shuffle([correctIdx, ...dist]);
  return choices.map(i => isZh ? pool[i][1] : pool[i][0]);
}

function renderQuestion() {
  const cur = questions[qIndex];
  const en = (mode === "sentence") ? SENTENCES[cur].base : WORDS[cur][0];
  const zh = (mode === "sentence") ? SENTENCES[cur].zh : WORDS[cur][1];

  $("progress-text").textContent = `第 ${qIndex + 1} / ${questions.length} 題`;
  $("score-text").textContent = `✓ ${score}`;
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

  if (mode === "listen") {
    $("qtype-tag").textContent = "👂 聽音選字";
    $("qword").textContent = zh;   // 加上中文提示
    const choices = buildChoices(cur, false);
    choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = c;
      b.addEventListener("click", () => answer(b, c, en));
      box.appendChild(b);
    });
    setTimeout(() => speak(en), 200);
  } else if (mode === "en2zh") {
    $("qtype-tag").textContent = "🇬🇧 英 → 中";
    $("qword").textContent = en;
    const choices = buildChoices(cur, true);
    choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = c;
      b.addEventListener("click", () => answer(b, c, zh));
      box.appendChild(b);
    });
  } else if (mode === "zh2en") {
    $("qtype-tag").textContent = "⌨️ 中 → 英（填空）";
    $("qword").textContent = zh;
    $("speak-btn").style.display = "none";
    $("speak-hint").textContent = "";
    setupTyping(en, en);
  } else { // sentence
    $("qtype-tag").textContent = "📝 句子填空";
    const s = SENTENCES[cur];
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
  setTimeout(() => { try { input.blur(); } catch (e) {} }, 50);
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
  const cur = questions[qIndex];
  const en = (mode === "sentence") ? SENTENCES[cur].base : WORDS[cur][0];
  const zh = (mode === "sentence") ? SENTENCES[cur].zh : WORDS[cur][1];
  if (isRight) {
    finalize(true, "✓ 答對了！", "");
  } else {
    finalize(false, `✗ 正確答案是「${correctLabel}」`, "");
    if (mode === "listen") setTimeout(() => speak(en), 400);
  }
}

function finalize(isRight, fbText, rawAnswer) {
  const cur = questions[qIndex];
  let en, zh;
  if (mode === "sentence") {
    en = SENTENCES[cur].base;
    zh = SENTENCES[cur].zh;
  } else {
    en = WORDS[cur][0];
    zh = WORDS[cur][1];
  }
  if (isRight) {
    score++;
  } else {
    wrong.push({ en, zh });
  }
  const fb = $("feedback");
  fb.className = isRight ? "feedback ok" : "feedback no";
  fb.textContent = fbText;
  $("score-text").textContent = `✓ ${score}`;
  $("bar-fill").style.width = ((qIndex + 1) / questions.length * 100) + "%";

  const last = qIndex === questions.length - 1;
  const nb = $("next-btn");
  nb.textContent = last ? "看結果 🎉" : "下一題 ▶";
  nb.style.display = "";
}

$("speak-btn").addEventListener("click", () => {
  if (mode === "zh2en") return;
  const cur = questions[qIndex];
  if (mode === "sentence") {
    const s = SENTENCES[cur];
    speak(s.s.replace("{blank}", "blank"));
  } else {
    speak(WORDS[cur][0]);
  }
});

$("next-btn").addEventListener("click", () => {
  qIndex++;
  if (qIndex >= questions.length) { showResult(); return; }
  renderQuestion();
});

// ===== 結果 =====
function showResult() {
  $("rs-correct").textContent = score;
  $("rs-total").textContent = questions.length;
  const pct = Math.round(score / questions.length * 100);
  let msg;
  if (pct === 100) msg = "🏆 太厲害了，全部答對！";
  else if (pct >= 90) msg = "🌟 超棒！差一點就滿分";
  else if (pct >= 70) msg = "👍 很不錯，繼續加油！";
  else if (pct >= 50) msg = "💪 有進步空間，再試一次！";
  else msg = "📚 再多練習幾次吧！";
  $("rs-message").textContent = msg;

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

$("retry-btn").addEventListener("click", () => {
  primeSpeech();
  startQuiz();
});
$("home-btn").addEventListener("click", () => show("screen-home"));
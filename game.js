"use strict";
// ===== 單字勇者：闖關遊戲模式（MVP）=====
// 共用 data.js 的 WORDS_BY_UNIT / SENTENCES_BY_UNIT / KK_BY_UNIT，存檔放 localStorage（每個名字一份）

const $ = id => document.getElementById(id);
const rand = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);

// ---------- 世界設定 ----------
const THEMES = [
  { name: "迷霧沼澤", mons: ["🐸", "🐌", "🦎"], boss: "🐊", color: "linear-gradient(135deg,#059669,#34d399)" },
  { name: "蝙蝠洞窟", mons: ["🦇", "🕷️", "🐀"], boss: "🧛", color: "linear-gradient(135deg,#4b5563,#9ca3af)" },
  { name: "狼嚎森林", mons: ["🐺", "🦉", "🐻"], boss: "🦍", color: "linear-gradient(135deg,#166534,#4ade80)" },
  { name: "野豬草原", mons: ["🐗", "🐂", "🦬"], boss: "🦏", color: "linear-gradient(135deg,#a16207,#facc15)" },
  { name: "毒蠍沙漠", mons: ["🦂", "🐍", "🦅"], boss: "🐫", color: "linear-gradient(135deg,#c2410c,#fdba74)" },
  { name: "幽靈古堡", mons: ["👻", "💀", "🦇"], boss: "🧟", color: "linear-gradient(135deg,#5b21b6,#a78bfa)" },
  { name: "恐龍山谷", mons: ["🦕", "🦖", "🐢"], boss: "🦖", color: "linear-gradient(135deg,#15803d,#a3e635)" },
  { name: "深海迷宮", mons: ["🐙", "🦑", "🐡"], boss: "🦈", color: "linear-gradient(135deg,#1d4ed8,#38bdf8)" },
  { name: "冰雪王國", mons: ["🐧", "🦭", "⛄"], boss: "🐻‍❄️", color: "linear-gradient(135deg,#0e7490,#a5f3fc)" },
  { name: "龍之火山", mons: ["🔥", "🦎", "🐲"], boss: "🐉", color: "linear-gradient(135deg,#b91c1c,#fb923c)" },
];
const FINAL_THEME = { name: "魔王城", mons: ["👹"], boss: "😈", color: "linear-gradient(135deg,#7f1d1d,#f43f5e)" };

// ===== 教材 → 小範圍（每個小範圍 = 一座島，可單獨闖關）=====
// 小範圍寫法：{ id, label, units: [data.js 的 key], from, to }（from/to 可切出同一份資料的一段，例如一頁）
//           { id, label, units, final: true, needs: [...] } = 總複習：needs 裡每座島的魔王都打倒才開
// 新增教材（例如常春藤）：在這裡加一本書，把每一小段列成一個小範圍即可
// ※ 國中會考題庫暫不列入遊戲
const BOOKS = [
  { name: "🎙️ 空中英語教室", sections: [
    { id: "NOV1", label: "11月・第 1 頁", units: ["NOV1"] },
    { id: "NOV2", label: "11月・第 2 頁", units: ["NOV2"] },
    { id: "NOV-ALL", label: "11月・整月總複習", units: ["NOV1", "NOV2"], final: true, needs: ["NOV1", "NOV2"] },
  ] },
  { name: "📘 Level 4 課本", sections: ["05", "06", "07", "08", "09", "10", "11", "12", "13", "14"].flatMap(u => [
    { id: u, label: `Unit ${u}`, units: [u] },
    { id: u + "-ext", label: `Unit ${u} 延伸單字`, units: [u + "-ext"], extra: true },
  ]) },
];
const SEC = {};
BOOKS.forEach(b => {
  b.sections = b.sections.filter(s => s.units.every(u => typeof WORDS_BY_UNIT !== "undefined" && (WORDS_BY_UNIT[u] || []).length));
  let t = 0;
  b.sections.forEach(s => {
    s.theme = s.final ? FINAL_THEME : THEMES[(s.extra ? Math.max(0, t - 1) : t++) % THEMES.length];
    s.words = s.units.flatMap(u => WORDS_BY_UNIT[u]).slice(s.from || 0, s.to || undefined);
    SEC[s.id] = s;
  });
});

const STAGE_SIZE = 8;     // 每關幾個單字
const BOSS_SIZE = 10;     // 魔王關題數
const FINAL_SIZE = 15;    // 總複習魔王題數
const CHEST_PRICE = 150;

// ---------- 裝備 ----------
const RARITY = {
  common: { name: "普通", w: 60, dup: 20 },
  rare:   { name: "稀有", w: 28, dup: 40 },
  epic:   { name: "史詩", w: 10, dup: 80 },
  legend: { name: "傳說", w: 2,  dup: 160 },
};
const SLOTS = { weapon: "武器", helmet: "頭盔", armor: "護甲", pet: "寵物" };
const ITEMS = [
  { id: "w1", slot: "weapon", r: "common", e: "🪵", n: "木棒",       s: { atk: 2 } },
  { id: "w2", slot: "weapon", r: "common", e: "🗡️", n: "鐵匕首",     s: { atk: 4 } },
  { id: "w3", slot: "weapon", r: "rare",   e: "🏹", n: "獵人之弓",   s: { atk: 7 } },
  { id: "w4", slot: "weapon", r: "epic",   e: "🔨", n: "雷神之鎚",   s: { atk: 11 } },
  { id: "w5", slot: "weapon", r: "legend", e: "⚔️", n: "星光雙劍",   s: { atk: 16, luck: 1 } },
  { id: "h1", slot: "helmet", r: "common", e: "🧢", n: "冒險帽",     s: { hp: 1 } },
  { id: "h2", slot: "helmet", r: "rare",   e: "⛑️", n: "騎士頭盔",   s: { hp: 1, atk: 2 } },
  { id: "h3", slot: "helmet", r: "epic",   e: "🎩", n: "魔術師帽",   s: { hp: 2, scroll: 1 } },
  { id: "h4", slot: "helmet", r: "legend", e: "👑", n: "勇者王冠",   s: { hp: 3, luck: 1 } },
  { id: "a1", slot: "armor",  r: "common", e: "👕", n: "布衣",       s: { shield: 1 } },
  { id: "a2", slot: "armor",  r: "rare",   e: "🥋", n: "武道服",     s: { shield: 1, hp: 1 } },
  { id: "a3", slot: "armor",  r: "epic",   e: "🛡️", n: "鋼鐵大盾",   s: { shield: 2, hp: 1 } },
  { id: "a4", slot: "armor",  r: "legend", e: "🐲", n: "龍鱗戰甲",   s: { shield: 3, hp: 1 } },
  { id: "p1", slot: "pet",    r: "common", e: "🐥", n: "小雞嗶嗶",   s: { scroll: 1 } },
  { id: "p2", slot: "pet",    r: "common", e: "🐱", n: "貓咪喵喵",   s: { luck: 1 } },
  { id: "p3", slot: "pet",    r: "rare",   e: "🦊", n: "聰明狐狸",   s: { scroll: 1, luck: 1 } },
  { id: "p4", slot: "pet",    r: "epic",   e: "🦄", n: "彩虹獨角獸", s: { scroll: 2, luck: 1 } },
  { id: "p5", slot: "pet",    r: "legend", e: "🐉", n: "小火龍",     s: { scroll: 2, luck: 2, atk: 4 } },
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const STAT_NAMES = { atk: "⚔️ 攻擊", hp: "❤️ 生命", shield: "🛡️ 護盾", scroll: "📜 提示卷軸", luck: "🍀 幸運" };
const statText = s => Object.entries(s).map(([k, v]) => `${STAT_NAMES[k].split(" ")[0]}+${v}`).join(" ");

// ---------- 存檔 ----------
const SAVE_PREFIX = "wordhero_";
const LAST_KEY = "wordhero_last";
let P = null;   // 目前玩家存檔

function newSave(name) {
  return { name, gold: 0, xp: 0, lvl: 1, stars: {}, items: [], eq: {}, streak: { last: "", n: 0 }, wrong: {} };
}
function load(name) {
  try { const d = JSON.parse(localStorage.getItem(SAVE_PREFIX + name)); if (d) return Object.assign(newSave(name), d); } catch (e) {}
  return newSave(name);
}
function save() {
  try { localStorage.setItem(SAVE_PREFIX + P.name, JSON.stringify(P)); localStorage.setItem(LAST_KEY, P.name); } catch (e) {}
}

function stats() {
  const s = { atk: 10 + (P.lvl - 1) * 2, hp: 3, shield: 0, scroll: 1, luck: 0 };
  Object.values(P.eq).forEach(id => { const it = ITEM[id]; if (it) for (const k in it.s) s[k] += it.s[k]; });
  return s;
}
const xpNeed = lvl => 80 + lvl * 40;
const today = () => new Date().toLocaleDateString("sv");   // YYYY-MM-DD（本地時間）

// ---------- 音效 / 發音 ----------
let AC = null;
function beep(notes) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    let t = AC.currentTime;
    notes.forEach(([f, d, type]) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type || "square"; o.frequency.value = f;
      g.gain.setValueAtTime(.08, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d); t += d * .8;
    });
  } catch (e) {}
}
const SFX = {
  hit:  () => beep([[660, .08], [880, .1]]),
  crit: () => beep([[660, .07], [990, .07], [1320, .14]]),
  hurt: () => beep([[200, .15, "sawtooth"], [140, .2, "sawtooth"]]),
  win:  () => beep([[523, .12], [659, .12], [784, .12], [1047, .3]]),
  lose: () => beep([[392, .2, "triangle"], [330, .2, "triangle"], [262, .4, "triangle"]]),
  loot: () => beep([[784, .08, "triangle"], [988, .08, "triangle"], [1175, .08, "triangle"], [1568, .25, "triangle"]]),
};
function pickVoice() {
  const v = speechSynthesis.getVoices();
  return v.find(x => /en[-_]US/i.test(x.lang) && /Samantha|Google|Microsoft/i.test(x.name)) || v.find(x => /^en/i.test(x.lang));
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = .85;
  const v = pickVoice(); if (v) u.voice = v;
  setTimeout(() => { try { speechSynthesis.speak(u); } catch (e) {} }, 50);
}
if ("speechSynthesis" in window) speechSynthesis.getVoices();

function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1800);
}
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo(0, 0);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---------- 登入 ----------
function login() {
  const name = $("login-name").value.trim();
  if (!name) { toast("請輸入名字"); return; }
  P = load(name); save(); showMap();
}
function logout() { P = null; $("login-name").value = ""; show("s-login"); }

// ---------- 關卡資料 ----------
function secWords(id) { return SEC[id].words; }
function stageCount(id) { return SEC[id].final ? 0 : Math.ceil(secWords(id).length / STAGE_SIZE); }
function stageWords(id, idx) { return secWords(id).slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE); }
const sKey = (id, idx) => `${id}-${idx}`;   // idx = "B" 為魔王
function isUnlocked(id, idx) {
  if (idx === "B") {
    if (SEC[id].final) return SEC[id].needs.every(n => P.stars[sKey(n, "B")]);
    for (let i = 0; i < stageCount(id); i++) if (!P.stars[sKey(id, i)]) return false;
    return true;
  }
  return idx === 0 || !!P.stars[sKey(id, idx - 1)];
}

// ---------- 地圖 ----------
function renderHud() {
  const need = xpNeed(P.lvl);
  const st = P.streak.last === today() || isYesterday(P.streak.last) ? P.streak.n : 0;
  $("hud").innerHTML = `
    <div class="hero-mini">🧒</div>
    <div class="who"><b>${esc(P.name)}</b> <span style="opacity:.8">Lv.${P.lvl}</span>
      <div class="xpbar"><i style="width:${Math.min(100, P.xp / need * 100)}%"></i></div></div>
    <span class="pill">🔥 ${st} 天</span>
    <span class="pill">💰 ${P.gold}</span>`;
}
function isYesterday(d) {
  if (!d) return false;
  const y = new Date(); y.setDate(y.getDate() - 1);
  return d === y.toLocaleDateString("sv");
}
function showMap() {
  renderHud();
  const bi = Math.min(P.book || 0, BOOKS.length - 1);
  const book = BOOKS[bi];
  let firstNextMarked = false;
  const tabs = `<div class="tabs">${BOOKS.map((b, i) =>
    `<button class="tab ${i === bi ? "on" : ""}" onclick="pickBook(${i})">${b.name}</button>`).join("")}</div>`;
  $("islands").innerHTML = tabs + book.sections.map(sec => {
    const isl = sec.theme, n = stageCount(sec.id);
    let earned = 0, html = "";
    for (let i = 0; i < n; i++) {
      const s = P.stars[sKey(sec.id, i)] || 0; earned += s;
      const open = isUnlocked(sec.id, i);
      const next = open && !s && !sec.extra && !firstNextMarked;
      if (next) firstNextMarked = true;
      const kd = KIND_INFO[stageKind(i)];
      html += `<button class="stage ${open ? "" : "locked"} ${next ? "next" : ""}" title="${kd.n}" ${open ? `onclick="startStage('${sec.id}',${i})"` : "disabled"}>
        <span class="sk">${kd.e}</span><span>${open ? i + 1 : "🔒"}</span><span class="st">${"★".repeat(s)}</span></button>`;
    }
    const bs = P.stars[sKey(sec.id, "B")] || 0; earned += bs;
    const bOpen = isUnlocked(sec.id, "B");
    html += `<button class="stage boss ${bOpen ? "" : "locked"}" ${bOpen ? `onclick="startStage('${sec.id}','B')"` : "disabled"}>
      <span>${bOpen ? isl.boss : "🔒"}</span><span class="st">${bs ? "★".repeat(bs) : sec.final ? "總魔王" : "魔王"}</span></button>`;
    const meta = sec.final
      ? `前面每一段的魔王都打倒後開啟・隨機 ${FINAL_SIZE} 題拼字`
      : `${secWords(sec.id).length} 個單字・${n} 關 + 魔王`;
    return `<div class="island ${sec.extra ? "extra" : ""}" style="background:${isl.color}">
      <div class="ihead"><span class="iemoji">${sec.final ? isl.boss : isl.mons[0]}</span>
        <div><div class="iname">${sec.label}${sec.extra ? "（選玩）" : ""}</div>
        <div class="imeta">${isl.name}・${meta}・⭐ ${earned} / ${(n + 1) * 3}</div></div></div>
      <div class="stages">${html}</div></div>`;
  }).join("");
  show("s-map");
}
function pickBook(i) { P.book = i; save(); showMap(); }

// ---------- 戰鬥 ----------
let B = null;   // 戰鬥狀態

function startStage(unit, idx) {
  const sec = SEC[unit], isl = sec.theme;
  const boss = idx === "B";
  const size = sec.final ? FINAL_SIZE : BOSS_SIZE;
  const words = boss ? sample(secWords(unit), Math.min(size, secWords(unit).length)) : stageWords(unit, idx);
  const S = stats();
  B = {
    unit, idx, boss, isl, sec,
    queue: shuffle(words).map(w => ({ w, tries: 0 })),
    total: words.length, defeated: 0,
    hp: S.hp, maxHp: S.hp, shield: S.shield, scrolls: S.scroll, atk: S.atk, luck: S.luck,
    combo: 0, maxCombo: 0, mistakes: 0, dmg: 0, missed: [],
    monster: boss ? isl.boss : isl.mons[(typeof idx === "number" ? idx : 0) % isl.mons.length],
    locked: false,
    kind: boss ? "boss" : stageKind(idx),
    // 技能效果（game-modes.js 的三選一技能會改這些值）
    skills: [], dmgMul: 1, goldMul: 1, guard: 0, eye: 0, critEvery: 3, chestSure: false,
    token: (B && B.token || 0) + 1,   // 換關時讓舊的計時器失效
  };
  if (MINI_KINDS.includes(B.kind)) { startMini(); return; }
  $("b-title").textContent = `${sec.label}・` + (boss ? (sec.final ? "😈 總魔王" : "👑 魔王") : `第 ${idx + 1} 關`);
  const m = $("b-monster"); m.textContent = B.monster; m.className = "monster" + (boss ? " boss" : "");
  renderHero();
  renderArena();
  nextQuestion();
  show("s-battle");
}

function renderHero() {
  const g = slot => P.eq[slot] ? `<span class="gear g-${slot}">${ITEM[P.eq[slot]].e}</span>` : "";
  $("b-hero").innerHTML = `🧒${g("weapon")}${g("helmet")}${g("armor")}${g("pet")}`;
}
function renderArena() {
  $("b-hearts").textContent = "❤️".repeat(B.hp) + "🖤".repeat(Math.max(0, B.maxHp - B.hp)) + (B.shield ? ` 🛡️×${B.shield}` : "");
  $("b-mhp").style.width = ((B.total - B.defeated) / B.total * 100) + "%";
  $("b-mleft").textContent = `剩 ${B.total - B.defeated} 隻`;
  $("b-combo").textContent = B.combo >= 2 ? `🔥 ${B.combo} 連擊！` : "";
  $("b-skills").innerHTML = B.skills.map(id => `<span title="${SKILL[id].n}">${SKILL[id].e}</span>`).join("");
}

function distractors(field, correct, n) {
  // 干擾選項先從同一個小範圍挑，不夠再從同一份資料補
  const pool = [...new Set(secWords(B.unit).map(w => w[field]).filter(x => x !== correct))];
  if (pool.length < n) {
    B.sec.units.forEach(u => WORDS_BY_UNIT[u].forEach(w => { if (w[field] !== correct && !pool.includes(w[field])) pool.push(w[field]); }));
  }
  return sample(pool, n);
}
function findSentence(en) {
  const list = typeof SENTENCES_BY_UNIT === "undefined" ? [] : B.sec.units.flatMap(u => SENTENCES_BY_UNIT[u] || []);
  return list.find(s => s.base === en || s.blank === en);
}
function kk(en) {
  if (typeof KK_BY_UNIT === "undefined") return "";
  for (const u of B.sec.units) if (KK_BY_UNIT[u] && KK_BY_UNIT[u][en]) return KK_BY_UNIT[u][en];
  return "";
}

function nextQuestion() {
  B.locked = false;
  const item = B.queue[0];
  const [en, zh] = item.w;
  let type;
  if (B.boss) {
    type = findSentence(en) && Math.random() < .4 ? "sent" : "spell";
  } else if (B.kind === "scramble") {
    type = "scramble";
  } else {
    // 一般關：選擇題為主，穿插字母拼圖；答錯重來的字換一種題型
    const types = ["en2zh", "zh2en", "listen", "scramble"].filter(t => t !== item.lastType);
    type = types[rand(types.length)];
  }
  item.lastType = type;
  B.q = { type, en, zh, item };
  const box = $("b-q");
  const tools = `<div class="tools">
      <button class="btn ghost" id="b-scroll" onclick="useScroll()" ${B.scrolls ? "" : "disabled"}>📜 提示 ×${B.scrolls}</button>
      <span class="muted">${B.defeated + 1} / ${B.total}</span></div>
    <div class="feedback" id="b-fb"></div>`;

  if (type === "en2zh" || type === "zh2en" || type === "listen") {
    const isZh = type === "en2zh";
    const answer = isZh ? zh : en;
    const opts = shuffle([answer, ...distractors(isZh ? 1 : 0, answer, 3)]);
    B.q.answer = answer;
    let head = "";
    if (type === "en2zh") head = `<div class="qtype">這個單字是什麼意思？</div><div class="qmain">${esc(en)}</div><div class="qsub">${esc(kk(en))} <button class="btn ghost" style="padding:4px 10px" onclick="speak('${esc(en).replace(/'/g, "\\'")}')">🔊</button></div>`;
    if (type === "zh2en") head = `<div class="qtype">選出正確的英文</div><div class="qmain zh">${esc(zh)}</div><div class="qsub"></div>`;
    if (type === "listen") head = `<div class="qtype">聽聽看，是哪個單字？</div><button class="speaker" onclick="speak(B.q.en)">🔊</button>`;
    box.innerHTML = head + `<div class="choices">${opts.map(o =>
      `<button class="choice" data-v="${esc(o)}" onclick="pick(this)">${esc(o)}</button>`).join("")}</div>` + tools;
    if (type !== "zh2en") speak(en);
    if (B.eye > 0) {   // 技能「透視之眼」：自動刪掉一個錯誤選項
      B.eye--;
      const wrongs = [...box.querySelectorAll(".choice")].filter(c => c.dataset.v !== answer);
      wrongs[rand(wrongs.length)].classList.add("gone");
    }
  } else if (type === "scramble") {
    renderScramble(box, tools);
  } else {
    let head;
    if (type === "sent") {
      const s = findSentence(en);
      B.q.answer = s.blank;
      head = `<div class="qtype">👑 魔王：填入句子中缺少的單字</div>
        <div class="qsent">${esc(s.s).replace("{blank}", "<b>______</b>")}</div>
        <div class="qsub">${esc(s.zh)}</div>`;
    } else {
      B.q.answer = en;
      head = `<div class="qtype">👑 魔王：拼出這個單字</div><div class="qmain zh">${esc(zh)}</div>
        <button class="speaker" onclick="speak(B.q.en)">🔊</button>`;
      speak(en);
    }
    box.innerHTML = head + `<div class="qsub" id="b-hint"></div>
      <input type="text" id="b-input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="輸入英文">
      <div style="height:10px"></div><button class="btn full" onclick="submitTyped()">⚔️ 攻擊！</button>` + tools;
    const inp = $("b-input");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") submitTyped(); });
    setTimeout(() => inp.focus(), 100);
  }
}

const norm = s => String(s).toLowerCase().replace(/\(.*?\)/g, "").replace(/[’']/g, "'").replace(/[^a-z' -]/g, "").replace(/\s+/g, " ").trim();
function typedOk(input, answer) {
  const a = norm(input);
  return !!a && String(answer).split("/").some(x => norm(x) === a);
}

function pick(btn) {
  if (B.locked) return;
  const ok = btn.dataset.v === B.q.answer;
  document.querySelectorAll(".choice").forEach(c => {
    if (c.dataset.v === B.q.answer) c.classList.add("right");
  });
  if (!ok) btn.classList.add("wrong");
  resolve(ok);
}
function submitTyped() {
  if (B.locked) return;
  const inp = $("b-input");
  if (!inp.value.trim()) { inp.focus(); return; }
  inp.disabled = true;
  resolve(typedOk(inp.value, B.q.answer));
}

function useScroll() {
  if (B.locked || !B.scrolls) return;
  B.scrolls--;
  $("b-scroll").textContent = `📜 提示 ×${B.scrolls}`;
  $("b-scroll").disabled = true;
  if (B.q.type === "scramble") { scrambleHint(); return; }
  const choices = [...document.querySelectorAll(".choice")].filter(c => c.dataset.v !== B.q.answer);
  if (choices.length) { shuffle(choices).slice(0, 2).forEach(c => c.classList.add("gone")); }
  else {
    const a = String(B.q.answer).split("/")[0];
    // 拼字題聽得到發音，首字母等於白給 → 改露出中間幾個字母；句子填空沒有發音，才給首字母
    let pattern;
    if (B.q.type === "spell") {
      const pos = a.split("").map((c, i) => i).filter(i => i > 0 && /[a-zA-Z]/.test(a[i]));
      const keep = new Set(shuffle(pos).slice(0, Math.max(1, Math.floor(pos.length / 3))));
      pattern = a.split("").map((ch, i) => ch === " " ? "　" : keep.has(i) ? ch : "_").join(" ");
    } else {
      pattern = a.split("").map((ch, i) => i === 0 || ch === " " ? ch : "_").join(" ");
    }
    $("b-hint").textContent = `提示：${pattern}（${a.replace(/[^a-zA-Z]/g, "").length} 個字母）`;
  }
}

function floatText(text, cls, target) {
  const arena = $("arena"), r = target.getBoundingClientRect(), ar = arena.getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "float " + cls; f.textContent = text;
  f.style.left = (r.left - ar.left + r.width / 2 - 20) + "px";
  f.style.top = (r.top - ar.top) + "px";
  arena.appendChild(f); setTimeout(() => f.remove(), 900);
}

function resolve(ok) {
  B.locked = true;
  const fb = $("b-fb"), hero = $("b-hero"), mon = $("b-monster");
  const item = B.queue.shift();
  if (ok) {
    B.combo++; B.maxCombo = Math.max(B.maxCombo, B.combo);
    const crit = B.combo % B.critEvery === 0;
    const dmg = Math.round((B.atk * (crit ? 2 : 1) + rand(4)) * B.dmgMul);
    B.dmg += dmg; B.defeated++;
    hero.classList.add("lunge"); setTimeout(() => hero.classList.remove("lunge"), 180);
    mon.classList.remove("shake"); void mon.offsetWidth; mon.classList.add("shake");
    floatText((crit ? "暴擊 " : "") + dmg, crit ? "crit" : "", mon);
    crit ? SFX.crit() : SFX.hit();
    fb.className = "feedback show ok";
    fb.innerHTML = `✅ 答對了！ ${esc(B.q.en)} = ${esc(B.q.zh)}`;
    if (B.q.type === "zh2en" || B.q.type === "scramble") speak(B.q.en);
    renderArena();
    const tk = B.token;
    setTimeout(() => {
      if (B.token !== tk) return;
      if (B.defeated >= B.total) endBattle(true);
      else if (B.defeated % SKILL_EVERY === 0) showSkillPick();   // 每打倒幾隻就三選一技能
      else nextQuestion();
    }, 1100);
  } else {
    if (B.guard > 0) { B.guard--; toast("🔗 連擊護符生效，連擊沒有中斷！"); } else B.combo = 0;
    B.mistakes++;
    item.tries++;
    if (!B.missed.some(w => w[0] === item.w[0])) B.missed.push(item.w);
    // 答錯的怪物逃回隊伍後面，等一下還要再打一次
    B.queue.splice(Math.min(B.queue.length, 2 + rand(2)), 0, item);
    hero.classList.remove("hurt"); void hero.offsetWidth; hero.classList.add("hurt");
    let lost = "";
    if (B.shield > 0) { B.shield--; floatText("🛡️ 擋住了", "miss", hero); lost = "護盾幫你擋下了攻擊！"; }
    else { B.hp--; floatText("-❤️", "", hero); lost = "你被打中了！"; }
    SFX.hurt();
    speak(B.q.en);
    fb.className = "feedback show no";
    fb.innerHTML = `❌ ${lost}<br>正確答案：<b>${esc(B.q.type === "sent" ? B.q.answer : B.q.en)}</b>${B.q.type === "sent" && B.q.answer !== B.q.en ? `（原形 ${esc(B.q.en)}）` : ""} = ${esc(B.q.zh)}
      <div style="height:10px"></div><button class="btn full" onclick="${B.hp <= 0 ? "endBattle(false)" : "nextQuestion()"}">${B.hp <= 0 ? "😵 繼續" : "記住了，繼續戰鬥 ▶"}</button>`;
    renderArena();
  }
}

function quitBattle() {
  if (confirm("確定要撤退嗎？這關的進度不會保存。")) { B.token++; showMap(); }
}

// ---------- 結算 & 掉寶 ----------
function rollItem(luck, minRarity) {
  const order = ["common", "rare", "epic", "legend"];
  const w = { common: RARITY.common.w, rare: RARITY.rare.w, epic: RARITY.epic.w + luck * 3, legend: RARITY.legend.w + luck * 1.5 };
  const min = order.indexOf(minRarity || "common");
  const allowed = order.filter((_, i) => i >= min);
  let total = allowed.reduce((a, r) => a + w[r], 0), x = Math.random() * total, r = allowed[0];
  for (const k of allowed) { if ((x -= w[k]) < 0) { r = k; break; } }
  return sample(ITEMS.filter(i => i.r === r), 1)[0];
}
function grantItem(it) {
  if (P.items.includes(it.id)) { const g = RARITY[it.r].dup; P.gold += g; return `（已經有了，換成 💰${g}）`; }
  P.items.push(it.id);
  if (!P.eq[it.slot] || rarityRank(ITEM[P.eq[it.slot]].r) < rarityRank(it.r)) { P.eq[it.slot] = it.id; return "（已自動裝備！）"; }
  return "（已放進背包）";
}
const rarityRank = r => ["common", "rare", "epic", "legend"].indexOf(r);
function lootHtml(it, note) {
  return `<div class="loot r-${it.r}"><div class="le">${it.e}</div>
    <div style="font-weight:900">${it.n}</div>
    <div class="t-${it.r}" style="font-weight:800">${RARITY[it.r].name}・${SLOTS[it.slot]}</div>
    <div class="muted">${statText(it.s)}</div><div class="muted">${note}</div></div>`;
}

function addXp(n) {
  P.xp += n; let ups = 0;
  while (P.xp >= xpNeed(P.lvl)) { P.xp -= xpNeed(P.lvl); P.lvl++; ups++; }
  return ups;
}

function endBattle(win) {
  const key = sKey(B.unit, B.idx);
  const missedHtml = B.missed.length ? `<div class="missed"><b>📝 這次要再複習的單字：</b>${B.missed.map(w =>
    `<div>🔊 <a href="#" onclick="speak('${esc(w[0]).replace(/'/g, "\\'")}');return false"><b>${esc(w[0])}</b></a> ${esc(w[1])}</div>`).join("")}</div>` : "";
  B.missed.forEach(w => { P.wrong[w[0]] = (P.wrong[w[0]] || 0) + 1; });

  if (!win) {
    SFX.lose(); save();
    $("result-body").innerHTML = `<div class="big">😵</div><h2>被打倒了…</h2>
      <p class="muted" style="margin-bottom:12px">沒關係！把下面的單字多唸幾次，再挑戰一次一定可以！</p>
      ${missedHtml}
      <div class="row"><button class="btn" onclick="startStage(B.unit, B.idx)">🔁 再挑戰</button>
      <button class="btn ghost" onclick="showMap()">🗺️ 地圖</button></div>`;
    show("s-result"); return;
  }

  const stars = B.mistakes === 0 ? 3 : B.mistakes <= 2 ? 2 : 1;
  const prev = P.stars[key] || 0;
  const first = !prev;
  P.stars[key] = Math.max(prev, stars);
  const gold = Math.round((Math.round(B.dmg / 5) + stars * 10 + (B.boss ? 50 : 0) + (first ? 20 : 0)) * B.goldMul);
  P.gold += gold;
  const ups = addXp(B.total * 10 + stars * 10);
  // 連續天數
  if (P.streak.last !== today()) { P.streak.n = isYesterday(P.streak.last) ? P.streak.n + 1 : 1; P.streak.last = today(); }

  // 寶箱：首次過關、魔王、或三星必掉；其他情況 50%
  const dropChest = first || B.boss || B.chestSure || stars === 3 || Math.random() < .5;
  let chest = null;
  if (dropChest) {
    chest = rollItem(B.luck + (stars === 3 ? 1 : 0), B.boss ? "rare" : "common");
  }
  save();
  SFX.win();
  B.pendingChest = chest;
  $("result-body").innerHTML = `<div class="big">${B.boss ? "👑" : "🎉"}</div>
    <h2>${B.boss ? `打倒魔王 ${B.monster}！${B.sec.label} 征服！` : "過關！"}</h2>
    <div class="stars">${[1, 2, 3].map(i => `<span class="${i <= stars ? "" : "off"}">⭐</span>`).join("")}</div>
    <p class="muted">${stars === 3 ? "完美！一題都沒錯！" : stars === 2 ? "很棒！只錯了一點點" : "過關了！下次挑戰三星吧"}・最高 ${B.maxCombo} 連擊</p>
    <div class="rewards"><span>💰 +${gold}</span><span>✨ 經驗 +${B.total * 10 + stars * 10}</span>${ups ? `<span style="color:#16a34a">🆙 升到 Lv.${P.lvl}！攻擊+${ups * 2}</span>` : ""}</div>
    ${missedHtml}
    <div id="chest-area">${chest ? `<div class="chest wiggle" onclick="openChest()">🎁</div><p class="muted">點寶箱打開！</p>` : `<p class="muted">這次沒有掉寶箱，三星過關必掉喔！</p>`}</div>
    <div class="row" style="margin-top:12px"><button class="btn ghost" onclick="showMap()">🗺️ 回地圖</button>
    ${nextStageBtn()}</div>`;
  show("s-result");
}
function nextStageBtn() {
  if (B.boss) return "";
  const n = stageCount(B.unit);
  if (B.idx + 1 < n) return `<button class="btn" onclick="startStage(B.unit, ${B.idx + 1})">下一關 ▶</button>`;
  return `<button class="btn" onclick="startStage(B.unit, 'B')">👑 挑戰魔王</button>`;
}
function openChest() {
  const it = B.pendingChest; if (!it) return;
  B.pendingChest = null;
  const note = grantItem(it); save(); SFX.loot();
  $("chest-area").innerHTML = lootHtml(it, note);
}

// ---------- 背包 ----------
function openBag() {
  const S = stats();
  $("bag-slots").innerHTML = Object.entries(SLOTS).map(([k, n]) => {
    const it = ITEM[P.eq[k]];
    return `<div class="slot ${it ? "r-" + it.r : ""}"><span class="se">${it ? it.e : "➕"}</span>${it ? it.n : n}</div>`;
  }).join("");
  $("bag-stats").innerHTML = Object.entries(STAT_NAMES).map(([k, n]) => `<div>${n}：${S[k]}</div>`).join("") + `<div>⭐ 等級：Lv.${P.lvl}</div>`;
  $("bag-count").textContent = `${P.items.length} / ${ITEMS.length}`;
  const owned = ITEMS.filter(i => P.items.includes(i.id)).sort((a, b) => rarityRank(b.r) - rarityRank(a.r));
  $("bag-items").innerHTML = owned.length ? owned.map(it => `<button class="item r-${it.r} ${P.eq[it.slot] === it.id ? "eq" : ""}" onclick="toggleEquip('${it.id}')">
      <span class="ie">${it.e}</span><span><div class="in">${it.n}</div><div class="is t-${it.r}">${RARITY[it.r].name}・${SLOTS[it.slot]}${P.eq[it.slot] === it.id ? "・裝備中" : ""}</div><div class="is">${statText(it.s)}</div></span></button>`).join("")
    : `<p class="muted">還沒有裝備，快去闖關拿寶箱吧！</p>`;
  show("s-bag");
}
function toggleEquip(id) {
  const it = ITEM[id];
  if (P.eq[it.slot] === id) delete P.eq[it.slot]; else P.eq[it.slot] = id;
  save(); openBag();
}

// ---------- 商店 ----------
function openShop() {
  $("shop-price").textContent = CHEST_PRICE;
  $("shop-buy").disabled = P.gold < CHEST_PRICE;
  $("shop-buy").textContent = P.gold < CHEST_PRICE ? `金幣不夠（還差 ${CHEST_PRICE - P.gold}）` : `購買並打開（你有 💰${P.gold}）`;
  $("shop-loot").innerHTML = "";
  const luck = stats().luck;
  const w = { common: RARITY.common.w, rare: RARITY.rare.w, epic: RARITY.epic.w + luck * 3, legend: RARITY.legend.w + luck * 1.5 };
  const tot = Object.values(w).reduce((a, b) => a + b, 0);
  $("shop-odds").innerHTML = Object.keys(w).map(r => `<span class="t-${r}" style="font-weight:800">${RARITY[r].name}</span> ${(w[r] / tot * 100).toFixed(1)}%`).join("　") +
    `<br>🍀 幸運越高，越容易開出史詩和傳說！（目前幸運 ${luck}）`;
  show("s-shop");
}
function buyChest() {
  if (P.gold < CHEST_PRICE) return;
  P.gold -= CHEST_PRICE;
  const it = rollItem(stats().luck);
  const note = grantItem(it); save(); SFX.loot();
  openShop();
  $("shop-loot").innerHTML = lootHtml(it, note);
}

// ---------- 啟動 ----------
(function init() {
  if (!Object.keys(SEC).length) { document.body.innerHTML = "<p style='color:#fff'>找不到單字資料（data.js）</p>"; return; }
  $("login-name").addEventListener("keydown", e => { if (e.key === "Enter") login(); });
  let last = null; try { last = localStorage.getItem(LAST_KEY); } catch (e) {}
  if (last) { P = load(last); showMap(); } else show("s-login");
})();

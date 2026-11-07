"use strict";
// ===== 單字勇者：關卡種類、小遊戲、技能三選一 =====
// 需在 game.js 之前載入（game.js 會用到 KIND_INFO / MINI_KINDS / SKILL 等常數）

// ---------- 關卡種類 ----------
// 每座島的關卡依序輪流：戰鬥 → 翻牌 → 拼圖 → 打地鼠 → 泡泡 → 戰鬥 …，最後一關固定是魔王
const KINDS = ["battle", "match", "scramble", "mole", "bubble"];
const KIND_INFO = {
  battle:   { e: "⚔️", n: "怪物戰鬥" },
  match:    { e: "🃏", n: "翻牌配對" },
  scramble: { e: "🧩", n: "字母拼圖" },
  mole:     { e: "🔨", n: "打地鼠" },
  bubble:   { e: "🫧", n: "泡泡射擊" },
  boss:     { e: "👑", n: "魔王" },
};
const MINI_KINDS = ["match", "mole", "bubble"];   // 不走一般戰鬥畫面的小遊戲
function stageKind(idx) { return KINDS[idx % KINDS.length]; }

// ---------- 字母拼圖（戰鬥中的題型）----------
const cleanWord = en => String(en).split("/")[0].replace(/\(.*?\)/g, "").trim();

function renderScramble(box, tools) {
  const word = cleanWord(B.q.en);
  B.q.answer = word;
  const chars = word.split("");
  const letters = chars.filter(c => /[a-zA-Z]/.test(c)).map(c => c.toLowerCase());
  let order = shuffle(letters);
  for (let k = 0; k < 6 && letters.length > 1 && order.join("") === letters.join(""); k++) order = shuffle(letters);
  B.sc = {
    chars,
    slots: chars.map(c => /[a-zA-Z]/.test(c) ? null : { ch: c, fixed: true }),
    tiles: order.map((c, id) => ({ c, id, used: false })),
  };
  box.innerHTML = `<div class="qtype">🧩 點字母，拼出這個單字</div>
    <div class="qmain zh">${esc(B.q.zh)}</div>
    <button class="speaker small" onclick="speak(B.q.en)">🔊</button>
    <div class="sc-slots" id="sc-slots"></div>
    <div class="sc-tiles" id="sc-tiles"></div>
    <div style="text-align:center;margin-top:8px"><button class="btn ghost" style="padding:8px 14px" onclick="scClear()">↺ 全部拿回來</button></div>` + tools;
  renderSc();
  speak(B.q.en);
}
function renderSc(state) {
  $("sc-slots").innerHTML = B.sc.slots.map((s, i) => {
    if (s && s.fixed) return s.ch === " " ? `<span class="sc-gap"></span>` : `<span class="sc-slot fixed">${esc(s.ch)}</span>`;
    const cls = !s ? "" : s.locked ? "locked" : "filled";
    return `<button class="sc-slot ${cls} ${state || ""}" onclick="scUnplace(${i})">${s ? esc(s.ch) : ""}</button>`;
  }).join("");
  $("sc-tiles").innerHTML = B.sc.tiles.map(t =>
    `<button class="sc-tile ${t.used ? "used" : ""}" onclick="scPlace(${t.id})" ${t.used ? "disabled" : ""}>${esc(t.c)}</button>`).join("");
}
function scPlace(id) {
  if (B.locked) return;
  const t = B.sc.tiles[id], i = B.sc.slots.indexOf(null);
  if (!t || t.used || i < 0) return;
  t.used = true; B.sc.slots[i] = { ch: t.c, tile: id };
  beep([[520 + rand(200), .05, "triangle"]]);
  renderSc();
  if (!B.sc.slots.includes(null)) scCheck();
}
function scUnplace(i) {
  const s = B.sc.slots[i];
  if (B.locked || !s || s.fixed || s.locked) return;
  B.sc.tiles[s.tile].used = false; B.sc.slots[i] = null;
  renderSc();
}
function scClear() {
  if (B.locked) return;
  B.sc.slots.forEach((s, i) => { if (s && !s.fixed && !s.locked) { B.sc.tiles[s.tile].used = false; B.sc.slots[i] = null; } });
  renderSc();
}
function scCheck() {
  const built = B.sc.slots.map(s => s.ch).join("");
  const ok = built.toLowerCase() === B.q.answer.toLowerCase();
  B.locked = true;
  renderSc(ok ? "right" : "wrong");
  setTimeout(() => { B.locked = false; resolve(ok); }, 350);
}
// 提示：聽得到發音，所以不給首字母，改把約 1/3 的其他字母直接放到正確位置
function scrambleHint() {
  B.sc.slots.forEach((s, i) => { if (s && s.tile !== undefined && !s.locked) { B.sc.tiles[s.tile].used = false; B.sc.slots[i] = null; } });
  const pos = B.sc.chars.map((c, i) => i).filter(i => i > 0 && /[a-zA-Z]/.test(B.sc.chars[i]));
  shuffle(pos).slice(0, Math.max(1, Math.floor(pos.length / 3))).forEach(i => {
    const c = B.sc.chars[i].toLowerCase();
    const t = B.sc.tiles.find(t => !t.used && t.c === c);
    if (t) { t.used = true; B.sc.slots[i] = { ch: c, locked: true }; }
  });
  renderSc();
  if (!B.sc.slots.includes(null)) scCheck();
}

// ---------- 技能三選一 ----------
const SKILL_EVERY = 3;   // 每打倒幾隻怪物選一次技能
const SKILLS = [
  { id: "fire",   e: "🔥", n: "烈焰之劍",   d: "攻擊傷害 +50%，金幣也變多",        ok: () => true,                     use: () => { B.dmgMul += .5; } },
  { id: "crit",   e: "⚡", n: "雷電暴擊",   d: "每 2 連擊就暴擊（原本要 3 連擊）",  ok: () => B.critEvery > 2,          use: () => { B.critEvery = 2; } },
  { id: "heal",   e: "💚", n: "治療藥水",   d: "生命 ❤️ +1（可以超過上限）",        ok: () => true,                     use: () => { B.hp++; B.maxHp = Math.max(B.maxHp, B.hp); } },
  { id: "shield", e: "🛡️", n: "魔法護盾",   d: "護盾 +1，可以擋下一次答錯",         ok: () => true,                     use: () => { B.shield++; } },
  { id: "scroll", e: "📜", n: "智慧卷軸",   d: "提示次數 +1",                       ok: () => true,                     use: () => { B.scrolls++; } },
  { id: "guard",  e: "🔗", n: "連擊護符",   d: "下一次答錯時，連擊不會中斷",        ok: () => true,                     use: () => { B.guard++; } },
  { id: "eye",    e: "👁️", n: "透視之眼",   d: "接下來 3 題選擇題，自動刪掉 1 個錯的", ok: () => !B.boss && B.kind !== "scramble", use: () => { B.eye += 3; } },
  { id: "magnet", e: "🧲", n: "金幣磁鐵",   d: "這一關拿到的金幣 +50%",             ok: () => true,                     use: () => { B.goldMul += .5; } },
  { id: "clover", e: "🍀", n: "幸運四葉草", d: "寶箱更容易開出史詩、傳說裝備",      ok: () => true,                     use: () => { B.luck += 2; } },
  { id: "gem",    e: "💎", n: "寶箱獵人",   d: "這一關過關一定掉寶箱",              ok: () => !B.chestSure && !B.boss,  use: () => { B.chestSure = true; } },
];
const SKILL = Object.fromEntries(SKILLS.map(s => [s.id, s]));

function showSkillPick() {
  B.locked = true;
  const opts = sample(SKILLS.filter(s => s.ok()), 3);
  B.skillOpts = opts.map(s => s.id);
  $("skill-cards").innerHTML = opts.map(s => `<button class="skill-card" onclick="pickSkill('${s.id}')">
      <span class="sk-e">${s.e}</span><b>${s.n}</b><span class="sk-d">${s.d}</span></button>`).join("");
  $("skill-modal").classList.add("show");
  beep([[523, .08, "triangle"], [784, .08, "triangle"], [1047, .16, "triangle"]]);
}
function pickSkill(id) {
  if (!B.skillOpts || !B.skillOpts.includes(id)) return;
  B.skillOpts = null;
  const s = SKILL[id];
  s.use(); B.skills.push(id);
  $("skill-modal").classList.remove("show");
  toast(`${s.e} 學會了「${s.n}」！`);
  SFX.loot();
  renderArena();
  nextQuestion();
}

// ---------- 小遊戲共用 ----------
function startMini() {
  const info = KIND_INFO[B.kind];
  $("m-title").textContent = `${B.sec.label}・第 ${B.idx + 1} 關・${info.e} ${info.n}`;
  show("s-mini");
  if (B.kind === "match") startMatch(); else startTap();
}
function renderMiniHud() {
  $("m-hearts").textContent = B.kind === "match" ? "" :
    "❤️".repeat(Math.max(0, B.hp)) + "🖤".repeat(Math.max(0, B.maxHp - B.hp)) + (B.shield ? ` 🛡️×${B.shield}` : "");
}
function miniMistake(item) {
  if (B.guard > 0) B.guard--; else B.combo = 0;
  B.mistakes++;
  if (item && !B.missed.some(w => w[0] === item.w[0])) B.missed.push(item.w);
  if (B.shield > 0) { B.shield--; toast("🛡️ 護盾幫你擋下來了！"); }
  else B.hp--;
  SFX.hurt();
  renderMiniHud();
  if (B.hp <= 0) {
    B.locked = true;
    const tk = B.token;
    setTimeout(() => { if (B.token === tk) endBattle(false); }, 1300);
    return true;
  }
  return false;
}
function miniCorrect() {
  B.combo++; B.maxCombo = Math.max(B.maxCombo, B.combo);
  B.defeated++;
  B.dmg += B.atk * (B.combo % 3 === 0 ? 2 : 1);
  B.combo % 3 === 0 ? SFX.crit() : SFX.hit();
}

// ---------- 翻牌配對 ----------
const shortZh = zh => {
  const s = String(zh).split(/[；;]/)[0].trim();
  return s.length > 12 ? s.slice(0, 11) + "…" : s;
};
function startMatch() {
  const words = B.queue.map(q => q.w);
  B.mt = { open: [], pairs: 0, flips: 0, miss: 0, busy: false, words };
  const cards = shuffle(words.flatMap((w, k) => [{ k, t: "en", v: w[0] }, { k, t: "zh", v: shortZh(w[1]) }]));
  $("m-info").innerHTML = `翻開兩張牌，把<b>英文</b>和<b>中文意思</b>配成一對！`;
  $("m-area").innerHTML = `<div class="match-grid">${cards.map((c, i) =>
    `<button class="mcard" data-k="${c.k}" data-t="${c.t}" onclick="flipCard(this)">
      <span class="back">${B.isl.mons[i % B.isl.mons.length]}</span><span class="face ${c.t}">${esc(c.v)}</span></button>`).join("")}</div>
    <div class="muted" id="mt-stat" style="text-align:center;margin-top:10px"></div>`;
  renderMiniHud(); matchStat();
}
function matchStat() {
  $("mt-stat").textContent = `已配對 ${B.mt.pairs} / ${B.mt.words.length}・翻錯 ${B.mt.miss} 次（4 次以內三星）`;
}
function flipCard(el) {
  const M = B.mt;
  if (M.busy || el.classList.contains("open") || el.classList.contains("done")) return;
  el.classList.add("open");
  beep([[440, .05, "triangle"]]);
  if (el.dataset.t === "en") speak(M.words[+el.dataset.k][0]);
  M.open.push(el);
  if (M.open.length < 2) return;
  const [a, b] = M.open; M.open = [];
  if (a.dataset.k === b.dataset.k && a.dataset.t !== b.dataset.t) {
    a.classList.add("done"); b.classList.add("done");
    M.pairs++; miniCorrect();
    const w = M.words[+a.dataset.k];
    toast(`✅ ${w[0]} = ${w[1]}`);
    if (a.dataset.t !== "en" && b.dataset.t !== "en") speak(w[0]);
    else setTimeout(() => speak(w[0]), 400);
    matchStat();
    if (M.pairs >= M.words.length) {
      // 記憶翻牌本來就會翻錯幾次：4 次以內算全對，之後每 2 次算錯 1 題
      B.mistakes = Math.max(0, Math.ceil((M.miss - 4) / 2));
      const tk = B.token;
      setTimeout(() => { if (B.token === tk) endBattle(true); }, 900);
    }
  } else {
    M.miss++; M.busy = true; B.combo = 0;
    a.classList.add("bad"); b.classList.add("bad");
    matchStat();
    setTimeout(() => { a.classList.remove("open", "bad"); b.classList.remove("open", "bad"); M.busy = false; }, 1000);
  }
}

// ---------- 打地鼠 / 泡泡射擊 ----------
const MOLE_TIME = 4500;     // 地鼠停留毫秒
const BUBBLE_TIME = 8;      // 泡泡飄到頂端秒數

function startTap() {
  const mole = B.kind === "mole";
  $("m-info").innerHTML = mole
    ? `聽發音 🔊，敲出<b>正確單字</b>的地鼠！敲錯或讓牠跑掉會被扣血。`
    : `看中文意思，射破<b>正確英文</b>的泡泡！別讓它飄走喔。`;
  $("m-area").innerHTML = `<div class="tap-prompt" id="tp-prompt"></div>
    ${mole ? `<div class="mole-grid" id="tp-field">${Array.from({ length: 9 }, (_, i) => `<div class="hole" id="hole-${i}"></div>`).join("")}</div>`
           : `<div class="bubble-field" id="tp-field"></div>`}
    <div class="muted" id="tp-stat" style="text-align:center;margin-top:10px"></div>`;
  B.round = 0;
  renderMiniHud();
  const tk = B.token;
  setTimeout(() => { if (B.token === tk) nextTapRound(); }, 700);
}
function tapStat() { $("tp-stat").textContent = `已打倒 ${B.defeated} / ${B.total}${B.combo >= 2 ? `・🔥 ${B.combo} 連擊` : ""}`; }

function nextTapRound() {
  if (B.defeated >= B.total) { endBattle(true); return; }
  B.locked = false;
  const rid = ++B.round, tk = B.token;
  const [en, zh] = B.queue[0].w;
  const mole = B.kind === "mole";
  const opts = shuffle([en, ...distractors(0, en, mole ? 2 : 3)]);
  tapStat();
  if (mole) {
    $("tp-prompt").innerHTML = `<button class="speaker small" onclick="speak('${esc(en).replace(/'/g, "\\'")}')">🔊</button><span>再聽一次</span>`;
    document.querySelectorAll(".hole").forEach(h => h.innerHTML = "");
    const holes = sample([0, 1, 2, 3, 4, 5, 6, 7, 8], opts.length);
    opts.forEach((o, i) => {
      $("hole-" + holes[i]).innerHTML = `<button class="mole" data-v="${esc(o)}" onclick="tapHit(this)"><span class="me">🐹</span><span class="mw">${esc(o)}</span></button>`;
    });
    speak(en);
    setTimeout(() => tapTimeout(tk, rid), MOLE_TIME);
  } else {
    $("tp-prompt").innerHTML = `<span class="tp-zh">${esc(zh)}</span>`;
    const field = $("tp-field");
    field.innerHTML = "";
    const lanes = shuffle(opts.map((_, i) => i));
    opts.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "bubble"; b.dataset.v = o; b.textContent = o;
      b.style.left = (lanes[i] * (100 / opts.length) + 2) + "%";
      b.style.animationDuration = BUBBLE_TIME + "s";
      b.style.animationDelay = (i * .5) + "s";
      b.onclick = () => tapHit(b);
      if (o === en) b.addEventListener("animationend", () => tapTimeout(tk, rid));
      field.appendChild(b);
    });
  }
}
function tapHit(el) {
  if (B.locked || el.classList.contains("miss")) return;
  const item = B.queue[0], en = item.w[0];
  if (el.dataset.v === en) {
    B.locked = true;
    if (el.classList.contains("bubble")) {   // 泡泡停在原地再爆開
      const tf = getComputedStyle(el).transform;
      el.style.animation = "none"; el.style.transform = tf === "none" ? "" : tf;
      el.style.transition = "opacity .3s, scale .3s"; void el.offsetWidth;
      el.style.opacity = "0"; el.style.scale = "1.6";
    } else el.classList.add("hit");
    miniCorrect();
    B.queue.shift();
    speak(en);
    toast(`✅ ${en} = ${item.w[1]}`);
    tapStat();
    const tk = B.token;
    setTimeout(() => { if (B.token === tk) nextTapRound(); }, 1000);
  } else {
    el.classList.add("miss");
    toast(`❌ 那是 ${el.dataset.v}，再找找看！`);
    miniMistake(item);
  }
}
function tapTimeout(tk, rid) {
  if (B.token !== tk || B.round !== rid || B.locked) return;
  B.locked = true;
  const item = B.queue.shift();
  // 跑掉的單字晚一點再出現
  B.queue.splice(Math.min(B.queue.length, 2), 0, item);
  document.querySelectorAll(`#tp-field [data-v]`).forEach(el => { if (el.dataset.v === item.w[0]) el.classList.add("reveal"); });
  speak(item.w[0]);
  toast(`💨 跑掉了！答案是 ${item.w[0]} = ${item.w[1]}`);
  if (miniMistake(item)) return;
  setTimeout(() => { if (B.token === tk) nextTapRound(); }, 1800);
}

// js/contact-terminal.js
(() => {
  const cmdEl = document.getElementById("cmd");
  const statusEl = document.getElementById("status");
  const links = document.getElementById("links");
  const actions = document.getElementById("actions");
  const replayBtn = document.getElementById("replayBtn");
  const soundToggle = document.getElementById("soundToggle");

  if (!cmdEl || !statusEl || !links || !actions) return;

  const cmdText = "establish_connection";
  const statuses = [
    "Connecting...",
    "Connection secure.",
    "Available endpoints: (Thank you for visiting.)",
    "System ready."
  ];

  // ===== typing helper =====
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeInto(el, text, speed = 35, onChar) {
    el.textContent = "";
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      onChar?.(text[i], i);
      await sleep(speed);
    }
  }

  // ===== sound (Web Audio) =====
  let soundEnabled = false;
  let ac = null; // AudioContext

  function ensureAudio() {
    if (ac) return ac;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    ac = new Ctx();
    return ac;
  }

  async function unlockAudioIfNeeded() {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch (_) {}
    }
  }

  function beep({ freq = 880, dur = 0.04, type = "sine", gain = 0.02 } = {}) {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state !== "running") return; // 未アンロック時は鳴らさない

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = type;
    o.frequency.value = freq;

    // クリック音っぽく短いエンベロープ
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    o.connect(g);
    g.connect(ctx.destination);

    o.start(t);
    o.stop(t + dur + 0.01);
  }

  // タイピング用の控えめな音
  function tick(char) {
    if (char === " ") return;
    // ランダム微揺れで機械感
    const f = 720 + Math.random() * 120;
    beep({ freq: f, dur: 0.03, type: "square", gain: 0.012 });
  }

  // 重要イベント用
  function ok() {
    beep({ freq: 980, dur: 0.06, type: "sine", gain: 0.02 });
    setTimeout(() => beep({ freq: 1240, dur: 0.06, type: "sine", gain: 0.02 }), 70);
  }

  // 初期：チェックボックスの状態を反映（HTML側でcheckedならオン）
  if (soundToggle) {
    soundEnabled = !!soundToggle.checked;

    // ユーザー操作でアンロック
    soundToggle.addEventListener("change", async () => {
      soundEnabled = !!soundToggle.checked;
      await unlockAudioIfNeeded();
      if (soundEnabled) beep({ freq: 880, dur: 0.06, type: "sine", gain: 0.02 });
    });
  }

  // ページ内の最初のクリック/タップでアンロック（自動再生対策）
  const unlockOnce = async () => {
    await unlockAudioIfNeeded();
    window.removeEventListener("pointerdown", unlockOnce);
    window.removeEventListener("keydown", unlockOnce);
  };
  window.addEventListener("pointerdown", unlockOnce, { once: true });
  window.addEventListener("keydown", unlockOnce, { once: true });

  // ===== main sequence =====
  async function run() {
    // reset
    cmdEl.textContent = "";
    statusEl.textContent = "";
    links.hidden = true;
    actions.hidden = true;

    // type command
    await typeInto(cmdEl, cmdText, 35, () => tick("|"));
    await sleep(350);

    // cycle statuses
    for (let i = 0; i < statuses.length; i++) {
      await typeInto(statusEl, statuses[i], 18, (ch) => tick(ch));
      await sleep(i === statuses.length - 1 ? 500 : 700);
    }

    // show links/actions
    links.hidden = false;
    actions.hidden = false;

    // success sound
    ok();
  }

  // first run
  run();

  // replay
  if (replayBtn) {
    replayBtn.addEventListener("click", async () => {
      await unlockAudioIfNeeded();
      beep({ freq: 740, dur: 0.05, type: "sine", gain: 0.018 });
      run();
    });
  }
})();

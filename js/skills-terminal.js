(() => {
  const out = document.getElementById("t-output");
  const input = document.getElementById("t-input");
  const side = document.getElementById("t-side-text");
  const terminal = document.querySelector(".skills-terminal");
  if (!out || !input || !side || !terminal) return;

  // ===== Command History =====
  const history = [];
  let hi = -1;

  // タイピング中キャンセル用
  let typingToken = 0;

  // ===== Skills Data =====
  const skills = [
    {
      group: "Interface Engineering",
      items: [
        {
          name: "HTML / CSS",
          lv: 78,
          desc: "構造設計とスタイリング。レイアウト/タイポグラフィ/レスポンシブを中心に強化中。",
        },
        {
          name: "JavaScript",
          lv: 62,
          desc: "UI挙動や小さな機能を実装。イベント/DOM/状態管理の基礎を改善中。",
        },
        {
          // “確定スキルに見せたくない” → 0~100を伸縮
          name: "UI Design",
          lv: 55,
          scan: true,
          desc: "情報設計と一貫性を学習中。試作→観察→改善の反復で精度を上げています。",
        },
      ],
    },
    {
      group: "AI Integration",
      items: [
        {
          name: "Python",
          lv: 58,
          desc: "検証・自動化・簡単なAI連携に使用。実装経験を積み上げ中。",
        },
        {
          name: "ML Basics",
          lv: 42,
          scan: true,
          desc: "基礎（前処理/評価/特徴量など）を学習中。手を動かしながら理解を深めています。",
        },
        {
          name: "API / Tools",
          lv: 50,
          desc: "外部APIやツール連携の経験を増やし、プロダクトに組み込む練習中。",
        },
      ],
    },
    {
      group: "Product Mindset",
      items: [
        {
          name: "MVP Design",
          lv: 60,
          desc: "最小で価値検証 → 学習 → 改善。要件を削って尖らせる設計を意識。",
        },
        {
          name: "Git / GitHub",
          lv: 65,
          desc: "変更履歴を残して改善を回す。個人開発で運用を継続中。",
        },
        {
          name: "Iteration",
          lv: 58,
          desc: "仮説→実装→振り返りのサイクルを短く回す練習中。",
        },
      ],
    },
  ];

  // ===== Utilities =====
  function escHtml(str) {
    return String(str).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  function line(html = "", cls = "t-line") {
    const p = document.createElement("p");
    p.className = cls;
    p.innerHTML = html;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function typeLine(text, speed = 12, cls = "t-line") {
    typingToken += 1;
    const token = typingToken;

    const p = document.createElement("p");
    p.className = cls;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;

    for (let i = 0; i < text.length; i++) {
      if (token !== typingToken) return; // キャンセル
      p.textContent += text[i];
      out.scrollTop = out.scrollHeight;
      await sleep(speed);
    }
  }

  function flashTerminal() {
    terminal.classList.add("flash");
    setTimeout(() => terminal.classList.remove("flash"), 120);
  }

  // ===== Render Skill Row =====
  function renderSkillRow(s) {
    const wrap = document.createElement("div");
    wrap.className = "skill-row";
    wrap.dataset.desc = s.desc;

    const isScan = !!s.scan;

    wrap.innerHTML = `
      <span class="skill-name">${escHtml(s.name)}</span>
      <span class="skill-bar ${isScan ? "is-scan" : ""}" style="--lv:${Number(s.lv) || 0}%">
        <i></i>
      </span>
      <span class="skill-lv">${isScan ? "??" : escHtml(s.lv)}</span>
    `;

    out.appendChild(wrap);
    out.scrollTop = out.scrollHeight;
  }

  // ===== Commands =====
  async function cmdHelp() {
    await typeLine("help   : show commands", 10);
    await typeLine("skills : list skills (typing)", 10);
    await typeLine("clear  : clear terminal", 10);
    await typeLine("", 1);

    // ショートカットボタン（迷わない）
    line(
      `<span class="t-muted">shortcuts:</span>
       <button class="t-btn" data-cmd="skills">skills</button>
       <button class="t-btn" data-cmd="help">help</button>
       <button class="t-btn" data-cmd="clear">clear</button>`
    );
    line("");
  }

  async function cmdSkills() {
    await typeLine("running: skills --list", 10);
    await typeLine("", 1);

    for (const g of skills) {
      const title = document.createElement("p");
      title.className = "t-line t-accent";
      title.textContent = `[${g.group}]`;
      out.appendChild(title);
      out.scrollTop = out.scrollHeight;

      await sleep(140);

      for (const s of g.items) {
        renderSkillRow(s);
        await sleep(95);
      }

      await sleep(240);
    }

    line(`<span class="t-muted">hover / click a skill row → details panel</span>`);
    line(
      `<span class="t-muted">shortcuts:</span>
       <button class="t-btn" data-cmd="help">help</button>
       <button class="t-btn" data-cmd="clear">clear</button>`
    );
    line("");
  }

  function cmdClear() {
    out.innerHTML = "";
  }

  async function run(cmdRaw) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    flashTerminal(); // Enter押した時の気持ちよさ

    line(`<span class="t-accent">&gt; ${escHtml(cmd)}</span>`);

    if (cmd === "help") return cmdHelp();
    if (cmd === "skills") return cmdSkills();
    if (cmd === "clear") return cmdClear();

    await typeLine(`command not found: ${cmd}`, 10);
    line(`<span class="t-muted">try: help</span>`);
    line("");
  }

  // ===== Details Panel Update =====
  function setDetails(text) {
    side.textContent = text || "—";
  }

  // hoverで詳細
  out.addEventListener("mouseover", (e) => {
    const row = e.target.closest?.(".skill-row");
    if (!row) return;
    setDetails(row.dataset.desc);
  });

  // clickで固定（hover苦手/スマホ対策）
  out.addEventListener("click", (e) => {
    const row = e.target.closest?.(".skill-row");
    if (row) {
      setDetails(row.dataset.desc);
      return;
    }

    // ショートカットボタン
    const btn = e.target.closest?.(".t-btn");
    if (btn) {
      const cmd = btn.dataset.cmd;
      if (cmd) run(cmd);
    }
  });

  // ===== Input: Enter / History =====
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const v = input.value;
      history.push(v);
      hi = history.length;
      input.value = "";
      run(v);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      hi = Math.max(0, hi - 1);
      input.value = history[hi] ?? "";
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      hi = Math.min(history.length, hi + 1);
      input.value = history[hi] ?? "";
    }
  });

  // ===== Initial Boot Demo =====
  (async () => {
    await typeLine("booting terminal://skills ...", 10);
    await sleep(180);
    await typeLine("new here? type 'skills' and press Enter.", 10);
    line("");
    line(`<span class="t-muted">shortcut:</span> <button class="t-btn" data-cmd="skills">skills</button>`);
    line("");
  })();
})();


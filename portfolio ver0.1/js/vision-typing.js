// js/vision-typing.js (touch-friendly)
(() => {
  const output = document.getElementById("vision-typing");
  const pills = Array.from(document.querySelectorAll(".vision-pill-grid .pill"));
  if (!output || pills.length === 0) return;

  let timerId = null;
  let runToken = 0;

  const defaultText = output.textContent.trim() || "4つのキーワードを選んでください。";

  const setActive = (el) => {
    pills.forEach(p => p.classList.remove("is-active"));
    if (el) el.classList.add("is-active");
  };

  const typeText = (text, speed = 20) => {
    runToken += 1;
    const token = runToken;

    if (timerId) clearInterval(timerId);
    output.textContent = "";

    let i = 0;
    timerId = setInterval(() => {
      if (token !== runToken) {
        clearInterval(timerId);
        return;
      }
      output.textContent += text[i] ?? "";
      i += 1;
      if (i >= text.length) clearInterval(timerId);
    }, speed);
  };

  const show = (pill) => {
    const text = pill?.dataset?.text?.trim();
    if (!text) return;
    setActive(pill);
    typeText(text, 18);
  };

  // PC hover（維持）
  pills.forEach((pill) => {
    pill.addEventListener("mouseenter", () => show(pill));
    pill.addEventListener("focus", () => show(pill));

    // スマホ tap/click
    pill.addEventListener("click", () => show(pill));
  });

  // “戻す”操作も用意（スマホで戻れない問題対策）
  const wrap = document.querySelector(".vision-pill-grid");
  if (wrap) {
    wrap.addEventListener("mouseleave", () => {
      setActive(null);
      runToken += 1;
      if (timerId) clearInterval(timerId);
      output.textContent = defaultText;
    });
  }

  // どこか別の場所をタップしたらデフォルトに戻す（任意）
  document.addEventListener("click", (e) => {
    const hit = e.target.closest(".vision-pill-grid .pill");
    if (hit) return;
    // Visionセクション外は無視したいなら #vision で囲って判定してもOK
  });
})();

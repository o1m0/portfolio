(() => {
  const root = document.querySelector("#projectsCarousel");
  if (!root) return;

  const track = root.querySelector(".p-track");
  const cards = Array.from(root.querySelectorAll(".p-card"));
  const btnPrev = root.querySelector(".p-prev");
  const btnNext = root.querySelector(".p-next");
  const dotsWrap = document.querySelector("#projectsDots");

  if (!track || cards.length === 0) return;

  let index = 0;
  let isLocked = false;
  const mod = (n, m) => ((n % m) + m) % m;

  const setClasses = () => {
    cards.forEach((c) => c.classList.remove("is-active", "is-prev", "is-next"));
    const prev = mod(index - 1, cards.length);
    const next = mod(index + 1, cards.length);
    cards[index].classList.add("is-active");
    cards[prev].classList.add("is-prev");
    cards[next].classList.add("is-next");

    if (dotsWrap) {
      const dots = Array.from(dotsWrap.querySelectorAll(".p-dot"));
      dots.forEach((d) => d.classList.remove("is-active"));
      if (dots[index]) dots[index].classList.add("is-active");
    }
  };

  const go = (nextIndex) => {
    if (isLocked) return;
    isLocked = true;
    index = mod(nextIndex, cards.length);
    setClasses();
    setTimeout(() => (isLocked = false), 380);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  if (dotsWrap) {
    dotsWrap.innerHTML = cards
      .map((_, i) => `<button class="p-dot" type="button" aria-label="Go to slide ${i + 1}"></button>`)
      .join("");

    dotsWrap.addEventListener("click", (e) => {
      const dot = e.target.closest(".p-dot");
      if (!dot) return;
      const dots = Array.from(dotsWrap.querySelectorAll(".p-dot"));
      const i = dots.indexOf(dot);
      if (i >= 0) go(i);
    });
  }

  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  setClasses();
})();
    
const header = document.querySelector("header.header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

// ===== Projects: autoplay carousel =====
(() => {
  const root = document.getElementById("projectsCarousel");
  if (!root) return;

  const track = root.querySelector(".p-track");
  const cards = Array.from(track?.querySelectorAll(".p-card") ?? []);
  if (cards.length === 0) return;

  const prevBtn = root.querySelector(".p-prev");
  const nextBtn = root.querySelector(".p-next");
  const dotsRoot = document.getElementById("projectsDots");

  // respects reduced motion
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const INTERVAL = 3800; // ms

  let idx = 0;
  let timer = null;
  let hovering = false;

  // build dots (if exists)
  const dots = [];
  if (dotsRoot) {
    dotsRoot.innerHTML = "";
    cards.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "p-dot";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => {
        idx = i;
        render();
        restart();
      });
      dotsRoot.appendChild(b);
      dots.push(b);
    });
  }

  function render() {
    const n = cards.length;
    const prev = (idx - 1 + n) % n;
    const next = (idx + 1) % n;

    cards.forEach((card, i) => {
      card.classList.toggle("is-active", i === idx);
      card.classList.toggle("is-prev", i === prev);
      card.classList.toggle("is-next", i === next);
      // 他は何も付けない（奥に隠れる）
    });

    if (dots.length) {
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }
  }

  function goNext() {
    idx = (idx + 1) % cards.length;
    render();
  }
  function goPrev() {
    idx = (idx - 1 + cards.length) % cards.length;
    render();
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function start() {
    if (reduceMotion) return; // 動き苦手な人向け
    if (timer) return;
    timer = setInterval(() => {
      if (!hovering) goNext();
    }, INTERVAL);
  }
  function restart() {
    stop();
    start();
  }

  // buttons
  prevBtn?.addEventListener("click", () => { goPrev(); restart(); });
  nextBtn?.addEventListener("click", () => { goNext(); restart(); });

  // pause on hover / focus
  root.addEventListener("mouseenter", () => { hovering = true; });
  root.addEventListener("mouseleave", () => { hovering = false; });

  root.addEventListener("focusin", () => { hovering = true; });
  root.addEventListener("focusout", () => { hovering = false; });

  // stop when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // init
  render();
  start();
})();


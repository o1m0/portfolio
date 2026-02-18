// js/nav-toggle.js
(() => {
  const btn = document.querySelector(".nav-toggle");
  const closeTargets = document.querySelectorAll("[data-nav-close]");
  const links = document.querySelectorAll("[data-nav-link]");

  if (!btn) return;

  const open = () => {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  };

  btn.addEventListener("click", () => {
    document.body.classList.contains("nav-open") ? close() : open();
  });

  closeTargets.forEach(el => el.addEventListener("click", close));
  links.forEach(a => a.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  const mq = window.matchMedia("(min-width: 861px)");
  mq.addEventListener("change", () => close());
})();

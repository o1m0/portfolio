document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  document.body.classList.add("selection-flash");
  setTimeout(() => {
    document.body.classList.remove("selection-flash");
  }, 150);
});

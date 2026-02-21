(() => {
  const target = document.getElementById("typeTarget");
  const output = document.getElementById("output");
  if (!target || !output) return;

  const queue = ["help", "projects", "sns"];

  let current = "";
  let idx = 0;
  let i = 0;
  let deleting = false;

  const responses = {
    help: [
      "commands: help / projects / sns",
      "tip: press Enter after typing"
    ],
    projects: [
      "opening #projects ...",
      "hint: scroll or click View Projects"
    ],
    sns: [
      "opening #sns ...",
      "hint: send a message anytime"
    ],
    contact: [
      "opening #sns ...",
      "hint: alias: use sns"
    ]
  };

  function print(lines) {
    const frag = document.createDocumentFragment();
    lines.forEach((text) => {
      const p = document.createElement("p");
      p.innerHTML = `<span class="k">out</span>: ${text}`;
      frag.appendChild(p);
    });
    output.appendChild(frag);
  }

  function typeLoop() {
    const word = queue[idx % queue.length];

    if (!deleting) {
      current = word.slice(0, i++);
      target.textContent = current;

      if (current === word) {
        deleting = true;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      current = word.slice(0, i--);
      target.textContent = current;

      if (i < 0) {
        deleting = false;
        i = 0;
        idx++;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 60);
  }

  typeLoop();

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const cmd = (target.textContent || "").trim().toLowerCase();
    if (!cmd) return;

    if (responses[cmd]) {
      print(responses[cmd]);
      if (cmd === "projects") location.hash = "#projects";
      if (cmd === "sns" || cmd === "contact") location.hash = "#sns";
    } else {
      print([`unknown command: ${cmd}`]);
    }
  });
})();

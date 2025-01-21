const urlModules = "https://adm-op.com/apps.json";

fetch(urlModules)
  .then((resp) => resp.json())
  .then((resp) => {
    let dataLimit;
    const targetEl = document.querySelector(".module-list");
    if (targetEl.hasAttribute("data-limit")) dataLimit = parseInt(targetEl.getAttribute("data-limit"));
    let appList = resp;
    if (dataLimit) appList = resp.slice(0, dataLimit);
    appList.map((app) => {
      const el = document.createElement("div");
      el.classList.add("card", "s6", "m3");
      el.style.padding = "1rem";
      el.innerHTML = `
        <p style="font-weight: bold; margin:0;">${app.name}</p>
        <p style="max-height: 100px; overflow: hidden; text-overflow: ellipsis;
        display: -webkit-box; -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;">${app.description || ""}</p>`;
      if (app.name[0] === "✅") el.style.backgroundColor = "#3733";
      targetEl.appendChild(el);
    });
  });

// Cubes Animation

setInterval(() => {
  const els = document.querySelectorAll(".cube div span");
  if (els.length === 0) return;
  const randIndex = Math.ceil(Math.random() * els.length);
  els[randIndex].classList.add("active");
  setTimeout(() => {
    els[randIndex].classList.remove("active");
  }, 200);
}, 250);

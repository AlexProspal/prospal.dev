function setActiveNav() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.remove("active");
    if ((a.getAttribute("href") || "").toLowerCase() === file) a.classList.add("active");
  });
}

function flash(message) {
  const box = document.getElementById("flash");
  const text = document.getElementById("flashText");
  if (!box || !text) return;
  text.textContent = message;
  box.hidden = false;
  clearTimeout(flash._t);
  flash._t = setTimeout(() => (box.hidden = true), 2400);
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
});
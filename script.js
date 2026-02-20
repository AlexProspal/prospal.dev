// Sets active nav link based on current filename
function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.remove("active");
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
}

// Small “flash” helper for non-personal notifications
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

  // Optional: show a subtle welcome message on first page load
  const key = "portfolio_template_seen";
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, "1");
    flash("Template loaded. Replace placeholders when you're ready.");
  }
});
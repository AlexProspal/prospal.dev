// Minimal: set year + simple active link highlighting on click (placeholder behavior)
document.getElementById("year").textContent = new Date().getFullYear();

const links = document.querySelectorAll(".nav-link");
links.forEach((a) => {
  a.addEventListener("click", () => {
    links.forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
  });
});
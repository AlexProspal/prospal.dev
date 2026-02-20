(() => {
  const email = "ajp319@case.edu";

  function wireCopy(id) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        const old = btn.textContent;
        btn.textContent = "Copied!";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = old;
          btn.disabled = false;
        }, 1100);
      } catch {
        window.prompt("Copy email:", email);
      }
    });
  }

  wireCopy("copyEmailBtn");
  wireCopy("copyEmailBtn2");

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
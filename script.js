(() => {
  const copyBtn = document.getElementById("copyEmailBtn");
  if (!copyBtn) return;

  const email = "ajp319@case.edu";
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      const old = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = old;
        copyBtn.disabled = false;
      }, 1200);
    } catch {
      // Fallback: select/copy prompt
      window.prompt("Copy email:", email);
    }
  });
})();
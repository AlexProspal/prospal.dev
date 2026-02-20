(() => {
  const email = "ajp319@case.edu";

  function wireCopy(btnId) {
    const btn = document.getElementById(btnId);
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

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden") === false;
      if (open) {
        mobileNav.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileNav.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      }
    });

    // Close on click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
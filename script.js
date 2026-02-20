(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const btn = document.getElementById("navBtn");
  const mobile = document.getElementById("mobileNav");
  if (btn && mobile) {
    btn.addEventListener("click", () => {
      const isOpen = !mobile.hasAttribute("hidden");
      if (isOpen) {
        mobile.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      } else {
        mobile.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobile.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Copy email (update this later if you want)
  const email = "ajp319@case.edu";
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      window.prompt("Copy email:", email);
      return false;
    }
  }

  function wireCopy(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", async () => {
      const ok = await copyToClipboard();
      if (!ok) return;
      const old = el.textContent;
      el.textContent = "Copied!";
      el.disabled = true;
      setTimeout(() => {
        el.textContent = old;
        el.disabled = false;
      }, 1000);
    });
  }

  wireCopy("copyEmail");
  wireCopy("copyEmail2");
})();
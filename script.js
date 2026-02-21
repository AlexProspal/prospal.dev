/* ES5-friendly script for broad browser support */
(function () {
  function getCurrentFileName() {
    var path = (window.location && window.location.pathname) ? window.location.pathname : "";
    var parts = path.split("/");
    var last = parts.length ? parts[parts.length - 1] : "";
    last = (last || "index.html").toLowerCase();

    // If served from a URL ending with "/", treat as index.html
    if (last === "") last = "index.html";
    return last;
  }

  function setActiveNav() {
    var file = getCurrentFileName();
    var links = document.querySelectorAll(".nav a");
    var i;

    for (i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.classList) a.classList.remove("active");

      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href === file) {
        if (a.classList) a.classList.add("active");
      }
    }
  }

  function flash(message) {
    var box = document.getElementById("flash");
    var text = document.getElementById("flashText");
    if (!box || !text) return;

    text.textContent = String(message);
    box.hidden = false;

    if (flash._t) {
      window.clearTimeout(flash._t);
    }
    flash._t = window.setTimeout(function () {
      box.hidden = true;
    }, 2400);
  }

  function wireFlashButton() {
    // Backwards-compatible: if the old id exists, keep it working.
    var btn = document.getElementById("flashBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        flash("Thanks for visiting.");
      });
    }
  }

  function wireCopyEmailButton() {
    var btn = document.getElementById("copyEmailBtn");
    if (!btn) return;

    var email = "ajp319@case.edu";

    function fallbackCopy() {
      var ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flash("Copied: " + email);
      } catch (e) {
        flash("Email: " + email);
      }
      document.body.removeChild(ta);
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          flash("Copied: " + email);
        }, function () {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    wireFlashButton();
    wireCopyEmailButton();
  });

  // Optional: expose flash globally if you ever want to call it elsewhere
  window.flash = flash;
})();
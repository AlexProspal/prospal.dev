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

  // Minimal feedback without any flash/banner: temporarily change the button text.
  function setTempButtonText(btn, text, ms) {
    if (!btn) return;
    var original = btn.getAttribute("data-original-text");
    if (!original) {
      original = btn.textContent;
      btn.setAttribute("data-original-text", original);
    }
    btn.textContent = text;

    window.setTimeout(function () {
      var back = btn.getAttribute("data-original-text") || original;
      btn.textContent = back;
    }, ms || 1400);
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
        setTempButtonText(btn, "Copied!", 1400);
      } catch (e) {
        // If copy fails, do nothing visible (no flash text).
        setTempButtonText(btn, "Copy email", 1400);
      }
      document.body.removeChild(ta);
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          setTempButtonText(btn, "Copied!", 1400);
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
    wireCopyEmailButton();
  });
})();
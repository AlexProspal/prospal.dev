(function () {
  function normalizeRoute(p) {
    if (!p) return "/";

    p = String(p);
    var q = p.indexOf("?");
    if (q !== -1) p = p.slice(0, q);
    var h = p.indexOf("#");
    if (h !== -1) p = p.slice(0, h);

    var proto = p.indexOf("://");
    if (proto !== -1) {
      var slash3 = p.indexOf("/", proto + 3);
      p = slash3 === -1 ? "/" : p.slice(slash3);
    }

    if (p.charAt(0) !== "/") p = "/" + p;

    var lower = p.toLowerCase();
    if (lower === "/index.html" || lower === "/index.htm") return "/";

    if (lower.length >= 11 && lower.slice(-11) === "/index.html") {
      p = p.slice(0, -10);
    } else if (lower.length >= 10 && lower.slice(-10) === "/index.htm") {
      p = p.slice(0, -9);
    }

    if (p !== "/" && p.charAt(p.length - 1) !== "/") p = p + "/";

    while (p.length > 1 && p.slice(-2) === "//") p = p.slice(0, -1);

    return p;
  }

  function setActiveNav() {
    var current = normalizeRoute(
      (window.location && window.location.pathname) ? window.location.pathname : "/"
    );
    var links = document.querySelectorAll(".nav a");
    var i;

    for (i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.classList) a.classList.remove("active");

      var hrefRaw = a.getAttribute("href") || "";
      var href = normalizeRoute(hrefRaw);

      if (href === current) {
        if (a.classList) a.classList.add("active");
      }
    }
  }

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

    var email = "alexander@prospal.dev";

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
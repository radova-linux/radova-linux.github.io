// Loads css/fonts.css and home.bundle.js on first interaction.
(function () {
  "use strict";
  var base = document.currentScript.src;
  var loaded = false;
  var ready = false;
  var pending = null;

  function add(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el[k] = attrs[k];
    (tag === "link" ? document.head : document.body).appendChild(el);
  }

  function onClick(e) {
    var t = e.target.closest && e.target.closest("#theme-toggle, #lang-toggle, .nav-toggle, #about-menu-btn, .d-content-back");
    if (t && !ready) pending = t;
  }

  function load() {
    if (loaded) return;
    loaded = true;
    add("link", { rel: "stylesheet", href: new URL("../css/fonts.css", base).href });
    add("script", {
      src: new URL("home.bundle.js?v=5", base).href,
      onload: function () {
        ready = true;
        document.removeEventListener("click", onClick, true);
        if (pending) { var p = pending; pending = null; p.click(); }
      }
    });
  }

  document.addEventListener("click", onClick, true);
  ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (type) {
    addEventListener(type, load, { once: true, passive: true });
  });

  try {
    if (localStorage.getItem("radova-theme") === "dark") load();
  } catch (_) {}
})();

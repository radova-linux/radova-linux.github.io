// Loads css/fonts.css, home.bundle.js, and htmx.min.js on first interaction.
(function () {
  "use strict";
  var base = document.currentScript.src;
  var loaded = false;
  var pending = null;

  function add(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el[k] = attrs[k];
    (tag === "link" ? document.head : document.body).appendChild(el);
  }

  function onClick(e) {
    var t = e.target.closest && e.target.closest("#theme-toggle, #lang-toggle, .nav-toggle, #about-menu-btn, .d-content-back");
    if (t) pending = t;
  }

  function load() {
    if (loaded) return;
    loaded = true;
    add("link", { rel: "stylesheet", href: new URL("../css/fonts.css", base).href });
    function injectHtmx() { add("script", { src: new URL("htmx.min.js", base).href }); }
    if (document.readyState === "complete") injectHtmx();
    else addEventListener("load", injectHtmx, { once: true });
    add("script", {
      src: new URL("home.bundle.js?v=5", base).href,
      onload: function () {
        document.removeEventListener("click", onClick, true);
        if (pending) pending.click();
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

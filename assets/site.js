/* ponytail: IIFE wraps everything — no globals leaked */
(function () {
  "use strict";

  /* ── Copy-to-clipboard buttons ──────────────────────────
     Created only when navigator.clipboard is available,
     so Lynx and no-JS environments never see them.
  ─────────────────────────────────────────────────────── */
  if (!navigator.clipboard) return;

  document.querySelectorAll(".checksum-block").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;

    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Salin";
    btn.setAttribute("aria-label", "Salin teks ke papan klip");
    btn.type = "button";

    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.textContent.trim()).then(function () {
        btn.textContent = "Tersalin";
        setTimeout(function () { btn.textContent = "Salin"; }, 2000);
      }).catch(function () {
        btn.textContent = "Gagal";
        setTimeout(function () { btn.textContent = "Salin"; }, 2000);
      });
    });

    block.appendChild(btn);
  });

  /* ── Focus management after hx-boost navigation ────────
     Moves focus to <main> after HTMX settles a page swap.
  ─────────────────────────────────────────────────────── */
  document.addEventListener("htmx:afterSettle", function () {
    var main = document.getElementById("main");
    if (main) main.focus();
  });
}());

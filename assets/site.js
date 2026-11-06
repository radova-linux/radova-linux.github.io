(function () {
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");

    var groups = [
      document.querySelectorAll(".pillar-item"),
      document.querySelectorAll(".fitur-card"),
      document.querySelectorAll(".arch-row"),
      document.querySelectorAll(".spec-card"),
      document.querySelectorAll(".unduh-card")
    ];

    for (var g = 0; g < groups.length; g++) {
      var list = groups[g];
      for (var i = 0; i < list.length; i++) {
        list[i].classList.add("reveal");
        list[i].style.setProperty("--i", String(i % 6));
      }
    }

    var singles = document.querySelectorAll("section h2, section .lead, .manifesto-lead");
    for (var s = 0; s < singles.length; s++) {
      if (!singles[s].closest(".hero")) {
        singles[s].classList.add("reveal");
        singles[s].style.setProperty("--i", "0");
      }
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting) {
          entries[e].target.classList.add("is-in");
          obs.unobserve(entries[e].target);
        }
      }
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });

    var reveals = document.querySelectorAll(".reveal");
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var r = 0; r < reveals.length; r++) {
      var rect = reveals[r].getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        reveals[r].classList.add("is-in");
      } else {
        observer.observe(reveals[r]);
      }
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    var boxes = document.querySelectorAll(".code-box");
    for (var b = 0; b < boxes.length; b++) {
      (function (box) {
        var pre = box.querySelector("pre");
        if (!pre) return;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = "Salin";
        btn.setAttribute("aria-label", "Salin kode ke papan klip");

        btn.addEventListener("click", function () {
          var text = (pre.textContent || "").trim();
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = "Tersalin";
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.textContent = "Salin";
              btn.classList.remove("is-copied");
            }, 1800);
          });
        });

        box.appendChild(btn);
      })(boxes[b]);
    }
  }
})();

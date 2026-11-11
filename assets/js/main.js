// 業績の BibTeX: 表示の切り替えとコピー
document.querySelectorAll(".bib-toggle").forEach(function (btn) {
  var box = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    box.hidden = open;
  });
});

document.querySelectorAll(".copy-btn").forEach(function (btn) {
  var label = btn.textContent;
  btn.addEventListener("click", function () {
    var text = btn.parentElement.querySelector("code").textContent;
    var done = function () {
      btn.textContent = btn.dataset.copied || "Copied";
      setTimeout(function () { btn.textContent = label; }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      // http や file:// で開いたとき用
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } finally { ta.remove(); }
    }
  });
});

// 上部メニュー: いま表示している節のリンクを強調する
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav ul a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var sections = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("active"); });
      byId[e.target.id].classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { observer.observe(s); });
})();

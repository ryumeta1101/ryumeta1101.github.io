// 業績の BibTeX: 表示の切り替えとコピー
document.querySelectorAll(".bib-toggle").forEach(function (btn) {
  var box = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    box.hidden = open;
  });
});

// 古い方法でのコピー。file:// で開いたときや、アプリ内ブラウザ（LINE・X など）で
// Clipboard API が拒否されたときに使う。成功したら true を返す
function legacyCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  // 画面外に固定して置く。iPhone は 16px 未満の入力欄で画面を拡大するので 16px にする
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, text.length); // iPhone では select() だけでは選択されない
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  ta.remove();
  return ok;
}

document.querySelectorAll(".copy-btn").forEach(function (btn) {
  var label = btn.textContent;
  var timer;
  var show = function (text) {
    btn.textContent = text;
    clearTimeout(timer);
    timer = setTimeout(function () { btn.textContent = label; }, 1500);
  };
  btn.addEventListener("click", function () {
    var text = btn.parentElement.querySelector("code").textContent;
    var done = function () { show(btn.dataset.copied || "Copied"); };
    var fallback = function () {
      if (legacyCopy(text)) { done(); return; }
      // どうしてもコピーできないときは、BibTeX を選択状態にして手動でコピーしてもらう
      var range = document.createRange();
      range.selectNodeContents(btn.parentElement.querySelector("code"));
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      show(btn.dataset.failed || "Select & copy");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
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
      // プロフィール欄（先頭）まで戻ったら、どのリンクも強調しない
      if (byId[e.target.id]) byId[e.target.id].classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { observer.observe(s); });
  var hero = document.querySelector(".hero");
  if (hero) observer.observe(hero);
})();

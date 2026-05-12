/**
 * 記事ページ: article.article-body 内の h2 から目次を生成
 */
(function () {
  var article = document.querySelector("article.article-body");
  var nav = document.getElementById("article-toc-list");
  if (!article || !nav) return;

  var h2s = article.querySelectorAll("h2");
  if (!h2s.length) {
    nav.closest(".article-toc").style.display = "none";
    return;
  }

  var usedIds = {};
  var ul = document.createElement("ul");
  ul.className = "article-toc__list";

  for (var i = 0; i < h2s.length; i++) {
    var h2 = h2s[i];
    var id = h2.id;
    if (!id) {
      id = "toc-heading-" + (i + 1);
      var base = id;
      var n = 1;
      while (usedIds[id] || document.getElementById(id)) {
        id = base + "-" + n++;
      }
      h2.id = id;
    }
    usedIds[h2.id] = true;

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h2.id;
    a.textContent = h2.textContent.replace(/\s+/g, " ").trim();
    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(ul);
})();

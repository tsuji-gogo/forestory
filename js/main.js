/**
 * トップページ：記事一覧を data/articles.json から表示
 * GitHub Pages では同一オリジンなので fetch が利用可能
 */
(function () {
  var listEl = document.getElementById("article-list");
  if (!listEl) return;

  fetch("data/articles.json")
    .then(function (res) {
      if (!res.ok) throw new Error("load failed");
      return res.json();
    })
    .then(function (articles) {
      if (!Array.isArray(articles) || articles.length === 0) {
        listEl.innerHTML =
          '<p class="empty-state">まだ記事がありません。あとでもう一度お越しくださいね。</p>';
        return;
      }

      var html = articles
        .map(function (a) {
          var tags =
            (a.tags || [])
              .map(function (t) {
                return '<span class="tag">' + escapeHtml(t) + "</span>";
              })
              .join("") || "";

          return (
            '<li class="article-card">' +
            '<a href="articles/' +
            escapeHtml(a.slug) +
            '.html">' +
            '<p class="meta">' +
            escapeHtml(a.date || "") +
            "</p>" +
            "<h2>" +
            escapeHtml(a.title) +
            "</h2>" +
            "<p class=\"desc\">" +
            escapeHtml(a.description || "") +
            "</p>" +
            (tags ? '<div class="tags">' + tags + "</div>" : "") +
            "</a></li>"
          );
        })
        .join("");

      listEl.innerHTML = html;
    })
    .catch(function () {
      listEl.innerHTML =
        '<p class="empty-state">記事一覧を読み込めませんでした。ローカルで file:// から開いている場合は、簡易サーバーで開くか GitHub Pages でご覧ください。</p>';
    });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();

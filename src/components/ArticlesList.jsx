import React from "react";
import { useSelector } from "react-redux";
import ArticlePreview from "./ArticlePreview";

// scope is pased up to ArticlePreview to let it know if should be or not
// removed from the list shown after unfavorited
// In ProfileFavorites when unfavorited an article it gets removed from the list
function ArticlesList({ scope }) {
  const articlesList = useSelector((state) => state.articles);

  if (!articlesList.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articlesList.articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articlesList.articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} scope={scope} />
      ))}
    </div>
  );
}
export default ArticlesList;

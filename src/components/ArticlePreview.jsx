import React from "react";

import { Link } from "react-router-dom";

function ArticlePreview({ article }) {
  const handleClick = (event) => {
    // Favorite Like function
    console.log("Clicked Favourite");
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          onClick={handleClick}
        >
          <i className="ion-heart" /> {article.favorited}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;

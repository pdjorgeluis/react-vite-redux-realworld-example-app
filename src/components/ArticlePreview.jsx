import React from "react";
import { Link } from "react-router-dom";

function ArticlePreview() {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link href="/profile/eric-simons">
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </Link>
        <div className="info">
          <Link href="/profile/eric-simons" className="author">
            Eric Simons
          </Link>
          <span className="date">January 20th</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> 29
        </button>
      </div>
      <Link
        href="/article/how-to-build-webapps-that-scale"
        className="preview-link"
      >
        <h1>How to build webapps that scale</h1>
        <p>This is the description for the post.</p>
        <span>Read more...</span>
        <ul className="tag-list">
          <li className="tag-default tag-pill tag-outline">realworld</li>
          <li className="tag-default tag-pill tag-outline">implementations</li>
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;

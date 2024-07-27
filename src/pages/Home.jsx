import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ArticlePreview from "../components/ArticlePreview";

function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>
            <ArticlePreview />

            <ul className="pagination">
              <li className="page-item active">
                <Link className="page-link" href="">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  2
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <Link href="" className="tag-pill tag-default">
                  programming
                </Link>
                <Link href="" className="tag-pill tag-default">
                  javascript
                </Link>
                <Link href="" className="tag-pill tag-default">
                  emberjs
                </Link>
                <Link href="" className="tag-pill tag-default">
                  angularjs
                </Link>
                <Link href="" className="tag-pill tag-default">
                  react
                </Link>
                <Link href="" className="tag-pill tag-default">
                  mean
                </Link>
                <Link href="" className="tag-pill tag-default">
                  node
                </Link>
                <Link href="" className="tag-pill tag-default">
                  rails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

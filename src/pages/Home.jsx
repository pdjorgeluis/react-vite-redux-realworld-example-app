import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import tagsService from "../services/tags";
import Banner from "../components/Banner";
import ArticlesList from "../components/ArticlesList";
import { getArticlesByTag } from "../Reducers/articleReducer";

function Home({ user }) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    tagsService.getAll().then((fetchedTags) => setTags(fetchedTags.tags));
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticlesByTag(tag));
  }, [tag]);

  const handleTagClick = (tag) => {
    setTag(tag);
  };

  const handleGlobalFeedClick = () => {
    setTag("");
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {user && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Your Feed
                    </Link>
                  </li>
                )}

                {tag === "" ? (
                  <li className="nav-item">
                    <button className="nav-link active" type="button">
                      Global Feed
                    </button>
                  </li>
                ) : (
                  <div>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        type="button"
                        onClick={handleGlobalFeedClick}
                      >
                        Global Feed
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link active" type="button">
                        #{tag}
                      </button>
                    </li>
                  </div>
                )}
              </ul>
            </div>
            <ArticlesList />

            <ul className="pagination">
              <li className="page-item active">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags &&
                  tags.map((t) => (
                    <Link
                      key={t}
                      className="tag-pill tag-default"
                      to=""
                      onClick={() => handleTagClick(t)}
                    >
                      {t}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

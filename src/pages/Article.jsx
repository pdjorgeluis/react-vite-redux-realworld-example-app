import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import articleService from "../services/articles";
import profileServices from "../services/profiles";

import {
  favoriteAnArticle,
  unfavoriteAnArticle,
} from "../reducers/articleReducer";

function Article({ articleSlug, user }) {
  const articleList = useSelector((state) => state.articles.articles);
  // const u = useSelector((state) => state.user);

  const [article, setArticle] = useState(null);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (articleSlug) {
      articleService.getBySlug(articleSlug, user).then((art) => {
        setArticle(art.article);
        profileServices
          .getUserProfile(art.article.author.username)
          .then((prof) => setProfile(prof.profile));
      });
    }
  }, [user, articleSlug, articleList]);

  const handleFollowCLick = async () => {
    if (profile.following === false) {
      const updatedProfile = await profileServices.followUser(profile.username);
      setProfile(updatedProfile.profile);
    } else {
      const updatedProfile = await profileServices.unfollowUser(
        profile.username
      );
      setProfile(updatedProfile.profile);
    }
  };

  const handleFavoriteCLick = () => {
    if (article.favorited === false) {
      dispatch(favoriteAnArticle(article.slug));
    } else {
      dispatch(unfavoriteAnArticle(article.slug));
    }
    forceUpdate();
  };

  const handleEditCLick = () => {
    console.log("clicked edit");
  };

  const handleDeleteCLick = () => {
    console.log("clicked delete");
  };

  if (!article || !profile) {
    return <div>No article</div>;
  }
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <Link to={`/@${profile.username}`}>
              <img src={article.author.image} alt={article.author.username} />
            </Link>
            <div className="info">
              <Link to={`/@${profile.username}`} className="author">
                {article.author.username}
              </Link>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>
            {user && (
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                  onClick={handleFollowCLick}
                >
                  <i
                    className={
                      profile.following ? "ion-plus-round" : "ion-minus-round"
                    }
                  />
                  &nbsp; Follow {article.author.username}{" "}
                  <span className="counter">(10?)</span>
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                  onClick={handleFavoriteCLick}
                >
                  <i className="ion-heart" />
                  &nbsp; Favorite Post{" "}
                  <span className="counter">{article.favoritesCount}</span>
                </button>
                {
                  /* user.username === article.author.username */ true && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                      onClick={handleEditCLick}
                    >
                      <i className="ion-edit" /> Edit Article
                    </button>
                  )
                }
                <button
                  className="btn btn-sm btn-outline-danger"
                  type="button"
                  onClick={handleDeleteCLick}
                >
                  <i className="ion-trash-a" /> Delete Article
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        {!user ? (
          <div className="article-actions">
            <Link>Sign in</Link> or <Link>sign up</Link> to add comments on this
            article.
          </div>
        ) : (
          <div>
            <div className="article-actions">
              <div className="article-meta">
                <Link to="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </Link>
                <div className="info">
                  <Link to="" className="author">
                    Eric Simons
                  </Link>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow Eric Simons
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart" />
                  &nbsp; Favorite Article <span className="counter">(29)</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit" /> Edit Article
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a" /> Delete Article
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                    />
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link to="/profile/author" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </Link>
                    &nbsp;
                    <Link
                      to="/profile/jacob-schmidt"
                      className="comment-author"
                    >
                      Jacob Schmidt
                    </Link>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link to="/profile/author" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </Link>
                    &nbsp;
                    <Link
                      to="/profile/jacob-schmidt"
                      className="comment-author"
                    >
                      Jacob Schmidt
                    </Link>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-trash-a" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Article;

import React, { useEffect, useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import articleService from "../services/articles";
import profileServices from "../services/profiles";

import {
  favoriteAnArticle,
  unfavoriteAnArticle,
  deleteArticle,
} from "../reducers/articleReducer";
import {
  initComments,
  addComment,
  deleteComment,
} from "../reducers/commentReducer";
import Comment from "../components/Comment";

function Article({ articleSlug, user }) {
  const articleList = useSelector((state) => state.articles.articles);
  const commentList = useSelector((state) => state.comments.comments);
  // const u = useSelector((state) => state.user);

  const [article, setArticle] = useState(null);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (articleSlug) {
      articleService.getBySlug(articleSlug, user).then((art) => {
        setArticle(art.article);
        profileServices
          .getUserProfile(art.article.author.username, user)
          .then((prof) => setProfile(prof.profile));
        dispatch(initComments(articleSlug, user));
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
    if (window.confirm(`Remove article ${article.title}?`)) {
      try {
        console.log("clicked delete");
        dispatch(deleteArticle(articleSlug));
        navigate(`/${user.username}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    dispatch(
      addComment(articleSlug, { comment: { body: event.target.comment.value } })
    );
    event.target.reset();
  };

  const handleDeleteComment = (comment) => {
    dispatch(deleteComment(articleSlug, comment));
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
            <Link to={`/${profile.username}`}>
              <img src={article.author.image} alt={article.author.username} />
            </Link>
            <div className="info">
              <Link to={`/${profile.username}`} className="author">
                {article.author.username}
              </Link>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>
            {user && (
              <div>
                {user.username !== article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={handleFollowCLick}
                  >
                    <i
                      className={
                        profile.following ? "ion-minus-round" : "ion-plus-round"
                      }
                    />
                    &nbsp; Follow {article.author.username}{" "}
                    <span className="counter">(10?)</span>
                  </button>
                )}
                &nbsp;
                {user.username !== article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                    onClick={handleFavoriteCLick}
                  >
                    <i className="ion-heart" />
                    &nbsp; Favorite Post{" "}
                    <span className="counter">{article.favoritesCount}</span>
                  </button>
                )}
                {user.username === article.author.username && (
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/editor/${articleSlug}`}
                  >
                    <i className="ion-edit" /> Edit Article
                  </Link>
                )}
                {user.username === article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    onClick={handleDeleteCLick}
                  >
                    <i className="ion-trash-a" /> Delete Article
                  </button>
                )}
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
                  <img
                    src={article.author.image}
                    alt={article.author.username}
                  />
                </Link>
                <div className="info">
                  <Link to={`/@${profile.username}`} className="author">
                    {article.author.username}
                  </Link>
                  <span className="date">
                    {new Date(article.createdAt).toDateString()}
                  </span>
                </div>
                {user.username !== article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={handleFollowCLick}
                  >
                    <i
                      className={
                        profile.following ? "ion-minus-round" : "ion-plus-round"
                      }
                    />
                    &nbsp; {article.author.username}{" "}
                  </button>
                )}
                &nbsp;
                {user.username !== article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                    onClick={handleFavoriteCLick}
                  >
                    <i className="ion-heart" />
                    &nbsp; Favorite Article{" "}
                    <span className="counter">{article.favoritesCount}</span>
                  </button>
                )}
                {user.username === article.author.username && (
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/editor/${articleSlug}`}
                  >
                    <i className="ion-edit" /> Edit Article
                  </Link>
                )}
                {user.username === article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    onClick={handleDeleteCLick}
                  >
                    <i className="ion-trash-a" /> Delete Article
                  </button>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form
                  className="card comment-form"
                  onSubmit={handlePostComment}
                >
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      name="comment"
                    />
                  </div>
                  <div className="card-footer">
                    <img
                      src={user.image}
                      className="comment-author-img"
                      alt={user.username}
                    />
                    <button className="btn btn-sm btn-primary" type="submit">
                      Post Comment
                    </button>
                  </div>
                </form>

                {commentList.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    user={user}
                    onClickButton={() => handleDeleteComment(comment)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Article;

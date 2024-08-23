import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useProfileQuery from "../hooks/useProfileQuery";
import useCommentMutation from "../hooks/useCommentMutation";
import useCurrentUser from "../hooks/useCurrentUser";

import Comment from "../components/Comment";
import useSingleArticleQuery from "../hooks/useSingleArticleQuery";
import useArticleUpdateMutation from "../hooks/useArticleMutation";
import useCommentsQuery from "../hooks/useCommentQuery";
import useProfileMutation from "../hooks/useProfileMutation";

function Article({ articleSlug }) {
  const { currentUser } = useCurrentUser();

  const {
    isLoading: isArticleLoading,
    isError: isArticleError,
    article,
    error: articleError,
  } = useSingleArticleQuery(articleSlug);

  const {
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfileQuery(article.article?.author.username, currentUser.user);

  // console.log("profile in Article", profile);

  const {
    data: commentList,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useCommentsQuery(articleSlug, currentUser.user);

  const { articleMutation: deleteMutation } = useArticleUpdateMutation(
    "DELETE",
    ["articles", articleSlug]
  );

  const { createCommentMutation, deleteCommentMutation } = useCommentMutation([
    "comments",
    articleSlug,
    currentUser.user,
  ]);

  const { fallowUserMutation, unfallowUserMutation } = useProfileMutation(
    profile.profile?.username,
    ["profile", article.article?.author.username, currentUser.user]
  );

  const { articleMutation: favoriteMutation } = useArticleUpdateMutation(
    "FAVORITE",
    "article"
  );
  const { articleMutation: unfavoriteMutation } = useArticleUpdateMutation(
    "UNFAVORITE",
    "article"
  );

  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  const handleFollowCLick = async () => {
    if (profile.profile.following === false) {
      fallowUserMutation.mutate();
    } else {
      unfallowUserMutation.mutate();
    }
  };

  console.log("favorited", article.article?.favorited);
  const handleFavoriteCLick = () => {
    if (article.article.favorited === false) {
      favoriteMutation.mutate(article.article.slug);
    } else {
      unfavoriteMutation.mutate(article.article.slug);
    }
    // forceUpdate();
  };

  const handleDeleteCLick = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove article ${article.article.title}?`)) {
      deleteMutation.mutate(articleSlug, {
        onSuccess: () => {
          navigate(`/${currentUser.user.username}`);
        },
      });
      /* try {
        dispatch(deleteArticle(articleSlug));
        navigate(`/${currentUser.user.username}`);
      } catch (error) {
        console.log(error);
      } */
    }
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    /* dispatch(
      addComment(articleSlug, { comment: { body: event.target.comment.value } })
    ); */

    createCommentMutation.mutate([
      articleSlug,
      {
        comment: { body: event.target.comment.value },
      },
    ]);
    event.target.reset();
  };

  const handleDeleteComment = (comment) => {
    // dispatch(deleteComment(articleSlug, comment));
    deleteCommentMutation.mutate([articleSlug, comment.id]);
  };

  if (isArticleLoading || isProfileLoading || isCommentsLoading) {
    return <span>Loading...</span>;
  }

  if (!article.article) {
    return <div>No article</div>;
  }

  if (isArticleError || isProfileError || isCommentsError) {
    return (
      <>
        <span>Error: {articleError.message}</span>
        <span>Error: {profileError.message}</span>
        <span>Error: {commentsError.message}</span>;
      </>
    );
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.article.title}</h1>

          <div className="article-meta">
            <Link to={`/${profile.profile.username}`}>
              <img
                src={article.article.author.image}
                alt={article.article.author.username}
              />
            </Link>
            <div className="info">
              <Link to={`/${profile.profile.username}`} className="author">
                {article.article.author.username}
              </Link>
              <span className="date">
                {new Date(article.article.createdAt).toDateString()}
              </span>
            </div>
            {currentUser.user && (
              <div>
                {currentUser.user.username !==
                  article.article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={handleFollowCLick}
                  >
                    <i
                      className={
                        profile.profile.following
                          ? "ion-minus-round"
                          : "ion-plus-round"
                      }
                    />
                    &nbsp; Follow {article.article.author.username}{" "}
                    <span className="counter">(10?)</span>
                  </button>
                )}
                &nbsp;
                {currentUser.user.username !==
                  article.article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                    onClick={handleFavoriteCLick}
                  >
                    <i className="ion-heart" />
                    &nbsp; Favorite Post{" "}
                    <span className="counter">
                      {article.article.favoritesCount}
                    </span>
                  </button>
                )}
                {currentUser.user.username ===
                  article.article.author.username && (
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/editor/${articleSlug}`}
                  >
                    <i className="ion-edit" /> Edit Article
                  </Link>
                )}
                {currentUser.user.username ===
                  article.article.author.username && (
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
            <p>{article.article.body}</p>
            <ul className="tag-list">
              {article.article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        {!currentUser.user ? (
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
                    src={article.article.author.image}
                    alt={article.article.author.username}
                  />
                </Link>
                <div className="info">
                  <Link to={`/@${profile.profile.username}`} className="author">
                    {article.article.author.username}
                  </Link>
                  <span className="date">
                    {new Date(article.article.createdAt).toDateString()}
                  </span>
                </div>
                {currentUser.user.username !==
                  article.article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={handleFollowCLick}
                  >
                    <i
                      className={
                        profile.profile.following
                          ? "ion-minus-round"
                          : "ion-plus-round"
                      }
                    />
                    &nbsp; {article.article.author.username}{" "}
                  </button>
                )}
                &nbsp;
                {currentUser.user.username !==
                  article.article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                    onClick={handleFavoriteCLick}
                  >
                    <i className="ion-heart" />
                    &nbsp; Favorite Article{" "}
                    <span className="counter">
                      {article.article.favoritesCount}
                    </span>
                  </button>
                )}
                {currentUser.user.username ===
                  article.article.author.username && (
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/editor/${articleSlug}`}
                  >
                    <i className="ion-edit" /> Edit Article
                  </Link>
                )}
                {currentUser.user.username ===
                  article.article.author.username && (
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
                      src={currentUser.user.image}
                      className="comment-author-img"
                      alt={currentUser.user.username}
                    />
                    <button className="btn btn-sm btn-primary" type="submit">
                      Post Comment
                    </button>
                  </div>
                </form>

                {commentList.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    user={currentUser.user}
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

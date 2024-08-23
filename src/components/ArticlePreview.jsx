import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import useArticleUpdateMutation from "../hooks/useArticleMutation";

function ArticlePreview({ article, scope, user }) {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.loggedUser.user);

  /* const handleFavouriteClick = () => {
    if (user && user.username !== article.author.username) {
      try {
        if (article.favorited === false) {
          dispatch(favoriteAnArticle(article.slug));
        } else if (scope === "FAV") {
          dispatch(unfavoriteAnArticleAndRemove(article.slug));
        } else {
          dispatch(unfavoriteAnArticleAndUpdate(article.slug));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }; */
  const { articleMutation: favoriteMutation, updatedArticle: a1 } =
    useArticleUpdateMutation("FAVORITE", "articles");
  const { articleMutation: unfavoriteMutation, updatedArticle: a2 } =
    useArticleUpdateMutation("UNFAVORITE", "articles");
  // console.log("art mutation", unfavoriteMutation);

  const handleFavouriteClick = () => {
    if (user && user.username !== article.author.username) {
      try {
        if (article.favorited === false) {
          favoriteMutation.mutate(article.slug);
          // dispatch(favoriteAnArticle(article.slug));
        } else if (scope === "FAV") {
          // In this one pass queryKey for updating list of favorited
          // dispatch(unfavoriteAnArticleAndRemove(article.slug));
          unfavoriteMutation.mutate(article.slug);
          queryClient.invalidateQueries("articles");
        } else {
          unfavoriteMutation.mutate(article.slug);
          // dispatch(unfavoriteAnArticleAndUpdate(article.slug));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!article) {
    return null;
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          type="button"
          onClick={handleFavouriteClick}
        >
          <i className="ion-heart" /> {article.favorited}
          {article.favoritesCount}
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


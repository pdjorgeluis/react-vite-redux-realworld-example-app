import articleService from "../services/articles";

export const ARTICLE_ACTION_TYPES = {
  FAVORITE_ARTICLE: "FAVORITE_ARTICLE",
  UNFAVORITE_ARTICLE: "UNFAVORITE_ARTICLE",
  UPDATE_ARTICLE: "UPDATE_ARTICLE",
  CREATE_ARTICLE: "CREATE_ARTICLE",
  DELETE_ARTICLE: "DELETE_ARTICLE",
};

const UPDATE_STATE_BY_ACTION = {
  [ARTICLE_ACTION_TYPES.FAVORITE_ARTICLE]: (state, action) =>
    articleService.favoriteArticle,
  [ARTICLE_ACTION_TYPES.UNFAVORITE_ARTICLE]: (state, action) =>
    articleService.unfavoriteArticle,
  [ARTICLE_ACTION_TYPES.UPDATE_ARTICLE]: (state, action) =>
    articleService.update,
  [ARTICLE_ACTION_TYPES.CREATE_ARTICLE]: (state, action) =>
    articleService.create,
  [ARTICLE_ACTION_TYPES.DELETE_ARTICLE]: (state, action) =>
    articleService.deleteArticle,
};

export const articleReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};

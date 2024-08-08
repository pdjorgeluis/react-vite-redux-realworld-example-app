import { createSlice } from "@reduxjs/toolkit";
import articleService from "../services/articles";

const articleSlice = createSlice({
  name: "article",
  initialState: { articles: [], articlesCount: 0 },
  reducers: {
    setArticles(state, action) {
      return action.payload;
    },
    appendArticle(state, action) {
      const articleToAppend = action.payload;
      state.articles.push(articleToAppend.article);
    },
    updateArticle(state, action) {
      const newArticle = action.payload;
      const newList = state.articles.map((article) =>
        article.slug !== newArticle.article.slug ? article : newArticle.article
      );
      return { ...state, articles: newList };
    },
    removeArticle(state, action) {
      const articleToRemove = action.payload;
      const newList = state.articles.filter(
        (article) => article.slug !== articleToRemove.article.slug
      );

      return { articles: newList, articlesCount: state.articlesCount - 1 };
    },
  },
});

export const { setArticles, appendArticle, updateArticle, removeArticle } =
  articleSlice.actions;

export const initializeArticles = (params, user) => async (dispatch) => {
  const articles = await articleService.getAll(params, user);
  dispatch(setArticles(articles));
};

export const setArticlesByFeed = (offset) => async (dispatch) => {
  const articles = await articleService.getAllFeed(offset);
  dispatch(setArticles(articles));
};

export const setArticlesByTag = (offset, tag) => async (dispatch) => {
  if (tag !== "") {
    const articles = await articleService.getByTag({ tag, offset });
    dispatch(setArticles(articles));
  } else {
    // dispatch(initializeArticles(offset, user));
  }
};

/* export const getArticleBySlug = (slug) => async () =>
  articleService.getBySlug(slug); */

export const favoriteAnArticle = (slug) => async (dispatch) => {
  const updatedArticle = await articleService.favoriteArticle(slug);

  dispatch(updateArticle(updatedArticle));
};

export const unfavoriteAnArticleAndRemove = (slug) => async (dispatch) => {
  const updatedArticle = await articleService.unfavoriteArticle(slug);
  dispatch(removeArticle(updatedArticle));
};

export const unfavoriteAnArticleAndUpdate = (slug) => async (dispatch) => {
  const updatedArticle = await articleService.unfavoriteArticle(slug);

  dispatch(updateArticle(updatedArticle));
};

export const createArticle = (article) => async () => {
  const newArticle = await articleService.create(article);
  // dispatch(appendArticle(newArticle.article));
  return newArticle;
};

export const update = (slug, article) => async () => {
  const newArticle = await articleService.update(slug, article);
  // dispatch(updateArticle(newArticle.article));
  return newArticle;
};

export const deleteArticle = (slug) => async () => {
  await articleService.deleteArticle(slug);
  // dispatch(removeArticle(slug))
};

export default articleSlice.reducer;

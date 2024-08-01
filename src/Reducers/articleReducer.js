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
      state.push(action.payload);
    },
    updateArticle(state, action) {
      const newArticle = action.payload;
      const newList = state.articles.map((article) =>
        article.slug !== newArticle.article.slug ? article : newArticle.article
      );
      return { ...state, articles: newList };
    },
    /* removeArticle(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    
  */
  },
});

export const { setArticles, appendArticle, updateArticle } =
  articleSlice.actions;

export const initializeArticles = (offset) => async (dispatch) => {
  const articles = await articleService.getAll(offset);
  dispatch(setArticles(articles));
};

export const setArticlesByFeed = (offset) => async (dispatch) => {
  const articles = await articleService.getAllFeed(offset);
  dispatch(setArticles(articles));
};

export const setArticlesByTag = (offset, tag) => async (dispatch) => {
  if (tag !== "") {
    const articles = await articleService.getByTag(tag, offset);
    dispatch(setArticles(articles));
  } else {
    dispatch(initializeArticles(offset));
  }
};

export const getArticleBySlug = (slug) => async () =>
  articleService.getBySlug(slug);

export const favoriteAnArticle = (slug) => async (dispatch) => {
  const updatedArticle = await articleService.favoriteArticle(slug);
  dispatch(updateArticle(updatedArticle));
};

export const unfavoriteAnArticle = (slug) => async (dispatch) => {
  const updatedArticle = await articleService.unfavoriteArticle(slug);
  dispatch(updateArticle(updatedArticle));
};

export default articleSlice.reducer;

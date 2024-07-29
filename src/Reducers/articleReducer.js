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
    /* removeArticle(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateArticle(state, action) {
      const newBlog = action.payload
      return state.map((blog) => (blog.id !== newBlog.id ? blog : newBlog))
  */
  },
});

export const { setArticles, appendArticle } = articleSlice.actions;

export const initializeArticles = () => async (dispatch) => {
  const articles = await articleService.getAll();
  dispatch(setArticles(articles));
};

export const getArticlesByTag = (tag) => async (dispatch) => {
  if (tag !== "") {
    const articles = await articleService.getTag(tag);
    dispatch(setArticles(articles));
  } else {
    dispatch(initializeArticles());
  }
};

export const getArticleBySlug = (slug) => async () =>
  articleService.getBySlug(slug);

export default articleSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import articleService from "../services/articles";

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.comments.push(action.payload);
    },
    removeComment(state, action) {
      const commentToRemove = action.payload;
      const newCommentList = state.comments.filter(
        (commend) => commend.id !== commentToRemove.id
      );
      return { comments: newCommentList };
    },
  },
});

export const { setComments, appendComment, removeComment } =
  commentSlice.actions;

export const initComments = (slug, user) => async (dispatch) => {
  const comments = await articleService.getComments(slug, user);
  dispatch(setComments(comments));
};

export const addComment = (slug, comment) => async (dispatch) => {
  const newComment = await articleService.createComment(slug, comment);

  dispatch(appendComment(newComment.comment));
};

export const deleteComment = (slug, comment) => async (dispatch) => {
  await articleService.deleteComment(slug, comment.id);
  dispatch(removeComment(comment));
};
export default commentSlice.reducer;

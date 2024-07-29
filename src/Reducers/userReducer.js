import { createSlice } from "@reduxjs/toolkit";
import articlesService from "../services/articles";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    dispatch(setUser(loggedUser));
    articlesService.setToken(loggedUser.token);
  } else {
    dispatch(setUser({ user: null }));
  }
};

export default userSlice.reducer;

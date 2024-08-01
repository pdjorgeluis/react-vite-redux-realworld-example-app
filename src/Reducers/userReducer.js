import { createSlice } from "@reduxjs/toolkit";
import articlesService from "../services/articles";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    updateUser(state, action) {
      const newUser = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    dispatch(setUser(loggedUser));
    articlesService.setToken(loggedUser.user.token);
    userService.setToken(loggedUser.user.token);
  } else {
    dispatch(setUser({ user: null }));
  }
};

export const updateSettings = (newUser) => async (dispatch) => {
  const updatedUser = await userService.updateCurrentUser(newUser);
  window.localStorage.setItem("loggedAppUser", JSON.stringify(updatedUser));
  dispatch(setUser(updatedUser));
};

export default userSlice.reducer;

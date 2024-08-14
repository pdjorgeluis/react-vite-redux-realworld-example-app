/*
export const getLocalLoggedUser = () => {
  // Check names
  const userJSON = window.localStorage.getItem("loggedAppUser");
  if (userJSON) {
    const loggedUser = JSON.parse(userJSON);
    articleService.setToken(loggedUser.user.token);
    userService.setToken(loggedUser.user.token);
    profileService.setToken(loggedUser.user.token);
    return loggedUser;
  }
  return { user: null };
}; */

export const getLocalStorageItem = (key) => {
  const item = window.localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const setLocalStorageItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

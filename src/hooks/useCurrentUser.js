import { useEffect, useState } from "react";
import userService from "../services/users";
import articleService from "../services/articles";
import profileService from "../services/profiles";

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localstorage_helper";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(
    getLocalStorageItem("loggedAppUser") || { user: null }
  );

  useEffect(() => {
    if (currentUser.user) {
      articleService.setToken(currentUser.user.token);
      userService.setToken(currentUser.user.token);
      profileService.setToken(currentUser.user.token);
    }
  }, [currentUser]);

  const setNewUser = (user) => {
    setCurrentUser(user);
    setLocalStorageItem("loggedAppUser", user);
  };

  const logOutUser = () => {
    setCurrentUser({ user: null });
  };
  return { currentUser, setNewUser, logOutUser };
};
export default useCurrentUser;

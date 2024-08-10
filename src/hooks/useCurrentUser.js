import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import articleService from "../services/articles";

import profileService from "../services/profiles";
/*
const useSetToken = (service) => {
  const [service, setService] = useState(null)

  setService(service)

  return service
} */

export const getLocalLoggedUser = () => {
  const userJSON = window.localStorage.getItem("loggedAppUser");
  if (userJSON) {
    const loggedUser = JSON.parse(userJSON);
    // setCurrentUser(loggedUser);
    articleService.setToken(loggedUser.user.token);
    userService.setToken(loggedUser.user.token);
    profileService.setToken(loggedUser.user.token);
    return loggedUser;
  }
  return { user: null };
};

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(getLocalLoggedUser());

  const setNewUser = (user) => {
    setCurrentUser(user);
    window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
    articleService.setToken(user.user.token);
    userService.setToken(user.user.token);
    profileService.setToken(user.user.token);
  };

  /* useEffect(() => {
    if (data) {
      setNewUser(data);
    }
  }, [data]); */

  const logOutUser = () => {
    setCurrentUser({ user: null });
  };
  return { currentUser, setNewUser, logOutUser };
}
export default useCurrentUser;

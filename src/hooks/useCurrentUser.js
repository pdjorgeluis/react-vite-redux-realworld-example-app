import { useCallback, useEffect, useState } from "react";
import articleService from "../services/articles";
import userService from "../services/users";
import profileService from "../services/profiles";
/*
const useSetToken = (service) => {
  const [service, setService] = useState(null)

  setService(service)

  return service
} */

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState({ user: null });

  const initializeUser = () => {
    const userJSON = window.localStorage.getItem("loggedAppUser");
    if (userJSON) {
      const loggedUser = JSON.parse(userJSON);
      setCurrentUser(loggedUser);
      articleService.setToken(loggedUser.user.token);
      userService.setToken(loggedUser.user.token);
      profileService.setToken(loggedUser.user.token);
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return { currentUser };
}

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

function useCurrentUser() {
  const initializeUser = () => {
    console.log("lilo");

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

  const [currentUser, setCurrentUser] = useState(initializeUser());

  /* const initializeUser = () => {
    console.log("lilo");

    const userJSON = window.localStorage.getItem("loggedAppUser");
    if (userJSON) {
      const loggedUser = JSON.parse(userJSON);
      setCurrentUser(loggedUser);
      articleService.setToken(loggedUser.user.token);
      userService.setToken(loggedUser.user.token);
      profileService.setToken(loggedUser.user.token);
    }
  }; */

  const logOutUser = () => {
    setCurrentUser({ user: null });
  };
  /*
  useEffect(() => {
    initializeUser();
  }, []);
*/
  return { currentUser, initializeUser };
}
export default useCurrentUser;

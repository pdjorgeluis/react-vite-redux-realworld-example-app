import React, { useEffect } from "react";

import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { initializeUser } from "./reducers/userReducer";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useCurrentUser from "./hooks/useCurrentUser";
import userService from "./services/users";
import Article from "./pages/Article";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProfileFavorites from "./pages/ProfileFavorites";
import Editor from "./pages/Editor";

function App() {
  // const user = useSelector((state) => state.loggedUser.user);
  const dispatch = useDispatch();
  // const { currentUser, logOutUser } = useCurrentUser();

  /* console.log("currentUser in app", currentUser);
  useEffect(() => {
    dispatch(initializeUser());
  }, []);
*/
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: userService.getCurrentUser,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const articleMatch = useMatch("/article/:slug");
  const profileMatch = useMatch("/:username");
  const editorMatch = useMatch("/editor/:slug");
  const profilefavoritesMatch = useMatch("/:username/favorites");

  const articleSlug = articleMatch ? articleMatch.params.slug : null;
  const profileUsername = profileMatch ? profileMatch.params.username : null;
  const profileFavoritesUsername = profilefavoritesMatch
    ? profilefavoritesMatch.params.username
    : null;
  const editorSlug = editorMatch ? editorMatch.params.slug : null;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const currentUser = data || { user: null };
  console.log("USER in APP", currentUser);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/article/:slug"
          element={<Article articleSlug={articleSlug} />}
        />
        <Route
          path="/settings"
          element={<Settings currentUser={currentUser} />}
        />
        <Route
          path="/:username"
          element={<Profile username={profileUsername} />}
        />
        <Route
          path="/:username/favorites"
          element={<ProfileFavorites username={profileFavoritesUsername} />}
        />
        <Route path="/editor" element={<Editor />} />
        <Route
          path="/editor/:slug"
          element={<Editor articleSlug={editorSlug} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useCurrentUser from "./hooks/useCurrentUser";
import Article from "./pages/Article";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProfileFavorites from "./pages/ProfileFavorites";
import Editor from "./pages/Editor";

function App() {
  const { currentUser } = useCurrentUser();

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

  if (!currentUser) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/article/:slug"
          element={<Article articleSlug={articleSlug} />}
        />
        <Route path="/settings" element={<Settings />} />
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


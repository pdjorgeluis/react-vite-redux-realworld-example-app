import React, { useEffect, useState } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./reducers/userReducer";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import { Navbar, Nav } from "react-bootstrap";

import "./App.css";
import articleService from "./services/articles";
import {
  initializeArticles,
  getArticleBySlug,
} from "./reducers/articleReducer";
import Article from "./pages/Article";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector((state) => state.loggedUser.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    // dispatch(initializeArticles({}, user));
  }, []);

  const articleMatch = useMatch("/article/:slug");
  const profileMatch = useMatch("/:username");
  // const userMatch = useMatch(`/@${user.username}`)
  // console.log("umatch in app", profileMatch);
  const articleSlug = articleMatch ? articleMatch.params.slug : null;
  const profileUsername = profileMatch ? profileMatch.params.username : null;

  // console.log("username in app", profileUsername);

  /* useEffect(() => {
    if (articleSlug) {
      articleService
        .getBySlug(articleSlug)
        .then((art) => setArticleBySlug(art.article));
    }
  }, [articleSlug]); */

  /* let selectedArticle = null;
  useEffect(() => {
    selectedArticle = articleMatch
      ? dispatch(getArticleBySlug(articleMatch.params.slug))
      : null;
  }, [articleMatch]);

   const selectedArticle = articleMatch
    ? articlesList.articles.find((u) => u.id === articleMatch.params.slug)
    : null; 

  const selectedArticle = articleMatch
    ? dispatch(getArticleBySlug(articleMatch.params.slug))
    : null; */

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/article/:slug"
          element={<Article articleSlug={articleSlug} user={user} />}
        />
        <Route path="/settings" element={<Settings />} />
        {user && (
          <Route
            path="/:username"
            element={<Profile username={profileUsername} user={user} />}
          />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


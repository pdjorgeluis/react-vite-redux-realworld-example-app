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
  const [message, setMessage] = useState("LOL");
  const [articleBySlug, setArticleBySlug] = useState(null);
  // const articlesList = useSelector((state) => state.articles);
  const user = useSelector((state) => state.loggedUser.user);

  const dispatch = useDispatch();
  // MAKE USE EFFECT ASYNC!

  const initApp = async () => {
    // dispatch(initializeArticles());
  };
  useEffect(() => {
    // console.log("USER", user);
    // initApp();
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    console.log("USER", user);

    dispatch(initializeArticles(0, user));
  }, [user]);

  const articleMatch = useMatch("/article/:slug");
  // const userMatch = useMatch(`/@${user.username}`)

  const articleSlug = articleMatch ? articleMatch.params.slug : null;

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
            path={`/@${user.username}`}
            element={<Profile user={user} />}
          />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


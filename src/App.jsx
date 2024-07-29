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

import {
  initializeArticles,
  getArticleBySlug,
} from "./reducers/articleReducer";
import Article from "./pages/Article";
import Settings from "./pages/Settings";

function App() {
  const [message, setMessage] = useState("LOL");

  // const articlesList = useSelector((state) => state.articles);
  const user = useSelector((state) => state.loggedUser.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    dispatch(initializeArticles());
  }, []);

  const articleMatch = useMatch("/article/:slug");
  const articleSlug = articleMatch ? articleMatch.params.slug : null;
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
      <Header currentUser={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/article/:slug"
          element={<Article articleSlug={articleSlug} user={user} />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


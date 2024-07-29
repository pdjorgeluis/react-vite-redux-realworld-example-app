import React, { useEffect, useState } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
} from "./Reducers/articleReducer";
import Article from "./pages/Article";

function App() {
  const [message, setMessage] = useState("LOL");
  const loggedUser = {
    username: "Jorge",
    image: "vite.svg",
  };
  const noUser = null;
  const articlesList = useSelector((state) => state.articles);

  const dispatch = useDispatch();

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
      <Header currentUser={noUser} />
      <Routes>
        <Route path="/" element={<Home user={noUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/article/:slug"
          element={<Article articleSlug={articleSlug} user={noUser} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


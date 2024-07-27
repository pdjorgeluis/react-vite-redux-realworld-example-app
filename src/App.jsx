import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import { Navbar, Nav } from "react-bootstrap";

import "./App.css";

function App() {
  const [message, setMessage] = useState("LOL");
  const loggedUser = {
    username: "Jorge",
    image: "vite.svg",
  };
  const noUser = null;

  return (
    <div>
      <Header currentUser={noUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


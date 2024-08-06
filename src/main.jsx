import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import articleReducer from "./reducers/articleReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    articles: articleReducer,
    comments: commentReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);


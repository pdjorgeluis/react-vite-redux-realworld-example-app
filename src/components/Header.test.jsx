import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
import { HashRouter as Router } from "react-router-dom";
// import articleReducer from "../reducers/articleReducer";
// import userReducer from "../reducers/userReducer";
// import commentReducer from "../reducers/commentReducer";

import Header from "./Header";
// import Profile from "../pages/Profile";

describe("<Header />", () => {
  test(`when no users logged, renders "Home", "Sing In" and "Sing Up"`, () => {
    const user = null;
    const { container } = render(
      <Router>
        <Header currentUser={user} />
      </Router>
    );

    const div = container.querySelector(".container");

    expect(div).toHaveTextContent("Home");
    expect(div).toHaveTextContent("Sign in");
    expect(div).toHaveTextContent("Sign up");
    expect(div).not.toHaveTextContent("New Article");
    expect(div).not.toHaveTextContent("Settings");
    expect(div).not.toHaveTextContent("New Article");
  });

  test(`when user is logged, renders "Home", "New Article", "Settings" and User data `, () => {
    const user = { username: "TestName" };
    const { container } = render(
      <Router>
        <Header user={user} />
      </Router>
    );
    const div = container.querySelector(".container");

    expect(div).toHaveTextContent("Home");
    expect(div).not.toHaveTextContent("Sign in");
    expect(div).not.toHaveTextContent("Sign up");
    expect(div).toHaveTextContent("New Article");
    expect(div).toHaveTextContent("Settings");
    expect(div).toHaveTextContent("New Article");

    expect(div).toHaveTextContent("TestName");
  });
});

/* describe("<Profile />", () => {
  const user = {
    user: {
      email: "user@email.com",
      username: "Terro Bron",
      bio: "this is a short bio",
      image: "http://image.png",
    },
  };
   const article = {
    article: {
      slug: "Testing in react-123",
      title: "Testing in react",
      description: "How testing is done in react",
      body: "Importance of testing, Tools, Steps and Examples",
      tagList: [
        "test","testing"
      ],
      createdAt: "2024-08-07T13:53:19.793Z",
      updatedAt: "2024-08-07T13:53:19.793Z",
      favorited: true,
      favoritesCount: 2,
      author: {
        username: "Terro Bron",
        bio: "this is a short bio",
        image: "http://image.png",
        following: true
      }
    }
  } 
  const profile = {
    profile: {
      username: "Terro Bron",
      bio: "this is a short bio",
      image: "http://image.png",
      following: true,
    },
  };

  const store = configureStore({
    reducer: {
      loggedUser: userReducer,
      articles: articleReducer,
      comments: commentReducer,
    },
  });

  test("When profile owner is the user, Fallow and Favorite are hidden, while Edit and Delete are visible", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Profile username="Maksim Esteban" user={null} />
        </Router>
      </Provider>
    );
    const div = container.querySelector(".container");

    console.log(div);

    expect(div).toHaveTextContent("Edit");

    // const div = container.querySelector(".container");

    // expect(div).toHaveTextContent("TestName");
  });
}); */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("<Header />", () => {
  test(`when no users logged, renders "Home", "Sing In" and "Sing Up"`, () => {
    const user = null;
    const { container } = render(
      <Router>
        <Header currentUser={user} />
      </Router>
    );

    const div = container.querySelector(".container");
    const div1 = container.querySelector(".user-pic");
    const div2 = container.querySelector(".nav-link active"); //*

    expect(div).toHaveTextContent("Home");
    // expect(div2).not.toBeNaN();
    expect(div).toHaveTextContent("Sign in");
    expect(div).toHaveTextContent("Sign up");
    expect(div).not.toHaveTextContent("New Article");
    expect(div).not.toHaveTextContent("Settings");
    expect(div).not.toHaveTextContent("New Article");
    // expect(div1).toBeNaN();
  });

  test(`when user is logged, renders "Home", "New Article", "Settings" and User data `, () => {
    const user = { username: "TestName" };
    const { container } = render(
      <Router>
        <Header currentUser={user} />
      </Router>
    );
    const div = container.querySelector(".container");

    expect(div).toHaveTextContent("TestName");
  });
});

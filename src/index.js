import React from "react";
import { render } from "react-dom";
import PostsProvider from "./components/providers/PostsProvider";
import "./index.scss";
import Application from "./components/Application";
import UserProvider from "./components/providers/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <UserProvider>
      <PostsProvider>
        <Application />
      </PostsProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

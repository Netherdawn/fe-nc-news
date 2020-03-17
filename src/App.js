import React from "react";
import "./App.css";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import { Router } from "@reach/router";
import ArticlesByTopic from "./components/ArticlesByTopic";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Topics path="/" />
        <ArticlesByTopic path="/articles/topic/:topic" />
        <Articles path="/articles/*" />
      </Router>
    </div>
  );
}

export default App;

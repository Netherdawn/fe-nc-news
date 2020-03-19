import React from "react";
import "./App.css";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { Router } from "@reach/router";
import ArticlesByTopic from "./components/ArticlesByTopic";

class App extends React.Component {
  state = {
    username: null
  };

  login = username => {
    this.setState({ username });
  };

  logout = () => {
    this.setState({ username: null });
  };

  render() {
    return (
      <div className="App">
        <Header
          username={this.state.username}
          login={this.login}
          logout={this.logout}
        />
        <Router>
          <Topics path="/" />
          <Articles path="/articles" />
          <ArticlesByTopic path="/articles/topic/:topic" />
          <Article
            username={this.state.username}
            path="/articles/:article_id"
          />
        </Router>
      </div>
    );
  }
}

export default App;

import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import Loading from "./Loading";
import ArticleListee from "./ArticleListee";

class Articles extends React.Component {
  state = {
    articles: null
  };

  componentDidMount() {
    api.fetchArticles().then(({ data }) => {
      this.setState({ articles: data.articles });
    });
  }

  render() {
    return this.state.articles === null ? (
      <Loading />
    ) : (
      <ul>
        {this.state.articles.map(article => {
          return <ArticleListee article={article} />;
        })}
      </ul>
    );
  }
}

export default Articles;

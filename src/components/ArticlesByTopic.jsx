import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import Loading from "./Loading";
import ArticleListee from "./ArticleListee";

class ArticlesByTopic extends React.Component {
  state = {
    articles: null
  };

  componentDidMount() {
    console.log(this.props.topic);
    api.fetchArticles({ topic: this.props.topic }).then(({ data }) => {
      this.setState({ articles: data.articles });
    });
  }

  componentDidUpdate() {
    console.log("updating");
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

export default ArticlesByTopic;

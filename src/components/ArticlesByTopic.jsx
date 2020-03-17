import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import Loading from "./Loading";

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
          return (
            <div key={article.slug} className="topic-container">
              <h2 className="topic-title">{article.title}</h2>
              <p className="topic-description">
                {article.body.substring(0, 150) + "..."}
              </p>
              <Link to={`/articles`} className="articles-by-topic-button">
                <p>{"<Articles "}</p>
                <p className="articles-by-topic-button-element">{"/>"}</p>
              </Link>
            </div>
          );
        })}
      </ul>
    );
  }
}

export default ArticlesByTopic;

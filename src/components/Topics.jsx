import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import Loading from "./Loading";

class Topics extends React.Component {
  state = {
    topics: null
  };

  componentDidMount() {
    api.fetchTopics().then(({ data }) => {
      this.setState({ topics: data.topics });
    });
  }

  render() {
    return this.state.topics === null ? (
      <Loading />
    ) : (
      <ul>
        {this.state.topics.map(topic => {
          return (
            <div key={topic.slug} className="topic-container">
              <h2 className="topic-title">{topic.slug}</h2>
              <p className="topic-description">{topic.description}</p>
              <Link
                to={`/articles/topic/${topic.slug}`}
                className="articles-by-topic-button"
              >
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

export default Topics;

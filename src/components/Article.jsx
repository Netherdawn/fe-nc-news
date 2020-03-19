import React from "react";
import * as api from "../api";
import Loading from "./Loading";
import Comments from "./Comments";
import Voter from "./Voter";

class Article extends React.Component {
  state = {
    article: null,
    student: null,
    isLoading: true,
    shownComments: false,
    needUpdating: false
  };

  toggleComments = () => {
    this.setState(currentState => {
      return { shownComments: !currentState.shownComments };
    });
  };

  changeVote = (article, value) => {
    article.votes += value;
    this.forceUpdate();
    api.patchArticleVoteById(article.article_id, value).then(() => {
      this.setState({ needUpdating: true });
    });
  };

  componentDidMount() {
    api.fetchArticleById(this.props.article_id).then(({ data }) => {
      this.setState({ article: data.article });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.needUpdating === true) {
      api.fetchArticleById(this.props.article_id).then(({ data }) => {
        this.setState({ article: data.article, needUpdating: false });
      });
    }
    console.log("updating");
    if (this.state.isLoading === true) {
      api.fetchUserByUsername(this.state.article.author).then(({ data }) => {
        this.setState({ student: data.user, isLoading: false });
      });
    }
  }

  render() {
    const { article, student, isLoading, shownComments } = this.state;
    return isLoading === true ? (
      <Loading />
    ) : (
      <>
        <div className="article-container">
          <div className="user-container">
            <img
              className="author-image"
              src={student.avatar_url}
              alt="Author's picture"
              height={100}
            />
            <span className="author-info">
              <h3>author:{article.author}</h3>
              <h3>topic:{article.topic}</h3>
            </span>
          </div>
          <div className="body-container">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-body">{article.body}</p>
          </div>
          <p>
            posted:
            {article.created_at.substring(11, 16)}{" "}
            {article.created_at.substring(0, 10)}
          </p>
          <div className="ancilliary-container">
            <p>votes:{article.votes}</p>
            <p>comments:{article.comment_count}</p>
          </div>
        </div>
        <span className="button-container">
          <Voter
            className="button"
            changeVote={this.changeVote}
            value={1}
            item={this.state.article}
          >
            {"<upvote />"}
          </Voter>
          {shownComments === true ? (
            <button onClick={this.toggleComments} className="button">
              {"<hide />"}
            </button>
          ) : (
            <button onClick={this.toggleComments} className="button">
              {"<show />"}
            </button>
          )}
        </span>

        {shownComments === true ? (
          <Comments id={article.article_id} username={this.props.username} />
        ) : null}
      </>
    );
  }
}

export default Article;

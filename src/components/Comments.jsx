import React from "react";
import "./Comments.css";
import * as api from "../api";
import Loading from "./Loading";
import Voter from "./Voter";
import Toggle from "./Toggle";

class Comments extends React.Component {
  state = {
    comments: null,
    needUpdating: true
  };
  changeVote = (comment, value) => {
    comment.votes += value;
    this.forceUpdate();
    api.patchCommentVoteById(comment.comment_id, value).then(() => {
      this.setState({ needUpdating: true });
    });
  };
  componentDidMount() {
    api.fetchCommentsByArticleId(this.props.id).then(({ data }) => {
      this.setState({ comments: data.comments, needUpdating: false });
    });
  }
  componentDidUpdate() {
    console.log("updating");
    if (this.state.needUpdating === true) {
      api.fetchCommentsByArticleId(this.props.id).then(({ data }) => {
        this.setState({ comments: data.comments, needUpdating: false });
      });
    }
  }

  render() {
    const { count, comments } = this.state;
    return this.state.comments === null ? (
      <Loading />
    ) : (
      <>
        <ul>
          {comments.map(comment => {
            return (
              <React.Fragment key={comment.comment_id}>
                <div className="comment-container">
                  <h3>{comment.author}</h3>
                  <p className="comment-body">{comment.body}</p>
                  <span className="comment-end">
                    <p>
                      posted:
                      {comment.created_at.substring(11, 16)}{" "}
                      {comment.created_at.substring(0, 10)}
                    </p>
                    <p>votes:{comment.votes}</p>
                  </span>
                </div>
                <span className="comment-end">
                  <Voter changeVote={this.changeVote} value={1} item={comment}>
                    <p>{"<upvote />"}</p>
                  </Voter>
                  <Voter changeVote={this.changeVote} value={-1} item={comment}>
                    <p>{"<downvote />"}</p>
                  </Voter>
                </span>
              </React.Fragment>
            );
          })}
        </ul>
        {this.props.username === null ? (
          <Toggle>
            <p>{"<post />"}</p>
            <p>please log in</p>
          </Toggle>
        ) : (
          <Toggle>
            <p>{"<post />"}</p>
            <p>please log in</p>
          </Toggle>
        )}
      </>
    );
  }
}

export default Comments;

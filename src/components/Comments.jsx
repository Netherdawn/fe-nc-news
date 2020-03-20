import React from "react";
import "./Comments.css";
import * as api from "../api";
import Loading from "./Loading";
import Voter from "./Voter";
import Toggle from "./Toggle";
import Post from "./Post";

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
  addComment = body => {
    api
      .postCommentByArticleId(this.props.id, {
        body: body,
        username: this.props.username
      })
      .then(comment => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      });
  };
  deleteComment = id => {
    api.deleteCommentByCommentId(id).then(() => {
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
    const { comments } = this.state;
    const { id, username } = this.props;
    return this.state.comments === null ? (
      <Loading />
    ) : (
      <>
        {this.props.username === null ? (
          <Toggle>
            <p>{"<post />"}</p>
            <p>please log in</p>
          </Toggle>
        ) : (
          <Toggle>
            <p>{"<post />"}</p>
            <Post post={this.addComment} />
          </Toggle>
        )}
        <ul>
          {comments.map(comment => {
            return (
              <React.Fragment key={comment.comment_id}>
                <div className="comment-container">
                  <h3 className="comment-title">{comment.author}</h3>
                  {comment.author === username ? (
                    <button
                      className="comment-delete button"
                      onClick={() => {
                        this.deleteComment(comment.comment_id);
                      }}
                    >
                      {"<delete />"}
                    </button>
                  ) : null}
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
                <span className="comment-end-button">
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
      </>
    );
  }
}

export default Comments;

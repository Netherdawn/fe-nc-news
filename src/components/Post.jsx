import React from "react";

class Post extends React.Component {
  state = {
    comment: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.state;
    this.props.post(comment);
  };

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={comment}
          onChange={event => {
            this.setState({ comment: event.target.value });
          }}
        ></textarea>
        <button className="button">{"<submit />"}</button>
      </form>
    );
  }
}

export default Post;

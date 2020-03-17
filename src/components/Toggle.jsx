import React from "react";

class Toggle extends React.Component {
  state = {
    toggle: false
  };
  swapToggle = () => {
    this.setState(currentState => {
      return {
        toggle: !currentState.toggle
      };
    });
  };
  render() {
    return (
      <>
        <button onClick={this.swapToggle}>Post</button>
        {this.state.toggle === false
          ? this.props.children[0]
          : this.props.children[1]}
      </>
    );
  }
}

export default Toggle;

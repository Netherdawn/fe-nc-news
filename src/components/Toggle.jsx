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
        {this.state.toggle === true ? this.props.children[1] : null}
        <button className="button" onClick={this.swapToggle}>
          {this.state.toggle === true ? (
            <p>{"<close />"}</p>
          ) : (
            this.props.children[0]
          )}
        </button>
      </>
    );
  }
}

export default Toggle;

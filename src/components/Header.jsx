import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <span>
          <h1 className="red-text">N</h1>
          <h1 className="white-text">C News</h1>
        </span>

        {/* <form className="inline searchbar">
          <label className="white-text">
            search
            <input></input>
          </label>
          <button className="searchbutton">
            <img
              src={require("../assets/search_icon.png")}
              alt="Enter"
              height="16"
            />
          </button>
        </form> */}
        <span>
          <button className="header-button red-text">topics</button>
          <button className="header-button red-text">articles</button>
        </span>
      </div>
    );
  }
}

export default Header;

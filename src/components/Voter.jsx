import React from "react";

const Voter = ({ item, changeVote, value, children }) => {
  const handleClick = event => {
    changeVote(item, value);
  };

  return (
    <button onClick={handleClick} className="button">
      {children}
    </button>
  );
};

export default Voter;

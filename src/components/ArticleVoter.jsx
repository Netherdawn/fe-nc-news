import React from "react";

const ArticleVoter = ({ article, changeVote, value, children }) => {
  const handleClick = event => {
    changeVote(article, value);
  };

  return (
    <button onClick={handleClick} className="button">
      {children}
    </button>
  );
};

export default ArticleVoter;

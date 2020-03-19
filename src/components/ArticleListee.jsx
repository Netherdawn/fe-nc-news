import React from "react";
import "./Article.css";
import { Link } from "@reach/router";

function ArticleListee(props) {
  const { article } = props;
  return (
    <>
      <div key={article.slug} className="article-listee-container">
        <h2>{article.title}</h2>
        <p className="article-listee-body">
          {article.body.substring(0, 150) + "..."}
        </p>
      </div>
      <Link
        to={`/articles/${article.article_id}`}
        className="button"
        author={article.author}
      >
        <p>{"<Read />"}</p>
      </Link>
    </>
  );
}

export default ArticleListee;

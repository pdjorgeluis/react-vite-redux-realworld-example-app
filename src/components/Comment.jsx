import React from "react";
import { Link } from "react-router-dom";

function Comment({ comment, user, onClickButton }) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to="/profile/author" className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to={`/${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {user.username === comment.author.username && (
          <span className="mod-options">
            <button
              className="ion-trash-a"
              type="button"
              onClick={onClickButton}
             />
          </span>
        )}
      </div>
    </div>
  );
}

export default Comment;

import React from "react";

function CommentList({ comments }) {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
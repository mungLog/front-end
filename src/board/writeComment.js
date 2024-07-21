import React, { useState } from "react";
import axios from "axios";

function CommentForm({ postId, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/posts/${postId}/comments`, { text: newComment })
      .then((response) => {
        onCommentAdded(response.data);
        setNewComment("");
      })
      .catch((err) => {
        console.error("Failed to add comment", err);
      });
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea value={newComment} onChange={handleCommentChange} />
      <button type="submit"></button>
    </form>
  );
}

export default CommentForm;

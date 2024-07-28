import React, { useState } from "react";
import axios from "axios";

const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${awsIP}/posts/${postId}/comment`,
        method: "post",
        data: {
          content: content,
        },
      });
      setContent("");
      console.log("댓글 작성 성공");
    } catch (error) {
      console.error("글 삭제 실패", error);
    }
  };
  const clickEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div>
      <h2>댓글 작성</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={clickEnter}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default CreateComment;

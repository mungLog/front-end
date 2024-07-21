import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UpdatePost() {
  const [post, setPost] = useState(null);

  const location = useLocation();
  const { postId, title, content, category } = location.state;
  useEffect(() => {
    axios
      .post(`/posts/update/${postId}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((err) => {
        console.error("Failed to fetch post data", err);
      });
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>게시글 수정</h1>
      <form>
        <input type="text" defaultValue={post.title} placeholder="제목" />
        <input
          type="text"
          defaultValue={post.category}
          placeholder="카테고리"
        />
        <textarea defaultValue={post.content} placeholder="내용" />
        {post.imageUrl && <img src={post.imageUrl} alt="첨부 이미지" />}
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default UpdatePost;

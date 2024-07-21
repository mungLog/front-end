import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
//로그인 안하면 들어와지면 안됨
function CommunityWrite() {
  const [post, setPost] = useState({ title: "", content: "", category: "" });
  const [updateMode, setUpdateMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { postId, title, content, category } = location.state;
      setPost({ title, content, category });
      setUpdateMode(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title || !post.content || post.category === "") {
      alert("제목, 내용 및 카테고리를 모두 입력해주세요.");
      return;
    }

    const url = updateMode
      ? `/posts/update/${location.state.postId}`
      : "/posts";
    axios({
      url: url,
      method: "post",
      data: post,
    })
      .then((response) => {
        const postId = response.data.post.id; // 서버에서 반환된 게시글 ID
        console.log("작성 성공", response.data.message);
        navigate(`/community/posts/${postId}`);
      })
      .catch((error) => {
        console.error("작성 실패", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요."
        />
        <select
          name="category"
          defaultValue={post.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택해주세요.</option>
          <option value="수다방">수다방</option>
          <option value="정보 공유해요">정보 공유해요</option>
          <option value="질문 있어요">질문 있어요</option>
          <option value="친구 구해요">친구 구해요</option>
          <option value="나눔해요">나눔해요</option>
        </select>
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="내용을 입력해주세요."
        />
        <button type="submit">{updateMode ? "수정 완료" : "글쓰기"}</button>
      </form>
    </>
  );
}

export default CommunityWrite;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../header/AuthContext";

// 로그인 안하면 들어와지면 안됨
function CommunityWrite() {
  const [post, setPost] = useState({ title: "", content: "", category: "" });
  const [image, setImage] = useState(null); // 추가된 상태 변수
  const [updateMode, setUpdateMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useAuth();
  const awsIP = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!state.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }

    if (location.state) {
      const { postId, title, content, category } = location.state;
      setPost({ title, content, category });
      setUpdateMode(true);
    }
  }, [location.state, navigate, state.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title || !post.content || post.category === "") {
      alert("제목, 내용 및 카테고리를 모두 입력해주세요.");
      return;
    }

    const url = updateMode
      ? `${awsIP}/posts/update/${location.state.postId}`
      : `${awsIP}/posts`;

    // FormData를 사용하여 파일과 데이터를 함께 전송
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    if (image) formData.append("image", image);

    axios({
      url: url,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state.accessToken}`,
      },
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // 파일 선택
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
          value={post.category} // value를 defaultValue에서 변경
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">{updateMode ? "수정 완료" : "글쓰기"}</button>
      </form>
    </>
  );
}

export default CommunityWrite;

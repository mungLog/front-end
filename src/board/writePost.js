import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../header/AuthContext";
import style from "./css/write.module.css";
import { Link } from "react-router-dom";

function CommunityWrite() {
  const [post, setPost] = useState({ title: "", content: "", category: "" });
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("첨부할 사진을 선택해주세요.");
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
    formData.append("userId", state.user.id);
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("category", post.category);
    if (image) formData.append("imageUrl", image);

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
        const postId = response.data.post.id;
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
    } else {
      setFileName("첨부할 사진을 선택해주세요.");
    }
  };

  return (
    <div id={style.whiteBack}>
      <div id={style.contentWrap}>
        <h1>멍뮤니티-게시글 작성</h1>
        <div id={style.contentFlex}>
          <form onSubmit={handleSubmit}>
            <div id={style.formContent}>
              <div className={style.blueName}>카테고리</div>
              <select
                name="category"
                value={post.category}
                onChange={handleChange}
              >
                <option value="">카테고리 선택</option>
                <option value="수다방">수다방</option>
                <option value="정보 공유해요">정보 공유해요</option>
                <option value="질문 있어요">질문 있어요</option>
                <option value="친구 구해요">친구 구해요</option>
                <option value="나눔해요">나눔해요</option>
              </select>
              <div className={style.blueName}>제목</div>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="제목을 입력해주세요."
              />
              <div className={style.blueName}>내용</div>
              <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="내용을 입력해주세요."
              />
              <div className={style.blueName}>사진첨부</div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={style.hiddenFileInput}
                  id="file"
                />
                <label for="file">
                  <div className={style.customFileText}>{fileName}</div>
                </label>
              </div>
            </div>
            <button type="submit">
              {updateMode ? "수정 완료" : "작성완료"}
            </button>
          </form>
          <div className={style.sideBar}>
            <Link to={`/community/write`}>게시글 작성</Link>
            <Link to={`/community/posts`}>내가 작성한 게시물</Link>
            <Link to={`/community/posts`}>내가 작성한 댓글</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityWrite;

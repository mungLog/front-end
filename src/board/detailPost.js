import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CreateComment from "./writeComment";
import CommentList from "./listComment";
import { useAuth } from "../header/AuthContext";

function CommunityDetail() {
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const { state } = useAuth();

  const logId = state.user ? state.user.id : null;
  const token = state.accessToken;
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${awsIP}/posts/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("게시물 실패", error);
      });
  }, [post_id, token, awsIP]);

  const handleUpdateClick = () => {
    navigate(`/community/posts/${post_id}`, {
      state: {
        post_id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
      },
    });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`${awsIP}/posts/delete/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("글 삭제 성공");
        window.location.href = `/community`;
      })
      .catch((error) => {
        console.error("글 삭제 실패", error);
      });
  };
  console.log(post);
  const isAuthor = post?.userId === logId;

  return (
    <>
      {/* <div>제목 : {post.title}</div>
      <div>작성자 : {post.userId}</div>
      <div>카테고리 : {post.category}</div>
      <div>작성일 : {post.timestamp}</div>
      <div>{post.content}</div> */}

      {isAuthor && (
        <div>
          <button onClick={handleUpdateClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
      <CreateComment postId={post_id} />
      <CommentList postId={post_id} userId={logId} />
    </>
  );
}

export default CommunityDetail;

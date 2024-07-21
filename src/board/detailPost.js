import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "./writeComment";
import CommentList from "./listComment";

function CommunityDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/posts/${postId}`)
      .then((response) => {
        setPost(response.data.post);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("게시물 실패", error);
      });
  }, [postId]);

  const handleCommentAdd = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleUpdateClick = () => {
    navigate(`/community/posts/${postId}`, {
      state: {
        postId: postId,
        title: post.title,
        content: post.content,
        category: post.category,
      },
    });
  };
  const handleDeleteClick = () => {
    axios
      .delete(`/posts/delete/${postId}`)
      .then(() => {
        console.log("글 삭제 성공");
        window.location.href = `/community`;
      })
      .catch((error) => {
        console.error("글 삭제 실패", error);
      });
  };

  const isAuthor = post?.author === "접속자ID";

  return (
    <div>
      <div>제목 : {post.title}</div>
      <div>작성자 : {post.author}</div>
      <div>카테고리 : {post.category}</div>
      <div>작성일 : {post.tiemstamp}</div>
      <div>{post.content}</div>

      {isAuthor && (
        <div>
          <button onClick={handleUpdateClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
      <CommentForm postId={postId} onCommentAdded={handleCommentAdd} />
      <CommentList comments={comments} />
    </div>
  );
}

export default CommunityDetail;

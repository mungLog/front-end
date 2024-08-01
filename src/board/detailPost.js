import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CreateComment from "./writeComment";
import CommentList from "./listComment";
import { useAuth } from "../header/AuthContext";
import style from "./css/detail.module.css";
import { Link } from "react-router-dom";
import user from "./img/userIcon.svg";
import updateIcon from "./img/updateIcon.svg";
import deleteIcon from "./img/deleteIcon.svg";

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
    <div id={style.whiteBack}>
      <div id={style.contentWrap}>
        <h1>멍뮤니티-게시글 작성</h1>
        <div id={style.contentFlex}>
          <div id={style.content}>
            <div className={style.infoFlex}>
              <div className={style.infoWrap}>
                <img src={user} alt="유저아이콘" />
                <span>{post.author}</span>
              </div>
              <span>{post.timestamp}</span>
            </div>
            {isAuthor && (
              <div id={style.updelBtn}>
                <>
                  <button onClick={handleUpdateClick}>
                    <img src={updateIcon} alt="수정" />
                  </button>
                  <button onClick={handleDeleteClick}>
                    <img src={deleteIcon} alt="삭제" />
                  </button>
                </>
              </div>
            )}
            <div id={style.ctg}>{post.category}</div>
            <div id={style.title}>{post.title}</div>
            <hr id={style.line} />
            <div className={style.content}>{post.content}</div>
            <CreateComment postId={post_id} />
            <CommentList postId={post_id} userId={logId} />
          </div>

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

export default CommunityDetail;

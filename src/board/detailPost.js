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
  // useEffect(() => {
  //   axios
  //     .get(`${awsIP}/posts/${post_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("게시물 실패", error);
  //     });
  // }, [post_id, token, awsIP]);

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
  // console.log(post);
  // const isAuthor = post?.userId === logId;
  const isAuthor = true;
  return (
    <div id={style.whiteBack}>
      <div id={style.contentWrap}>
        <h1>멍뮤니티-게시글 작성</h1>
        <div id={style.contentFlex}>
          <div id={style.content}>
            <div className={style.infoFlex}>
              <div className={style.infoWrap}>
                <img src={user} alt="유저아이콘" />
                {/* <span>{post.author}</span> */}
                <span>정*수</span>
              </div>
              {/* <span>{post.timestamp}</span> */}
              <span>2024.08.03</span>
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
            {/* <div id={style.ctg}>{post.category}</div> */}
            <div id={style.ctg}>수다방</div>
            {/* <div id={style.title}>{post.title}</div> */}
            <div id={style.title}>오늘 산책 나갔는데 진짜 너무 더워요 ㅠㅠ</div>
            <hr id={style.line} />
            {/* <div className={style.content}>{post.content}</div> */}
            <div className={style.content}>
              날씨가 너무 더워서 갈등하다가 그래도 곰돌이가 너무 가고싶어하는 것
              같아서 맘 약해져서 나갔다가 1분만에 후회했어요...다들 산책
              어떻게들 하고 계세요..?
            </div>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../header/AuthContext";
import style from "./css/list.module.css";
import dog1 from "./img/dog1.png";
import dog2 from "./img/dog2.png";
import dog3 from "./img/dog3.png";
import dog4 from "./img/dog4.png";

function CommunityList() {
  const [list, setList] = useState([]);
  const { state } = useAuth();

  // const sampleData = [
  //   {
  //     postId: "1",
  //     image: dog1,
  //     category: "수다방",
  //     title: "꽃을 물어왔어요:)",
  //     content:
  //       "이번 주말에 같이 공원에 나들이 갔는데 달려가더니 꽃을 물고 웃으면서 뛰어오더라고요. 너무 귀여워서 사진 공유해요.",
  //     timestamp: "2024.07.31",
  //   },
  //   {
  //     postId: "2",
  //     image: dog2,
  //     category: "정보 공유해요",
  //     title: "서울시 애견 동반 카페 정보 나눠요.",
  //     content:
  //       "제가 좋아하는 곳 몇군데 정보 남깁니다! 다른 좋은 곳들 댓글로 부탁드려요!!",
  //     date: "2024.07.31",
  //   },
  //   {
  //     postId: "3",
  //     image: null,
  //     category: "질문있어요",
  //     title: "새끼강아지",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt odit tempore illum provident vero similique quis, minus hic quisquam, doloremque neque, harum animi non velit deleniti. Iure mollitia, pariatur est similique, earum soluta, ea dolor beatae perspiciatis accusantium quibusdam. Soluta repudiandae repellendus incidunt sapiente odit quis nesciunt, delectus maiores similique.",
  //     date: "2024.07.31",
  //   },
  // ];
  const imgDogSample = [
    {
      image: dog1,
      title: "강아지도 카메라 렌즈를 알아볼까요?",
    },
    {
      image: dog2,
      title: "새끼 강아지 사료 적당량",
    },
    {
      image: dog3,
      title: "우리집 곰돌이 너무 귀여워.",
    },
    {
      image: dog4,
      title: "방에 있는 저를 계속 확인해요!",
    },
  ];
  // useEffect(() => {
  //   setList(sampleData);
  // }, []);

  const awsIP = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios({
      method: "get",
      url: `${awsIP}/posts/allpost`,
    })
      .then((response) => {
        setList(response.data);
        console.log("통신 성공");
      })
      .catch((error) => {
        console.log("커뮤니티 목록", error);
      });
  }, [awsIP]);

  return (
    <div id={style.whiteBack}>
      <div className={style.maxContainer}>
        <h5 id={style.imgDogTitle}>Image Dog</h5>
        <div className={style.imgFlex}>
          {imgDogSample.map((imgDog, index) => (
            <div className={style.imgWrap} key={index}>
              <img src={imgDog.image} alt="게시판 이미지" />
              <div className={style.title}>{imgDog.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div id={style.community}>
        <div className={style.maxContainer}>
          <h1>멍뮤니티 게시판</h1>
          <div id={style.detailFlex}>
            <div>
              {list.map((notice, idx) => {
                return (
                  <Link to={`/community/posts/${notice.id}`}>
                    <div className={style.commu} key={idx}>
                      <div>
                        <div className={style.titleFlex}>
                          <div className={style.ctg}>{notice.category}</div>
                          <div className={style.title}>{notice.title}</div>
                        </div>
                        <div className={style.content}>{notice.content}</div>
                        <div className={style.date}>{notice.timestamp}</div>
                      </div>
                      {notice.image && (
                        <img src={notice.image} alt="게시글 이미지" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={style.sideBar}>
              <Link to={`/community/write`}>게시글 작성</Link>
              <Link to={`/community/posts`}>내가 작성한 게시물</Link>
              <Link to={`/community/posts`}>내가 작성한 댓글</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommunityList;

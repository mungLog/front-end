import React from "react";
import style from "./main.module.css";
import main from "./main.png";
import mainBtn from "./mainBtn.svg";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <div id={style.mainCenter}>
        <img src={main} alt="메인이미지" id={style.mainImg} />
        <h1>
          우리 강아지의
          <br /> 하루를 기록해 보세요!
        </h1>
        <Link to="/mypage?mode=dog">일정 등록하러가기</Link>
      </div>
      <br />
    </>
  );
}

export default Main;

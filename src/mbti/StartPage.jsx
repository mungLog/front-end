// StartPage.js
import React from "react";
import "./MbtiPage.css";

const StartPage = ({ onStart }) => (
  <div className="mbtiBody">
    <div className="Startcontainer">
      <div className="StartTitle">
        <h1>
          우리 집 강아지
          <br />
          멍! bti 테스트
        </h1>
      </div>
      <div className="StartPic"></div>
      <button className="Startbutton" onClick={onStart}>
        테스트 시작하기
      </button>
    </div>
  </div>
);

export default StartPage;

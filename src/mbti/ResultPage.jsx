import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import 합니다
import "./MbtiPage.css";

const ResultPage = ({ result, dogName, answers }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 얻습니다

  const handleExit = () => {
    navigate("/mypage"); // /mypage로 이동합니다
  };

  // MBTI 데이터 계산
  const mbtiCounts = {
    I: answers.filter((answer) => answer === "I").length,
    E: answers.filter((answer) => answer === "E").length,
    S: answers.filter((answer) => answer === "S").length,
    N: answers.filter((answer) => answer === "N").length,
    T: answers.filter((answer) => answer === "T").length,
    F: answers.filter((answer) => answer === "F").length,
    J: answers.filter((answer) => answer === "J").length,
    P: answers.filter((answer) => answer === "P").length,
  };

  const calculatePercentage = (count1, count2) => {
    const total = count1 + count2;
    return total === 0
      ? [0, 0]
      : [(count1 / total) * 100, (count2 / total) * 100];
  };

  const [iPercentage, ePercentage] = calculatePercentage(
    mbtiCounts.I,
    mbtiCounts.E
  );
  const [sPercentage, nPercentage] = calculatePercentage(
    mbtiCounts.S,
    mbtiCounts.N
  );
  const [tPercentage, fPercentage] = calculatePercentage(
    mbtiCounts.T,
    mbtiCounts.F
  );
  const [jPercentage, pPercentage] = calculatePercentage(
    mbtiCounts.J,
    mbtiCounts.P
  );

  return (
    <div className="mbtiBody">
      <div className="ResultOutBox">
        <div className="ResultInBox">
          <div className="ResultTitle">
            <h1>우리 집 강아지 {dogName}는!</h1>
          </div>
          <div className="ResultPic"></div>
          <div className="ResultMbti">
            <p>{result}</p>
          </div>
          <div className="ResultPercentages">
            <p>
              I: {iPercentage.toFixed(2)}% / E: {ePercentage.toFixed(2)}%
            </p>
            <p>
              S: {sPercentage.toFixed(2)}% / N: {nPercentage.toFixed(2)}%
            </p>
            <p>
              T: {tPercentage.toFixed(2)}% / F: {fPercentage.toFixed(2)}%
            </p>
            <p>
              J: {jPercentage.toFixed(2)}% / P: {pPercentage.toFixed(2)}%
            </p>
          </div>
          <button className="ResultButton" onClick={handleExit}>
            종료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style/ResultPage.style";
import style from "./style/mbtiResult.module.css";
import chu from "../mypageDog/card/img/시추.png";
import tiz from "../mypageDog/card/img/말티즈.png";
import pu from "../mypageDog/card/img/푸들.png";
import mbtiInfo from "./mbtiInfo.js";
import "./MbtiPage.css";

const hardcodedDogs = [
  {
    id: 1,
    name: "아추",
    image: chu,
    mbti: "ISFP",
  },
  {
    id: 2,
    name: "하루",
    image: tiz,
  },
  {
    id: 3,
    name: "밀크",
    image: pu,
  },
];
const getDogImage = (dogName) => {
  const dog = hardcodedDogs.find((dog) => dog.name === dogName);
  return dog ? dog.image : "default-image-path";
};

const ResultPage = ({ result, dogName, answers }) => {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/mbti");
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

  const getStyle = (percentageA, percentageB) => {
    if (percentageA > percentageB) {
      return { width: `${percentageA}%`, backgroundColor: "#FCD11D", left: 0 };
    } else {
      return { width: `${percentageB}%`, backgroundColor: "#FCD11D", right: 0 };
    }
  };

  const { traits, tour, places } = mbtiInfo[result] || {};

  return (
    <S.MbtiBody>
      <S.ResultOutBox>
        <S.ResultTitle>
          <h1>우리 집 강아지 {dogName}는!</h1>
        </S.ResultTitle>
        <S.ResultPic>
          <S.ResultPicImage src={getDogImage(dogName)} alt={dogName} />
        </S.ResultPic>
        <S.ResultMbti>
          <div>{result}</div>
        </S.ResultMbti>
        <S.ResultMbtibottom>
          <S.box1>
            <S.ResultTitle2>
              <h1>성격분석</h1>
            </S.ResultTitle2>
            <S.ResultPercentages>
              {/* I vs E */}
              <div className={style.cylinderWrapper}>
                <span>I</span>
                <div className={style.cylinderContainer}>
                  <div
                    className={style.cylinder}
                    style={getStyle(iPercentage, ePercentage)}
                  ></div>
                </div>
                <span>E</span>
              </div>
              <div className={style.persentFlex}>
                <div>내향형 ({iPercentage.toFixed(2)}%)</div>
                <div>외향형 ({ePercentage.toFixed(2)}%)</div>
              </div>

              {/* S vs N */}
              <div className={style.cylinderWrapper}>
                <span>S</span>
                <div className={style.cylinderContainer}>
                  <div
                    className={style.cylinder}
                    style={getStyle(sPercentage, nPercentage)}
                  ></div>
                </div>
                <span>N</span>
              </div>
              <div className={style.persentFlex}>
                <div>현실주의형 ({sPercentage.toFixed(2)}%)</div>
                <div>직관형 ({nPercentage.toFixed(2)}%)</div>
              </div>

              {/* T vs F */}
              <div className={style.cylinderWrapper}>
                <span>T</span>
                <div className={style.cylinderContainer}>
                  <div
                    className={style.cylinder}
                    style={getStyle(tPercentage, fPercentage)}
                  ></div>
                </div>
                <span>F</span>
              </div>
              <div className={style.persentFlex}>
                <div>원칙주의형 ({tPercentage.toFixed(2)}%)</div>
                <div>이성적사고형 ({fPercentage.toFixed(2)}%)</div>
              </div>

              {/* J vs P */}
              <div className={style.cylinderWrapper}>
                <span>J</span>
                <div className={style.cylinderContainer}>
                  <div
                    className={style.cylinder}
                    style={getStyle(jPercentage, pPercentage)}
                  ></div>
                </div>
                <span>P</span>
              </div>
              <div className={style.persentFlex}>
                <div>계획형 ({jPercentage.toFixed(2)}%)</div>
                <div>탐색형 ({pPercentage.toFixed(2)}%)</div>
              </div>
            </S.ResultPercentages>
          </S.box1>
          <S.box2>
            <S.ResultTitle3>
              <h1>특징</h1>
            </S.ResultTitle3>
            <S.point>
              <p>{traits}</p>
            </S.point>
            <S.point>
              <div id="mbtiResult">
                <h1>추천 여행지 🚗</h1>
                <div>
                  <span>관광코스</span>
                  <span>{tour}</span>
                </div>
                <div>
                  <span>추천장소</span>
                  <span>{places}</span>
                </div>
              </div>
            </S.point>
          </S.box2>
        </S.ResultMbtibottom>
        <S.ResultButton onClick={handleExit}>테스트 다시하기</S.ResultButton>
      </S.ResultOutBox>
    </S.MbtiBody>
  );
};

export default ResultPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style/ResultPage.style";
import style from "./style/mbtiResult.module.css";

const personalityTraits = {
  ISFJ: "섬세하고 예민한 성격을 가졌어으며, 견주의 감정을 잘 파악하는 아이예요, 질투심이 많으니 질투심 유발은 금물! ",
  ENFP: "친구들에게 인기가 많으며, 관심 받는 걸 극도로 좋아하는 아이예요, 혼자 있는 걸 싫어하니 꼭 많은 시간 같이 있어주세요.",
  INTJ: "츤데레 강아지의 표본!, 자신의 좋아하는 견주의 기분만 잘 알아내요, 많이 무뚝뚝하나 정이 많은 아이예요.",
  INTP: "느긋하고 태평한 성격이에요, 혼자만의 시간이 중요하고 자신이 원할 때 뺴곤 움직이는 걸 귀찮아해요. ",
  INFJ: "점잖으며, 눈치가 빨라요! 한번 좋아하면 한 없이 잘해주는 천사견, 대담하면서도 신중한 성격이에요.",
  INFP: "견주의 말에 민감하게 반응하며, 다정다감한 사교적인 성격이에요. 마음의 상처를 잘 받으니 견주님들은 행동에 주의해주세요.",
  ISTJ: "조용하고 견주에게 헌신적인 충견입니다. 자신만의 규칙과 질서가 있고, 애교는 거의 없는 무뚝뚝견",
  ISFP: "조용하고 순둥순둥한 성격의 소유견! 이해심, 배려심이 많고 사람을 잘 따릅니다.",
  ESTJ: "진취적이며 활동적이에요, 칭찬 받는 것을 좋아하니 무한 칭찬 부탁드려요. 또한 학습능력이 뛰어나니 많은 것을 가르쳐주세요! ",
  ESFJ: "다정하며 의리가 있어요, 애교 정말 많고 새로운 사람과 강아지들을 만나는 걸 좋아해요! ",
  ENTJ: "책임감이 강한 성격이며 붙임성이 좋아 애견카페 인싸!",
  ENFJ: "새롭고 신나는 상황을 엄청 좋아해요, 감수성이 풍부해 견주님과 풍부한 감정교류가 가능해요.",
  ESTP: "너무 자유분방하여 어디로 튈지 모르는 강아지!, 자신감이 항상 넘치며 다른 강아지들과 경쟁하며 노는 것을 즐겨요!",
  ESFP: "활동적이며 말을 잘 따릅니다. 적극적이고 겁이 없는 성격이며, 낯가림이 없어 새로운 환경에선 호기심 많은 탐험가! ",
  ENTP: "정이 많고 온화하고, 호기심이 많아 다 해봐야 적성이 풀리는 말썽꾸러기",
  ISTP: "의심이 많고 경계심이 강해 새로운 사람을 싫어해요!, 독립적이며 자기주장이 강해 고집스러운 성격이지만 견주를 사랑하는 마음은 최상",
};

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

  const getStyle = (percentageA, percentageB) => {
    if (percentageA > percentageB) {
      return { width: `${percentageA}%`, backgroundColor: "#FCD11D", left: 0 };
    } else {
      return { width: `${percentageB}%`, backgroundColor: "#FCD11D", right: 0 };
    }
  };

  const traits = personalityTraits[result];

  return (
    <S.MbtiBody>
      <S.ResultOutBox>
        <S.ResultTitle>
          <h1>우리 집 강아지 {dogName}는!</h1>
        </S.ResultTitle>
        <S.ResultPic></S.ResultPic>
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
          </S.box2>
        </S.ResultMbtibottom>
        <S.ResultButton onClick={handleExit}>종료하기</S.ResultButton>
      </S.ResultOutBox>
    </S.MbtiBody>
  );
};

export default ResultPage;

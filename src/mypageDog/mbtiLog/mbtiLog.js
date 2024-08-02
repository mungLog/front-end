import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./mbtiLog.module.css";
import * as S from "../../mbti/style/DogSelectionPage.style";
import chu from "../card/img/시추.png";
import pu from "../card/img/푸들.png";
import tiz from "../card/img/말티즈.png";
import re from "./re.svg";

//코드 합치고 테스트 다시하기 루트 구현
function MbtiLog() {
  const [dogs, setDogs] = useState([]);

  const mbtiDetails = {
    ISTJ: "신중한 경비견",
    ISFJ: "헌신적인 보호자",
    INFJ: "이상적인 조언자",
    INTJ: "전략적인 분석가",
    ISTP: "냉철한 문제 해결사",
    ISFP: "온화한 예술가",
    INFP: "이상적인 드리머",
    INTP: "호기심 많은 탐구자",
    ESTP: "활동적인 모험가",
    ESFP: "사교적인 엔터테이너",
    ENFP: "열정적인 개혁가",
    ENTP: "독창적인 발명가",
    ESTJ: "결단력 있는 리더",
    ESFJ: "사려 깊은 돌봄이",
    ENFJ: "카리스마 있는 격려자",
    ENTJ: "결단력 있는 통솔자",
  };

  useEffect(() => {
    const initialDogs = [
      {
        petId: 1,
        name: "아추",
        imgUrl: chu,
        mbti: "ESTP",
      },
      {
        petId: 2,
        name: "하루",
        imgUrl: tiz,
        mbti: null,
      },
      {
        petId: 3,
        name: "밀크",
        imgUrl: pu,
        mbti: "INFP",
      },
    ];

    setDogs(initialDogs);
  }, []);
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const familyId = 1;
  // useEffect(() => {
  //   const fetchDogs = async () => {
  //     try {
  //       const response = await axios.get(`${awsIP}/pets/${familyId}`);
  //       setDogs(response.data);
  //     } catch (error) {
  //       console.error("반려견 데이터 불러오기 실패", error);
  //     }
  //   };
  //   fetchDogs();
  // }, []);

  return (
    <div id={style.mbtiLog}>
      <h1>멍BTI 기록보기</h1>
      <div id={style.mbtiFlex}>
        {dogs.map((dog, index) => (
          <S.DogMbtiLog key={dog.id}>
            <S.DogInfo>
              <S.DogImage src={dog.imgUrl} alt={dog.name} />
              <S.DogName>{dog.name}</S.DogName>
              <S.Result>{dog.mbti || "-"}</S.Result>
            </S.DogInfo>
            <div className={style.info}>{mbtiDetails[dog.mbti]}</div>
            <div className={style.re}>
              테스트 다시하기 <img src={re} alt="" />
            </div>
          </S.DogMbtiLog>
        ))}
      </div>
    </div>
  );
}

export default MbtiLog;

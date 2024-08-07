import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style/DogSelectionPage.style";
import chu from "../mypageDog/card/img/시추.png";
import tiz from "../mypageDog/card/img/말티즈.png";
import pu from "../mypageDog/card/img/푸들.png";

// 예시 강아지 데이터 (하드코딩)
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

const DogSelectionPage = ({ onSelectDog, dogs = [] }) => {
  // dogs 기본값을 빈 배열로 설정하여 오류를 방지
  const [selectedDog, setSelectedDog] = useState(null);
  const [mbtiResult, setMbtiResult] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleDogSelect = (event) => {
    setSelectedDog(event.target.value);
  };

  const handleStartClick = () => {
    if (selectedDog) {
      // 선택된 강아지와 MBTI 검사 결과를 저장하고 페이지를 변경하는 함수 호출
      onSelectDog(selectedDog);
    }
  };

  const handleRegisterClick = () => {
    navigate("/mypage?mode=dog");
  };

  return (
    <S.Page>
      <S.ContainerBig>
        <S.ChoseTitle>
          <h1>테스트를 진행할 반려동물을 선택해 주세요</h1>
        </S.ChoseTitle>
        {hardcodedDogs.length === 0 ? (
          <S.DogCardFormNone>
            <S.DogCardFormNonemessage>
              <p>등록되어 있는 반려동물이 없습니다.</p>
            </S.DogCardFormNonemessage>
            <S.StartButtonNone onClick={handleRegisterClick}>
              등록 하러가기
            </S.StartButtonNone>
          </S.DogCardFormNone>
        ) : (
          <S.DogCardForm>
            <S.DogCard>
              {hardcodedDogs.map((dog) => (
                <S.DogLabel key={dog.id}>
                  <S.DogButton
                    type="radio"
                    name="dog"
                    value={dog.name}
                    checked={dog.name === selectedDog}
                    onChange={handleDogSelect}
                  />
                  <S.DogInfo>
                    <S.DogImage src={dog.image} alt={dog.name} />
                    <S.DogName>{dog.name}</S.DogName>
                    <S.Result>{dog.mbti || "-"}</S.Result>
                  </S.DogInfo>
                </S.DogLabel>
              ))}
            </S.DogCard>
          </S.DogCardForm>
        )}
        {hardcodedDogs.length > 0 && (
          <S.StartButton onClick={handleStartClick} disabled={!selectedDog}>
            시작하기
          </S.StartButton>
        )}
      </S.ContainerBig>
    </S.Page>
  );
};

export default DogSelectionPage;

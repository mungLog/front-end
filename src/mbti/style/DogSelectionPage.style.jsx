// DogSelectionPage.styles.js
import styled from "styled-components";
import sky from "../img/sky.png";

// 강아지 선택 박스 스타일
export const Page = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${sky});
  background-position: center;
  background-repeat: no-repeat;
`;

export const ContainerBig = styled.div`
  width: 1000px;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 50px;
  border: 2px solid #ccc;
  padding: 20px;
  margin-top: 150px;
  background-color: rgba(180, 180, 180, 0.6);
`;

// 제목 박스 스타일
export const ChoseTitle = styled.div`
  width: 550px;
  height: 60px;
  background-color: white;
  border-radius: 15px;
  font-size: 30px;
  font-weight: 300;
  line-height: 2;
  margin: 0 auto;
  font-family: "Hi Melody", sans-serif;
  margin-top: 22px;
`;

// 시작 버튼 스타일
export const StartButton = styled.button`
  border-radius: 50px;
  width: 226px;
  height: 56px;
  font-weight: 800;
  border: 1px solid var(--color-blue);
  background-color: var(--color-blue);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 25px;
  transition: background-color 0.3s;
  margin-top: 30px;
  letter-spacing: -2px;
`;

// 강아지 카드 폼 스타일
export const DogCardForm = styled.div`
  display: flex;
  align-items: center; /* 카드들을 가운데 정렬 */
  gap: 20px; /* 카드 간의 간격 */
`;

// 강아지 카드 스타일
export const DogCard = styled.div`
  display: flex;
  align-items: center; /* 카드 내 요소들을 가운데 정렬 */
  margin-top: 50px;
`;

// 강아지 라벨 스타일
export const DogLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  border: 1px solid gold;
  border-radius: 42px;
  padding: 10px;
  background-color: #fff9df;
  transition: box-shadow 0.3s;
  width: 188px; /* 카드의 너비 */
  height: 270px; /* 카드의 높이 */
  margin: 20px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
export const DogMbtiLog = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  border: 1px solid gold;
  border-radius: 42px;
  padding: 36px 0 58px;
  background-color: #fff9df;
  transition: box-shadow 0.3s;
  width: 300px; /* 카드의 너비 */
  box-sizing: border-box;
  margin: 20px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// 강아지 버튼 스타일
export const DogButton = styled.input`
  margin-left: 145px;
  margin-top: 10px;
  width: 24px;
  height: 24px;

 -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px !important;
  height: 18px !important;
  border: 2px solid gold;
  background-color: white;
  border-radius: 50% !important;
  outline: none;
  cursor: pointer !important;

  &:checked {
    background-color: gold !important;
    border: 3px solid white !important;
    box-shadow: 0 0 0 1.6px gold !important;
  }
  }
  }
`;

// 강아지 이미지 스타일
export const DogImage = styled.img`
  width: 82px; /* 프로필 이미지 너비 */
  height: 82px; /* 프로필 이미지 높이 */
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover;
  margin-bottom: 20px;
`;

// 강아지 정보 스타일
export const DogInfo = styled.div`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -2px;
  color: black;
`;

// 강아지 이름 스타일
export const DogName = styled.div`
  margin-bottom: 30px;
`;

export const Result = styled.div`
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

//등록된 강아지가 없을 때
export const DogCardFormNone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 방향으로 중앙 정렬 */
  align-items: center; /* 수평 방향으로 중앙 정렬 */
`;

export const DogCardFormNonemessage = styled.div`
  margin: 200px;
  font-size: 20px;
  font-weight: 600;
`;

export const StartButtonNone = styled.button`
  border-radius: 50px;
  width: 226px;
  height: 56px;
  font-weight: 800;
  border: 1px solid var(--color-blue);
  background-color: var(--color-blue);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 25px;
  transition: background-color 0.3s;
  letter-spacing: -2px;
  display: flex;
  justify-content: center;
`;

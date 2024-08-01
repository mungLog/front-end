// QuestionPage.style.js
import styled from "styled-components";
import sky from "../img/sky.png";

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

// 질문박스 스타일
export const QContainerBig = styled.div`
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

export const QContainerSmall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: auto;
  background-color: transparent;
  height: 800px;
  padding: 30px;
`;

export const QTitlebox = styled.div`
  width: 650px;
  height: 60px;
  background-color: white;
  border-radius: 15px;
  font-size: 30px;
  font-weight: 300;
  line-height: 2;
  margin: 0 auto;
  font-family: "Hi Melody", sans-serif;
`;

export const QPic = styled.div`
  background-color: gray;
  width: 300px;
  height: 300px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;

  img {
    width: 100%; /* 이미지가 부모 컨테이너에 맞춰지도록 */
    height: auto; /* 비율 유지 */
  }
`;

// 답변박스 스타일
export const AContainerBig = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: transparent;
`;

export const AButton = styled.button`
  font-family: "Hi Melody", sans-serif;
  color: black;
  text-align: center;
  font-size: 30px;
  margin: 25px;
  width: 450px; /* 고정 너비 유지 */
  height: auto; /* 높이를 자동으로 조절 */
  min-height: 60px; /* 최소 높이 설정 */
  border-radius: 15px;
  border: 1px solid white;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px 20px; /* 내부 여백 조절 */
  box-sizing: border-box; /* padding과 border를 포함한 크기 계산 */

  /* 텍스트 넘침 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* 텍스트가 줄바꿈 되도록 설정 */

  /* 버튼의 크기 유지 및 텍스트 자동 줄바꿈 */
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;

  &:hover {
    background-color: whitesmoke;
  }
`;

export const Option = styled.div``;

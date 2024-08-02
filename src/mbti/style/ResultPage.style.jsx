import styled from "styled-components";
import sky from "../img/sky.png";

export const MbtiBody = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${sky});
  background-repeat: no-repeat;
  background-position: top; /* 배경 이미지를 중앙에 배치 */
`;

export const ResultOutBox = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 1084px;
  height: 1026px;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  flex-direction: column;
  text-align: center;
  margin-top: 90px;
`;

export const ResultTitle = styled.div`
  font-family: "Hi Melody", sans-serif;
  font-size: 35px;
  margin-top: 95px;
  margin-bottom: 40px;
`;

export const ResultPic = styled.div`
  width: 82px;
  height: 82px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

export const ResultPicImage = styled.img`
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ResultMbti = styled.div`
  font-family: "Hi Melody", sans-serif;
  font-size: 60px;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #009feb;
  margin-top: 30px;
  margin-bottom: 30px; /* 아래쪽 여백 추가 */
`;

export const Question = styled.div`
  margin-bottom: 20px;
  font-family: "Hi Melody", sans-serif;
`;

export const ResultMbtibottom = styled.div`
  display: flex;
`;

export const HeaderH1 = styled.h1`
  font-family: "Hi Melody", sans-serif;
  font-size: 2rem;
`;

export const HeaderH2 = styled.h2`
  font-family: "Hi Melody", sans-serif;
  font-size: 1.5rem;
`;

export const Result = styled.div`
  text-align: center;
  font-family: "Hi Melody", sans-serif;
  font-size: 1.2rem;

  p {
    margin-top: 20px;
  }
`;

//밑
export const ResultTitle2 = styled.div`
  font-family: "Hi Melody", sans-serif;
  font-size: 25px;
`;

export const ResultTitle3 = styled.div`
  font-family: "Hi Melody", sans-serif;
  font-size: 25px;
  margin-bottom: 3 0px;
`;

export const box1 = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  flex-direction: column;
`;

export const box2 = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  flex-direction: column;
  border-left: 4px solid #ececec; /* 테두리 두께, 스타일, 색상 조정 가능 */
`;

export const ResultPercentages = styled.div`
  width: 398px;
  height: 453px;
  margin: 30px;
  margin-right: 60px;
`;

export const point = styled.div`
  width: 400px;
  margin: 30px;
  margin-left: 60px;
  padding: 20px 30px;
  background-color: #f4f6f8;
  border-radius: 15px;
  font-family: "Hi Melody", sans-serif;
  font-size: 20px;
  box-sizing: border-box;

  /* 중앙 정렬을 위한 추가 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ResultButton = styled.button`
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
  }
`;

import styled from "styled-components";
import startImage from "../img/mbtistart.png";

export const MbtiBody = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${startImage});
  background-position: center; /* 배경 이미지를 중앙에 위치시키도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지를 반복하지 않도록 설정 */
`;

export const StartContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100vw; /* 전체 뷰포트 너비 */
  height: 100vh; /* 전체 뷰포트 높이 */
  margin-top: 470px;
  margin-right: 10px;
`;

export const StartButton = styled.button`
  border-radius: 50px;
  width: 286px;
  hright: 80px
  font-weight: 800;
  border: 1px solid var(--color-blue);
  background-color: var(--color-blue);
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s;
  letter-spacing: -1px;
  &:hover {
    background-color: #0056b3;
  }
`;

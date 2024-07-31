import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

// 전체 페이지
export const background = styled.div`
  background-color: dodgerblue;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Page = styled.div`
  width: 960px;
  height: 628px;
  background-color: gold;
  border-radius: 19px;
  display: flex;
  align-items: center;
`;

// 내용 랩
export const ContentWrap = styled.div`
  width: 446px;
  height: 556px;
  border-radius: 19px;
  background: linear-gradient(
    -43.98deg,
    rgba(255, 255, 255, 0.04) 129.79%,
    rgba(255, 255, 255, 0.04) 129.79%
  );
  box-shadow: 0px 0px 12.600000381469727px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

// 입력 제목
export const InputTitle = styled.div`
  font-size: 20px;
  font-weight: 1000;
  color: ${(props) => (props.error ? "red" : "#000000")}; // 에러 시 빨간색
  margin-bottom: 15px;
  margin-top: 20px;
`;

// 큰 입력 랩
export const InputWrapBig = styled.div`
  width: 360px;
  height: 50px;
  border-radius: 48px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// 아이디 입력 박스
export const InputWrapId = styled.div`
  width: 360px;
  height: 50px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 48px;
`;

// 공통 입력 스타일
export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  color: gray;
  font-weight: 500;
`;

// 가입 버튼
export const LoginButton = styled.button`
  width: 360px;
  height: 50px;
  border-radius: 48px;
  border: 1px solid dodgerblue;
  background-color: dodgerblue;
  margin-top: 40px;
  font-size: 16px;
  color: white;
`;

export const formlink = styled.div`
  display: flex;
  margin-top: 15px;
  color: white;
`;

export const Link = styled(RouterLink)`
  color: ${(props) => props.color || "#ffffff"};
`;

export const linkright = styled.div`
  margin-left: 100px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
`;

export const message1 = styled.div`
  color: white;
  display: flex;
  font-size: 25px;
  font-weight: 900;
  padding-top: 110px;
  letter-spacing: -1px;
  margin-right: 25px;
`;

export const message2 = styled.div`
  color: white;
  font-size: 25px;
  padding-top: 30px;
  padding-bottom: 40px;
  font-weight: 900;
  margin-right: 155px;
  letter-spacing: -1px;
`;

export const messagedog = styled.div`
  color: dodgerblue;
  font-size: 25px;
  margin-left: 5px;
  font-weight: 900;
  letter-spacing: -1px;
`;

export const Pic = styled.img`
  width: 480px;
  height: 628px;
`;

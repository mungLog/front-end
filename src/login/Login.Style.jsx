import styled from "styled-components";

// 전체 페이지
export const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 150px;
`;

// 내용 랩
export const ContentWrap = styled.div`
  background-color: white;
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
  width: 100%;
  height: 45px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

// 아이디 입력 박스
export const InputWrapId = styled.div`
  width: 100%;
  height: 45px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
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
  width: 100%;
  height: 45px;
  border: 1px solid gold;
  background-color: gold;
  margin-top: 40px;
  font-size: 13px;
  font-weight: 1000;
  color: #000000;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 5px;
`;

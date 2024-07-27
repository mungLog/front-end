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

// 제목 랩
export const TitleWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 1000;
  color: #000000;
  display: flex;
  justify-content: center;
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

// 전화번호 박스
export const PhoneBox = styled.div`
  display: flex;
  font-size: larger;
  color: gray;
  align-items: center;
`;

// 아이디 입력 박스
export const InputWrapIdBox = styled.div`
  display: flex;
  font-size: larger;
  color: gray;
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
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 95%;
  height: 95%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  color: gray;
`;

// 전화번호 입력 박스 (첫번째, 중간, 마지막)
export const InputWrapPhoneNumberFirst = styled.div`
  width: 100px;
  height: 45px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  font-size: 17px;
  color: gray;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const InputWrapPhoneNumberMiddle = styled.div`
  width: 165px;
  height: 45px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  font-size: 17px;
  color: gray;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const InputWrapPhoneNumberLast = styled.div`
  width: 165px;
  height: 45px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  font-size: 17px;
  color: gray;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

// 전화번호 버튼
export const TelButton = styled.button`
  width: 110px;
  height: 47px;
  border: 1px solid gold;
  background-color: gold;
  margin-left: 25px;
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

// 하이픈
export const Hyphen = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  font-size: large;
  font-weight: 1000;
  margin-top: 8px;
`;

// 가입 버튼
export const OkayButton = styled.button`
  width: 100%;
  height: 45px;
  border: 1px solid gold;
  background-color: gold;
  margin-top: 40px;
  font-size: 13px;
  font-weight: 1000;
  color: #000000;
`;

// 에러 메시지
export const ErrorMessageWrap = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 5px;
`;

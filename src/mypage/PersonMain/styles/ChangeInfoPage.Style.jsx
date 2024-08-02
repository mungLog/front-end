import styled from "styled-components";

// 전체 페이지
export const Page = styled.div``;

// 내용 랩
export const ContentWrap = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center;
`;

// 제목 랩
export const TitleWrap = styled.div`
  margin-bottom: 15px;
  margin-top: 50px;
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
  width: 552px;
  height: 50px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

// 이메일 박스
export const EmailBox = styled.div`
  display: flex;
  font-size: larger;
  color: gray;
  align-items: center;
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
  width: 394px;
  height: 50px;
  border: 1px solid;
  border-color: ${({ error, success }) => {
    if (error) return "red";
    if (success) return "blue";
    return "gainsboro";
  }};
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

// 이메일 입력 박스
export const InputWrapEmail = styled.div`
  width: 307px;
  height: 50px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const InputWrapEmail2 = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid ${(props) => (props.error ? "red" : "gainsboro")}; // 에러 시 빨간색
  background-color: whitesmoke;
`;

// '@' 기호
export const AtSign = styled.div`
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 8px;
  font-size: large;
  font-weight: 1000;
  color: ${(props) => (props.error ? "red" : "black")}; // 에러 시 빨간색
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
  width: 120px;
  height: 50px;
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
  width: 177px;
  height: 50px;
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
  width: 177px;
  height: 50px;
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

// 닉네임 공간
export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const InputTitleName = styled.div`
  font-size: 20px;
  font-weight: 1000;
  color: ${(props) => (props.error ? "red" : "#000000")}; // 에러 시 빨간색
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const NameWarning = styled.div`
  font-size: 10px;
  color: gray;
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
export const ChangeButton = styled.button`
  width: 552px;
  height: 50px;
  border: 1px solid gold;
  background-color: gold;
  margin-top: 40px;
  margin-bottom: 50px;
  font-size: 13px;
  font-weight: 1000;
  color: #000000;
`;

export const label = styled.label`
  margin-left: 10px;
`;

// 에러 메시지
export const ErrorMessageWrap = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 5px;
`;

export const InputTitleID = styled.div`
  font-size: 20px;
  font-weight: 1000;
  margin-bottom: 15px;
  margin-top: 20px;
  ${({ error, success }) =>
    error ? "color: red;" : success ? "color: blue;" : ""};
`;

export const IdButton = styled.button`
  width: 148px;
  height: 50px;
  margin-left: 10px;
  border: 1px solid gold;
  background-color: gold;
`;
export const NoUpdate = styled.div`
  width: 394px;
  height: 50px;
  line-height: 50px;
`;

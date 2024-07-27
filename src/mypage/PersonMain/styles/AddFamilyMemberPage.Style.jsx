import styled from "styled-components";

// 전체 페이지
export const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: auto;
  height: 80vh;
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  background-color: yellow;
`;

// 내용 랩
export const ContentWrap = styled.div`
  background-color: white;
  margin-top: 10px;
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

export const Content = styled.div`
  background-color: white;
`;

// 날짜, 이름, 수락여부
export const Titleform = styled.div`
  display: flex;
  margin: 35px 10px 0px 10px;
  border-bottom: 3px solid gray;
`;

export const date = styled.div`
  border: none;
  height: 70px;
  width: 130px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const name = styled.div`
  border: none;
  height: 70px;
  width: 130px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const empty = styled.div`
  border: none;
  height: 70px;
  width: 390px;
`;

export const request = styled.div`
  border: none;
  height: 70px;
  width: 230px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

// 날짜, 이름, 수락여부 데이터 칸
export const dataform = styled.div`
  display: flex;
  margin: 0px 10px 0px 10px;
  border-bottom: 1px solid gray;
`;

export const datadate = styled.div`
  border: none;
  height: 90px;
  width: 130px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const dataname = styled.div`
  border: none;
  height: 90px;
  width: 130px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const datamessage = styled.div`
  border: none;
  height: 90px;
  width: 390px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const datarequest = styled.div`
  border: none;
  height: 90px;
  width: 230px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Status = styled.div`
  font-size: 18px;
  color: ${({ status }) => (status === "accepted" ? "green" : "red")};
`;

export const nodataform = styled.div`
  display: flex;
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  margin: 0px 10px 0px 10px;
  border-bottom: 1px solid gray;
  height: 250px;
  width: 880px;
  text-align: center; // 텍스트 가운데 정렬
  font-size: 16px; // 텍스트 크기 설정
`;

export const personform = styled.div`
  display: flex;
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  margin: 0px 10px 0px 10px;
  border-bottom: 1px solid gray;
  height: 500px;
  width: 880px;
`;

export const div = styled.div`
  display: flex;
`;

export const user = styled.div``;

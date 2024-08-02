import styled from "styled-components";

// 전체 페이지
export const Page = styled.div``;

// 내용 랩
export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center;
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
  border-bottom: 3px solid #cbcbcb;
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
  border-bottom: 2px solid #e7e7e7;
`;

export const datadate = styled.div`
  border: none;
  height: 90px;
  width: 130px;
  font-weight: 500;
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
  font-weight: 500;
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
  font-weight: 500;
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

export const ButtonOkay = styled.button`
  height: 34px;
  width: 100px;
  border: none;
  background-color: #fcd11d;
  color: black;
  font-size: 16px;
  cursor: pointer;
  marginr-right: 10px;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-blue);
    color: white;
  }
`;

export const ButtonNo = styled.button`
  height: 34px;
  width: 100px;
  border: none;
  background-color: #f4f6f8;
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-blue);
    color: white;
  }
`;

export const emptybox = styled.div`
  border-bottom: 1px solid #e7e7e7;
  height: 75px;
  width: 658px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 한 줄에 두 개의 컬럼
  gap: 40px;
  max-width: 880px;
  width: 100%;
`;

export const ProfileIconWrapper = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 10px;
  font-size: 24px; /* 아이콘 크기 조정 */
  width: 56px;
  height: 56px;
  border-radius: 56%;
  background-color: white;
  text-align: center;
  line-height: 56px;
`;

export const User = styled.div`
  background-color: #f4f6f8;
  width: 400px; // 그리드 아이템이 그리드 셀의 너비를 가득 채우도록
  height: 166px;
  margin: 30px 0; // 세로 마진만 추가
  border-radius: 20px;
  display: flex;
`;

export const pic = styled.div`
  height: 56px;
  width: 56px;
`;

export const UserName = styled.div`
  padding-top: 50px;
  font-weight: bold;
  font-size: 20px;
`;

export const UserNickname = styled.div``;

export const NoUser = styled.div`
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

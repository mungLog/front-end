import styled from "styled-components";
import play from "../img/play.png";
import food from "../img/food.png";

// 전체 페이지
export const Page = styled.div``;

// 내용 랩
export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleWrap = styled.div`
  margin-top: 90px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 1000;
  color: #000000;
  display: flex;
  justify-content: center;
`;

export const TitleWrap2 = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  padding-left: 40px;
`;

export const box = styled.div`
  border-top: 2px solid #e7e7e7;
  border-bottom: 2px solid #e7e7e7;
  height: 150px;
  width: 960px;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 50px;
`;

export const pic = styled.div`
  height: 104px;
  width: 104px;
  background-image: url(${play});
  margin-left: 10px;
  border-radius: 5px;
  background-size: cover;
`;

export const pic2 = styled.div`
  height: 104px;
  width: 104px;
  background-image: url(${food});
  margin-left: 10px;
  border-radius: 5px;
  background-size: cover;
`;

export const product = styled.div`
  height: 104px;
  width: 500px;
  margin-left: 20px;
  margin-right: 40px;
`;

export const name = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`;

export const kategorie = styled.div`
  color: gainsboro;
`;

export const price = styled.div`
  height: 104px;
  padding-top: 200px;
  padding-left: 210px;
  font-size: 15px;
  font-weight: 500;
`;

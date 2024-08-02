import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 1000;
  color: #000000;
  display: flex;
  justify-content: center;
`;

export const InputWrapPic = styled.div`
  margin-bottom: 40px;
  display: flex;
`;

export const ContentWrap = styled.form`
  width: 652px;
  height: 400px;
  display: flex;
  flex-direction: column; /* 요소들을 세로로 배치 */
`;

export const BoxForm = styled.div`
  display: flex;
`;

export const BoxBig = styled.div`
  width: 552px;
  height: 50px;
  background-color: #f7f8fb;
  border: 1px solid gainsboro;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 10px;
`;

export const Box = styled.div`
  width: 211px;
  height: 50px;
  background-color: #f7f8fb;
  border: 1px solid gainsboro;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 10px;
`;

export const Box2 = styled.div`
  width: 250px;
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

export const InputWrap = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 1000;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  color: gray;
  font-weight: 500;
  font-size: 15px;
`;

export const RadioInput = styled.input`
  display: flex;
  align-items: center;
  margin: 0 10px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px !important;
  height: 15px !important;
  border: 2px solid #ccc !important;
  background-color: whitesmoke !important;
  border-radius: 50% !important;
  outline: none;
  cursor: pointer !important;

  &:checked {
    background-color: gold !important;
    border: 3px solid white !important;
    box-shadow: 0 0 0 1.6px gold !important;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  color: gray;
  font-weight: 500;
  font-size: 15px;
`;

export const Button = styled.button`
  width: 652px;
  height: 50px;
  border: 1px solid gold;
  background-color: gold;
  margin-top: 40px;
  font-weight: 1000;
  color: #000000;
  font-size: 17px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center; /* 라디오 버튼과 텍스트 수직 정렬 */
  margin-right: 20px; /* 라디오 버튼과 텍스트 사이에 여백 */
`;

export const FileInput = styled.input`
  /* 파일 입력 필드 스타일 */
`;

export const male = styled.div`
  color: dodgerblue;
  font-weight: 1000;
  font-size: 25px;
  margin-left: 10px;
`;

export const female = styled.div`
  color: gold;
  font-weight: 1000;
  font-size: 25px;
  margin-left: 10px;
`;

export const ImagePreview = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover; /* 이미지의 비율을 유지하면서 컨테이너에 맞게 크기 조정 */
  border: 1px solid #ddd; /* 이미지 주위에 경계선 추가 (선택 사항) */
  margin-top: 8px; /* 이미지와 파일 입력 사이에 여백 추가 */
  border-radius: 100px;
  margin-left: 115px;
`;

export const Button2 = styled.button`
  display: flex;
  align-items: center;
  color: gold;
  font-weight: bold; /* 텍스트 두께 */
  gap: 10px; /* 아이콘과 텍스트 사이의 간격 */
  border: none; /* 기본 테두리 제거 */
  font-size: 16px; /* 텍스트 크기 */
  background-color: transparent; /* 아이콘 크기 조정 */
  margin-left: 15px;
  img {
    width: 20px; /* 아이콘의 너비 */
    height: 20px; /* 아이콘의 높이 */
  }
`;

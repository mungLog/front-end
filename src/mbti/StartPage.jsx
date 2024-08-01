import React from "react";
import * as S from "./style/StartPage.style";

const StartPage = ({ onStart }) => (
  <S.MbtiBody>
    <S.StartContainer>
      <S.StartButton onClick={onStart}>테스트 시작하기</S.StartButton>
    </S.StartContainer>
  </S.MbtiBody>
);

export default StartPage;

import React from "react";
import * as S from "./style/QuestionPage.style";
import a from "./img/1.png";
import b from "./img/2.png";
import c from "./img/3.png";
import d from "./img/4.png";
import e from "./img/5.png";
import f from "./img/6.png";
import g from "./img/7.png";
import h from "./img/8.png";
import i from "./img/9.png";
import j from "./img/10.png";
import k from "./img/11.png";
import l from "./img/12.png";

// 질문 ID에 따른 이미지 URL 매핑
const imageMappings = {
  1: a,
  2: b,
  3: c,
  4: d,
  5: e,
  6: f,
  7: g,
  8: h,
  9: i,
  10: j,
  11: k,
  12: l,
};

const QuestionPage = ({ question, options, onAnswer }) => {
  // 질문 ID에 따라 이미지 URL 선택
  const imageUrl = imageMappings[question.id] || ""; // 기본값은 빈 문자열

  return (
    <S.Page>
      <S.QContainerBig>
        <S.QContainerSmall>
          <S.QTitlebox>
            <h2>{question.text}</h2>
          </S.QTitlebox>
          <S.QPic>
            {imageUrl && <img src={imageUrl} alt="Question" />}{" "}
            {/* 이미지 렌더링 */}
          </S.QPic>
        </S.QContainerSmall>
        <S.AContainerBig>
          {options.map((option, index) => (
            <S.Option key={index}>
              <S.AButton onClick={() => onAnswer(option)}>
                {option.text}
              </S.AButton>
            </S.Option>
          ))}
        </S.AContainerBig>
      </S.QContainerBig>
    </S.Page>
  );
};

export default QuestionPage;

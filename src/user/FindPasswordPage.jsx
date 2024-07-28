import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 임포트
import * as S from "./style/FindPasswordPage.Style";

export default function FindPasswordPage() {
  // 상태 정의
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate(); // useNavigate hook

  // 정규 표현식
  const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;

  // 핸들러
  const handleNameBlur = () => {
    if (!name.trim()) setNameError("필수 입력 사항입니다.");
    else setNameError("");
  };

  const handleIdBlur = () => {
    if (!id.trim()) setIdError("필수 입력 사항입니다.");
    else if (!regId.test(id)) {
      setIdError(
        "아이디: 영문으로 시작하는 5~20자 길이의 영문자, 숫자를 사용해주세요."
      );
    } else {
      setIdError("");
    }
  };

  const handlePhoneMiddleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    if (value.length <= 4) {
      setPhoneMiddle(value);
      validatePhone(value, phoneLast);
    }
  };

  const handlePhoneLastChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    if (value.length <= 4) {
      setPhoneLast(value);
      validatePhone(phoneMiddle, value);
    }
  };

  const validatePhone = (middle, last) => {
    if (middle.length !== 4 || last.length !== 4) {
      setPhoneError(
        "전화번호의 중간 4자리와 마지막 4자리를 모두 입력해 주세요."
      );
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePhone(phoneMiddle, phoneLast); // 폼 제출 시 전화번호 검증

    if (!nameError && !idError && !phoneError) {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/findpw",
          {
            // axios로 요청
            userid: id,
            username: name,
            phone: `${phonePrefix}-${phoneMiddle}-${phoneLast}`,
          }
        );

        // 성공적으로 응답을 받은 경우
        if (response.data.message) {
          alert(response.data.message);
          navigate("/login"); // 로그인 페이지로 이동
        } else {
          alert("비밀번호 찾기에 실패했습니다.");
        }
      } catch (error) {
        console.error("비밀번호 찾기 요청 실패:", error);
        alert("비밀번호 찾기 요청이 실패했습니다.");
      }
    } else {
      alert("모든 필드를 올바르게 입력해 주세요.");
    }
  };

  return (
    <S.Page>
      <S.TitleWrap>비밀번호 찾기</S.TitleWrap>

      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력*/}
          <S.InputTitle error={!!nameError}>이름</S.InputTitle>
          <S.InputWrapBig error={!!nameError}>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
            />
          </S.InputWrapBig>
          {nameError && <S.ErrorMessageWrap>{nameError}</S.ErrorMessageWrap>}

          {/* 아이디 입력*/}
          <S.InputTitle error={!!idError}>아이디</S.InputTitle>
          <S.InputWrapId error={!!idError}>
            <S.Input
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
              onBlur={handleIdBlur}
            />
          </S.InputWrapId>
          {idError && <S.ErrorMessageWrap>{idError}</S.ErrorMessageWrap>}

          {/* 전화번호 입력*/}
          <S.InputTitle error={!!phoneError}>전화번호</S.InputTitle>
          <S.PhoneBox>
            <S.InputWrapPhoneNumberFirst error={!!phoneError}>
              <S.Select
                name="phoneNumberSelect"
                id="phoneNumber"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
              >
                <option value="010">010</option>
              </S.Select>
            </S.InputWrapPhoneNumberFirst>
            <S.Hyphen>-</S.Hyphen>
            <S.InputWrapPhoneNumberMiddle error={!!phoneError}>
              <S.Input
                type="text"
                value={phoneMiddle}
                onChange={handlePhoneMiddleChange}
                maxLength="4"
              />
            </S.InputWrapPhoneNumberMiddle>
            <S.Hyphen>-</S.Hyphen>
            <S.InputWrapPhoneNumberLast error={!!phoneError}>
              <S.Input
                type="text"
                value={phoneLast}
                onChange={handlePhoneLastChange}
                maxLength="4"
              />
            </S.InputWrapPhoneNumberLast>
          </S.PhoneBox>
          {phoneError && <S.ErrorMessageWrap>{phoneError}</S.ErrorMessageWrap>}

          {/* 확인버튼*/}
          <S.OkayButton type="submit">확인</S.OkayButton>
        </form>
      </S.ContentWrap>
    </S.Page>
  );
}

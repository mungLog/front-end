import React, { useState } from "react";
import "./css/FindPasswordPage.css";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;

  const handleNameBlur = () => {
    if (!name.trim()) {
      setNameError("필수 입력 사항입니다.");
    } else {
      setNameError("");
    }
  };

  const handleIdBlur = () => {
    if (!id.trim()) {
      setIdError("필수 입력 사항입니다.");
    } else if (!regId.test(id)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePhone(phoneMiddle, phoneLast); // 폼 제출 시 전화번호 검증

    // 모든 검증이 통과한 경우에만 폼 제출 처리
    if (!nameError && !idError && !phoneError) {
      // 여기에서 폼 데이터를 제출하는 로직을 추가하세요.
      alert("비밀번호가 전송되었습니다.");
    } else {
      alert("모든 필드를 올바르게 입력해 주세요.");
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">비밀번호 찾기</div>

      <div className="contentWrap">
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
          <div className={`inputTitle ${nameError ? "errorTitle" : ""}`}>
            이름
          </div>
          <div className={`inputWrapBig ${nameError ? "errorForm" : ""}`}>
            <input
              className="input"
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
            />
          </div>
          {nameError && <div className="errorMessageWrap">{nameError}</div>}

          {/* 아이디 입력 */}
          <div className={`inputTitle ${idError ? "errorTitle" : ""}`}>
            아이디
          </div>
          <div className="inputWrapIdBox">
            <div className={`inputWrapId ${idError ? "errorForm" : ""}`}>
              <input
                className="input"
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={handleIdBlur}
              />
            </div>
            <button className="idButton" type="button">
              아이디 중복확인
            </button>
          </div>
          {idError && <div className="errorMessageWrap">{idError}</div>}

          {/* 전화번호 입력 */}
          <div className="inputTitle">전화번호</div>
          <div className="phoneBox">
            <div
              className={`inputWrapPhoneNumberFirst ${
                phoneError ? "errorForm" : ""
              }`}
            >
              <select
                name="phoneNumberSelect"
                id="phoneNumber"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
              >
                <option value="010">010</option>
                {/* 다른 전화번호 선택 옵션 추가 가능 */}
              </select>
            </div>
            <div className="hypen">-</div>
            <div
              className={`inputWrapPhoneNumberMiddle ${
                phoneError ? "errorForm" : ""
              }`}
            >
              <input
                className="input"
                type="text"
                value={phoneMiddle}
                onChange={handlePhoneMiddleChange}
                maxLength="4"
              />
            </div>
            <div className="hypen">-</div>
            <div
              className={`inputWrapPhoneNumberLast ${
                phoneError ? "errorForm" : ""
              }`}
            >
              <input
                className="input"
                type="text"
                value={phoneLast}
                onChange={handlePhoneLastChange}
                maxLength="4"
              />
            </div>
            <button className="telButton" type="button">
              인증번호 받기
            </button>
          </div>
          {phoneError && <div className="errorMessageWrap">{phoneError}</div>}

          {/* 비빌번호 찾기 버튼 */}
          <input className="FindPasswordButton" type="submit" value="확인" />
        </form>
      </div>
    </div>
  );
}

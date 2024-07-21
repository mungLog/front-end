import React, { useState } from "react";
import "./css/ChangeInfoPage.css";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;
  const regPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

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

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setPasswordError("필수 입력 사항입니다.");
    } else if (!regPass.test(password)) {
      setPasswordError(
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm !== password) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim() || !emailDomain) {
      setEmailError("필수 입력 사항입니다.");
    } else if (!/\S+@\S+\.\S+/.test(email + "@" + emailDomain)) {
      setEmailError("유효하지 않은 이메일 주소입니다.");
    } else {
      setEmailError("");
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

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePhone(phoneMiddle, phoneLast); // 폼 제출 시 전화번호 검증

    // 모든 검증이 통과한 경우에만 폼 제출 처리
    if (
      !nameError &&
      !idError &&
      !passwordError &&
      !passwordConfirmError &&
      !emailError &&
      !phoneError
    ) {
      // 여기에서 폼 데이터를 제출하는 로직을 추가하세요.
      alert("회원가입이 완료되었습니다!");
    } else {
      alert("모든 필드를 올바르게 입력해 주세요.");
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">회원정보 수정</div>

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

          {/* 비밀번호 입력 */}
          <div className={`inputTitle ${passwordError ? "errorTitle" : ""}`}>
            비밀번호
          </div>
          <div className={`inputWrapBig ${passwordError ? "errorForm" : ""}`}>
            <input
              className="input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
          </div>
          {passwordError && (
            <div className="errorMessageWrap">{passwordError}</div>
          )}

          {/* 비밀번호 확인 입력 */}
          <div
            className={`inputTitle ${passwordConfirmError ? "errorTitle" : ""}`}
          >
            비밀번호 확인
          </div>
          <div
            className={`inputWrapBig ${
              passwordConfirmError ? "errorForm" : ""
            }`}
          >
            <input
              className="input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={handlePasswordConfirmBlur}
            />
          </div>
          {passwordConfirmError && (
            <div className="errorMessageWrap">{passwordConfirmError}</div>
          )}

          {/* 이메일 입력 */}
          <div className={`inputTitle ${emailError ? "errorTitle" : ""}`}>
            이메일
          </div>
          <div className="emailBox">
            <div className={`inputWrapEmail ${emailError ? "errorForm" : ""}`}>
              <input
                className="EmailInputBox"
                type="text"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
            </div>
            <div className={`atSign ${emailError ? "errorTitle" : ""}`}>@</div>
            <div className={`inputWrapEmail2 ${emailError ? "errorForm" : ""}`}>
              <select
                name="emailSelect"
                id="email"
                value={emailDomain}
                onChange={handleEmailDomainChange}
              >
                <option value="">선택해 주세요.</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                {/* 필요 시 다른 도메인 추가 */}
              </select>
            </div>
          </div>
          {emailError && <div className="errorMessageWrap">{emailError}</div>}

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

          {/* 수정 버튼 */}
          <input className="changeButton" type="submit" value="수정완료" />
        </form>
      </div>
    </div>
  );
}

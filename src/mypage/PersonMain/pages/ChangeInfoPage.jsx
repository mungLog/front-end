import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 임포트
import * as S from "../styles/ChangeInfoPage.Style";

export default function ChangeInfoPage() {
  // 상태 정의
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate(); // useNavigate hook

  // 정규 표현식
  const regPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  useEffect(() => {
    // Function to fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/user/info"); // 사용자 정보 요청
        const { name, id, email, phone } = response.data;
        setName(name);
        setId(id);
        setEmail(email.split("@")[0]);
        setEmailDomain(email.split("@")[1]);
        setPhonePrefix(phone.substring(0, 3));
        setPhoneMiddle(phone.substring(3, 7));
        setPhoneLast(phone.substring(7));
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handlePasswordBlur = () => {
    if (!password.trim()) setPasswordError("필수 입력 사항입니다.");
    else if (!regPass.test(password)) {
      setPasswordError(
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm !== password)
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    else setPasswordConfirmError("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePhone(phoneMiddle, phoneLast); // 폼 제출 시 전화번호 검증

    if (!passwordError && !passwordConfirmError && !emailError && !phoneError) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/update/${id}`,
          {
            userid: id,
            password,
            username: name,
            phone: `${phonePrefix}${phoneMiddle}${phoneLast}`,
            email: `${email}@${emailDomain}`,
          }
        );

        if (response.status === 200) {
          alert("회원정보 수정이 완료되었습니다!");
          navigate("/login"); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          alert("정보 수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("정보 수정 요청 실패:", error);
        alert("정보 수정 요청이 실패했습니다.");
      }
    } else {
      alert("모든 필드를 올바르게 입력해 주세요.");
    }
  };

  return (
    <S.Page>
      <S.TitleWrap>회원정보 수정</S.TitleWrap>

      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력*/}
          <S.InputTitle>이름</S.InputTitle>
          <S.InputWrapBig>
            <S.Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled // 이름 필드 수정 불가
            />
          </S.InputWrapBig>

          {/* 아이디 입력*/}
          <S.InputTitle>아이디</S.InputTitle>

          <S.InputWrapId>
            <S.Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled // 아이디 필드 수정 불가
            />
          </S.InputWrapId>

          {/* 비밀번호 입력*/}
          <S.InputTitle error={!!passwordError}>비밀번호</S.InputTitle>
          <S.InputWrapBig error={!!passwordError}>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
          </S.InputWrapBig>
          {passwordError && (
            <S.ErrorMessageWrap>{passwordError}</S.ErrorMessageWrap>
          )}

          {/* 비밀번호 확인*/}
          <S.InputTitle error={!!passwordConfirmError}>
            비밀번호 확인
          </S.InputTitle>
          <S.InputWrapBig error={!!passwordConfirmError}>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={handlePasswordConfirmBlur}
            />
          </S.InputWrapBig>
          {passwordConfirmError && (
            <S.ErrorMessageWrap>{passwordConfirmError}</S.ErrorMessageWrap>
          )}

          {/* 이메일 입력*/}
          <S.InputTitle error={!!emailError}>이메일</S.InputTitle>
          <S.EmailBox>
            <S.InputWrapEmail error={!!emailError}>
              <S.Input
                type="text"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
            </S.InputWrapEmail>
            <S.AtSign error={!!emailError}>@</S.AtSign>
            <S.InputWrapEmail2 error={!!emailError}>
              <S.Select
                value={emailDomain}
                onChange={handleEmailDomainChange}
                error={!!emailError}
              >
                <option value="">선택해 주세요.</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
              </S.Select>
            </S.InputWrapEmail2>
          </S.EmailBox>
          {emailError && <S.ErrorMessageWrap>{emailError}</S.ErrorMessageWrap>}

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

          {/* 수정 버튼 */}
          <S.JoinButton type="submit">수정하기</S.JoinButton>
        </form>
      </S.ContentWrap>
    </S.Page>
  );
}

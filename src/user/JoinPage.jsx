import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./style/JoinPage.Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Join() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [nickname, setNickname] = useState("");
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [isFamilyRepresentative, setIsFamilyRepresentative] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [idCheckStatus, setIdCheckStatus] = useState("");

  const navigate = useNavigate();

  const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;
  const regPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

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

  //아이디 중복확인 axios
  const handleIdCheck = async () => {
    if (id.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/idCheck/${id}`
        );
        if (response.data.isAvailable) {
          setIdCheckMessage("사용 가능한 아이디입니다.");
          setIdCheckStatus("available");
        } else {
          setIdCheckMessage("이미 사용 중인 아이디입니다.");
          setIdCheckStatus("unavailable");
        }
      } catch (error) {
        console.error("중복 확인 요청 실패:", error);
        setIdCheckMessage("중복 확인 요청이 실패했습니다.");
        setIdCheckStatus("unavailable");
      }
    }
  };

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
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPhoneMiddle(value);
      validatePhone(value, phoneLast);
    }
  };

  const handlePhoneLastChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
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

  const handleSearchClick = async () => {
    if (searchId.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/search/${searchId}`
        );
        if (response.data.user) {
          setSearchedUser(response.data.user);
          setSearchError("");
        } else {
          setSearchedUser(null);
          setSearchError("해당 아이디를 가진 사용자를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("검색 요청 실패:", error);
        setSearchError("검색 요청이 실패했습니다.");
      }
    } else {
      setSearchError("아이디를 입력해 주세요.");
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleNicknameBlur = () => {
    if (!nickname.trim()) setNicknameError("필수 입력 사항입니다.");
    else setNicknameError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePhone(phoneMiddle, phoneLast);

    if (
      !nameError &&
      !idError &&
      !passwordError &&
      !passwordConfirmError &&
      !emailError &&
      !phoneError &&
      !searchError &&
      !nicknameError &&
      isFamilyRepresentative !== null
    ) {
      if (isFamilyRepresentative === false && !searchedUser) {
        alert("가족대표가 아닌 경우, 검색된 사용자를 선택해야 합니다.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/register", {
          userid: id,
          password: password,
          username: name,
          phone: `${phonePrefix}${phoneMiddle}${phoneLast}`,
          email: `${email}@${emailDomain}`,
          nickname: nickname,
          Roles: isFamilyRepresentative,
        });
        if (response.data.message === "회원가입 성공") {
          alert("회원가입이 완료되었습니다!");
          navigate("/login");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("회원가입 요청 실패:", error);
        alert("회원가입 요청이 실패했습니다.");
      }
    }
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setIsFamilyRepresentative(
      value === "1" ? true : value === "0" ? false : null
    );
    if (value === "0") {
      setSearchedUser(null);
      setSearchId("");
    }
  };

  return (
    <S.Page>
      <S.TitleWrap>회원정보 수정</S.TitleWrap>
      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
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

          {/* 아이디 입력 */}
          <S.InputTitleID
            error={!!idError || idCheckStatus === "unavailable"}
            success={idCheckStatus === "available"}
          >
            아이디
          </S.InputTitleID>
          <S.InputWrapIdBox>
            <S.InputWrapId
              error={!!idError || idCheckStatus === "unavailable"}
              success={idCheckStatus === "available"}
            >
              <S.Input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={handleIdBlur}
              />
            </S.InputWrapId>
            <S.IdButton type="button" onClick={handleIdCheck}>
              아이디 중복확인
            </S.IdButton>
          </S.InputWrapIdBox>
          {idError && <S.ErrorMessageWrap>{idError}</S.ErrorMessageWrap>}
          {idCheckMessage && (
            <S.ErrorMessageWrap success={idCheckStatus === "available"}>
              {idCheckMessage}
            </S.ErrorMessageWrap>
          )}

          {/* 비밀번호 입력 */}
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

          {/* 이메일 입력 */}
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

          {/* 전화번호 입력 */}
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

          {/* 닉네임 입력 */}
          <S.InputTitle error={!!nicknameError}>닉네임</S.InputTitle>
          <S.InputWrapBig error={!!nicknameError}>
            <S.Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={handleNicknameBlur}
            />
          </S.InputWrapBig>
          {nicknameError && (
            <S.ErrorMessageWrap>{nicknameError}</S.ErrorMessageWrap>
          )}

          {/* 가족대표여부 */}
          <S.InputTitle>가족대표 여부</S.InputTitle>
          <S.RadioButtonBox>
            <S.RadioButtonDiv>
              <S.RadioInput
                type="radio"
                id="yes"
                name="option"
                value="1"
                onChange={handleRadioChange}
              />
              <S.Label htmlFor="yes">예</S.Label>
            </S.RadioButtonDiv>
            <S.RadioButtonDiv>
              <S.RadioInput
                type="radio"
                id="no"
                name="option"
                value="0"
                onChange={handleRadioChange}
              />
              <S.Label htmlFor="no">아니오</S.Label>
            </S.RadioButtonDiv>
          </S.RadioButtonBox>

          {/* 가족대표 아이디 검색 */}
          {isFamilyRepresentative === false && (
            <>
              <S.InputTitle>아이디 검색</S.InputTitle>
              <S.InputWrapBig>
                <S.Input
                  className="input"
                  type="text"
                  placeholder="아이디 검색하기"
                  value={searchId}
                  onChange={handleSearchInputChange}
                />
                <S.SearchIconWrapper onClick={handleSearchClick}>
                  <FontAwesomeIcon icon={faSearch} />
                </S.SearchIconWrapper>
              </S.InputWrapBig>
              {searchError && (
                <S.ErrorMessageWrap>{searchError}</S.ErrorMessageWrap>
              )}
              {searchedUser && (
                <>
                  <S.InputWrapId>
                    <S.Input type="text" value={searchedUser.name} disabled />
                  </S.InputWrapId>
                </>
              )}
            </>
          )}

          {/* 회원가입 버튼 */}
          <S.JoinButton type="submit">회원가입하기</S.JoinButton>

          {/* 로그인 링크 이동 */}
          <S.HaveIdBox>
            <div>이미 아이디가 있으신가요?</div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <S.LoginLink>로그인</S.LoginLink>
            </Link>
          </S.HaveIdBox>
        </form>
      </S.ContentWrap>
    </S.Page>
  );
}

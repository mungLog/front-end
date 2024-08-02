import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/ChangeInfoPage.Style";
import { useAuth } from "../../../header/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProfile() {
  // 상태 정의
  const [formState, setFormState] = useState({
    name: "",
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    emailDomain: "",
    phonePrefix: "010",
    phoneMiddle: "",
    phoneLast: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [idCheckStatus, setIdCheckStatus] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useAuth();

  const regPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const awsIP = process.env.REACT_APP_BACKEND_URL;

  // 입력 필드 검증 함수
  const validateFields = () => {
    const {
      name,
      id,
      password,
      passwordConfirm,
      email,
      emailDomain,
      phoneMiddle,
      phoneLast,
    } = formState;
    const newErrors = {};

    if (!password.trim())
      newErrors.password = "비밀번호는 필수 입력 사항입니다.";
    else if (!regPass.test(password))
      newErrors.password =
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함해야 합니다.";

    if (passwordConfirm && password !== passwordConfirm)
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

    if (!email.trim() || !emailDomain)
      newErrors.email = "필수 입력 사항입니다.";
    else if (!/\S+@\S+\.\S+/.test(`${email}@${emailDomain}`))
      newErrors.email = "유효하지 않은 이메일 주소입니다.";

    if (phoneMiddle.length !== 4 || phoneLast.length !== 4)
      newErrors.phone =
        "전화번호의 중간 4자리와 마지막 4자리를 모두 입력해 주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 전화번호 필드 변경 처리
  const handlePhoneChange = (key, value) => {
    const cleanedValue = value.replace(/\D/g, "");
    setFormState((prevState) => ({ ...prevState, [key]: cleanedValue }));
    validatePhone(formState.phoneMiddle, formState.phoneLast);
  };

  const validatePhone = (middle, last) => {
    if (middle.length !== 4 || last.length !== 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "전화번호의 중간 4자리와 마지막 4자리를 모두 입력해 주세요.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        setLoading(true);
        const response = await axios.put(
          `${awsIP}/user/update/${state.user.id}`,
          {
            userid: state.user.userid,
            password: formState.password,
            username: state.user.username,
            phone: `${formState.phonePrefix}${formState.phoneMiddle}${formState.phoneLast}`,
            email: `${formState.email}@${formState.emailDomain}`,
          },
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("정보 수정 요청 실패:", error);
        alert("정보 수정 요청이 실패했습니다.");
      }
    } else {
      alert("입력된 정보가 유효하지 않습니다.");
    }
  };
  console.log(state);
  return (
    <S.Page>
      <S.TitleWrap>회원정보 수정</S.TitleWrap>
      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
          <S.InputTitle>이름</S.InputTitle>
          <S.NoUpdate>{state.user.username}</S.NoUpdate>
          {/* 아이디 입력 */}
          <S.InputTitleID>아이디</S.InputTitleID>
          <S.NoUpdate>{state.user.userid}</S.NoUpdate>

          {/* 비밀번호 입력 */}
          <S.InputTitle error={!!errors.password}>비밀번호</S.InputTitle>
          <S.InputWrapBig error={!!errors.password}>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={formState.password}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              onBlur={() =>
                !formState.password.trim() &&
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "비밀번호는 필수 입력 사항입니다.",
                }))
              }
            />
          </S.InputWrapBig>
          {errors.password && (
            <S.ErrorMessageWrap>{errors.password}</S.ErrorMessageWrap>
          )}

          {/* 비밀번호 확인 입력 */}
          <S.InputTitle error={!!errors.passwordConfirm}>
            비밀번호 확인
          </S.InputTitle>
          <S.InputWrapBig error={!!errors.passwordConfirm}>
            <S.Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={formState.passwordConfirm}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  passwordConfirm: e.target.value,
                }))
              }
              onBlur={() =>
                formState.passwordConfirm !== formState.password &&
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  passwordConfirm: "비밀번호가 일치하지 않습니다.",
                }))
              }
            />
          </S.InputWrapBig>
          {errors.passwordConfirm && (
            <S.ErrorMessageWrap>{errors.passwordConfirm}</S.ErrorMessageWrap>
          )}

          {/* 이메일 입력 */}
          <S.InputTitle error={!!errors.email}>이메일</S.InputTitle>
          <S.EmailBox>
            <S.InputWrapEmail error={!!errors.email}>
              <S.Input
                type="text"
                placeholder="이메일을 입력해주세요."
                value={formState.email}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                onBlur={() =>
                  !/\S+@\S+\.\S+/.test(
                    `${formState.email}@${formState.emailDomain}`
                  ) &&
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "유효하지 않은 이메일 주소입니다.",
                  }))
                }
              />
            </S.InputWrapEmail>
            <S.AtSign error={!!errors.email}>@</S.AtSign>
            <S.InputWrapEmail2 error={!!errors.email}>
              <S.Select
                value={formState.emailDomain}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    emailDomain: e.target.value,
                  }))
                }
                error={!!errors.email}
              >
                <option value="">선택해 주세요.</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
              </S.Select>
            </S.InputWrapEmail2>
          </S.EmailBox>
          {errors.email && (
            <S.ErrorMessageWrap>{errors.email}</S.ErrorMessageWrap>
          )}

          {/* 전화번호 입력 */}
          <S.InputTitle error={!!errors.phone}>전화번호</S.InputTitle>
          <S.PhoneBox>
            <S.InputWrapPhoneNumberFirst error={!!errors.phone}>
              <S.Select
                name="phoneNumberSelect"
                id="phoneNumber"
                value={formState.phonePrefix}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    phonePrefix: e.target.value,
                  }))
                }
              >
                <option value="010">010</option>
              </S.Select>
            </S.InputWrapPhoneNumberFirst>
            <S.Hyphen>-</S.Hyphen>
            <S.InputWrapPhoneNumberMiddle error={!!errors.phone}>
              <S.Input
                type="text"
                value={formState.phoneMiddle}
                onChange={(e) =>
                  handlePhoneChange("phoneMiddle", e.target.value)
                }
                maxLength="4"
              />
            </S.InputWrapPhoneNumberMiddle>
            <S.Hyphen>-</S.Hyphen>
            <S.InputWrapPhoneNumberLast error={!!errors.phone}>
              <S.Input
                type="text"
                value={formState.phoneLast}
                onChange={(e) => handlePhoneChange("phoneLast", e.target.value)}
                maxLength="4"
              />
            </S.InputWrapPhoneNumberLast>
          </S.PhoneBox>
          {errors.phone && (
            <S.ErrorMessageWrap>{errors.phone}</S.ErrorMessageWrap>
          )}

          {/* 수정 완료 버튼 */}
          <S.ChangeButton type="submit">수정 완료</S.ChangeButton>
        </form>
      </S.ContentWrap>
    </S.Page>
  );
}

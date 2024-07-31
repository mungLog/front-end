import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "../styles/ChangeInfoPage.Style";

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

  const navigate = useNavigate();

  const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/;
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

    if (!name.trim()) newErrors.name = "필수 입력 사항입니다.";
    if (!id.trim()) newErrors.id = "필수 입력 사항입니다.";
    else if (!regId.test(id))
      newErrors.id =
        "아이디: 영문으로 시작하는 5~20자 길이의 영문자, 숫자를 사용해주세요.";

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

  // 초기 데이터 로딩 (예: 사용자 정보 조회)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${awsIP}/user/profile`);
        setFormState({
          name: response.data.name,
          id: response.data.id,
          email: response.data.email.split("@")[0],
          emailDomain: response.data.email.split("@")[1],
          phonePrefix: response.data.phone.substring(0, 3),
          phoneMiddle: response.data.phone.substring(3, 7),
          phoneLast: response.data.phone.substring(7),
        });
      } catch (error) {
        console.error("정보 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [awsIP]);

  // 아이디 중복 확인
  const handleIdCheck = async () => {
    if (formState.id.trim()) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${awsIP}/user/idCheck/${formState.id}`
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
      } finally {
        setLoading(false);
      }
    }
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        setLoading(true);
        const response = await axios.put(`${awsIP}/user/profile`, {
          userid: formState.id,
          password: formState.password,
          username: formState.name,
          phone: `${formState.phonePrefix}${formState.phoneMiddle}${formState.phoneLast}`,
          email: `${formState.email}@${formState.emailDomain}`,
        });
        if (response.data.message === "정보 수정 성공") {
          alert("정보 수정이 완료되었습니다!");
          navigate("/profile"); // 수정 후 리디렉션
        } else {
          alert("정보 수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("정보 수정 요청 실패:", error);
        alert("정보 수정 요청이 실패했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("입력된 정보가 유효하지 않거나 아이디가 중복되었습니다.");
    }
  };

  return (
    <S.Page>
      <S.TitleWrap>회원정보 수정</S.TitleWrap>
      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
          <S.InputTitle error={!!errors.name}>이름</S.InputTitle>
          <S.InputWrapBig error={!!errors.name}>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={formState.name}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              onBlur={() =>
                !formState.name.trim() &&
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: "필수 입력 사항입니다.",
                }))
              }
            />
          </S.InputWrapBig>
          {errors.name && (
            <S.ErrorMessageWrap>{errors.name}</S.ErrorMessageWrap>
          )}

          {/* 아이디 입력 */}
          <S.InputTitleID
            error={!!errors.id || idCheckStatus === "unavailable"}
            success={idCheckStatus === "available"}
          >
            아이디
          </S.InputTitleID>
          <S.InputWrapIdBox>
            <S.InputWrapId
              error={!!errors.id || idCheckStatus === "unavailable"}
              success={idCheckStatus === "available"}
            >
              <S.Input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={formState.id}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    id: e.target.value,
                  }))
                }
                onBlur={() =>
                  !regId.test(formState.id) &&
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    id: "아이디: 영문으로 시작하는 5~20자 길이의 영문자, 숫자를 사용해주세요.",
                  }))
                }
              />
            </S.InputWrapId>
            <S.IdButton type="button" onClick={handleIdCheck}>
              아이디 중복확인
            </S.IdButton>
          </S.InputWrapIdBox>
          {errors.id && <S.ErrorMessageWrap>{errors.id}</S.ErrorMessageWrap>}
          {idCheckMessage && (
            <S.ErrorMessageWrap success={idCheckStatus === "available"}>
              {idCheckMessage}
            </S.ErrorMessageWrap>
          )}

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

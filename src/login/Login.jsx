import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./Login.Style";
import api from "./api";

const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;
const regPass =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export default function LoginPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [useridError, setUseridError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleUseridBlur = () => {
    if (!userid.trim()) {
      setUseridError("아이디는 필수 입력 사항입니다.");
    } else if (!regId.test(userid)) {
      setUseridError(
        "아이디: 영문으로 시작하며, 5~20자 길이의 영문자, 숫자를 사용해주세요."
      );
    } else {
      setUseridError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setPasswordError("비밀번호는 필수 입력 사항입니다.");
    } else if (!regPass.test(password)) {
      setPasswordError(
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userid.trim()) {
      setUseridError("아이디는 필수 입력 사항입니다.");
    } else if (!password.trim()) {
      setPasswordError("비밀번호는 필수 입력 사항입니다.");
    } else if (!regId.test(userid)) {
      setUseridError(
        "아이디: 영문으로 시작하며, 5~20자 길이의 영문자, 숫자로 구성되어있습니다."
      );
    } else if (!regPass.test(password)) {
      setPasswordError(
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함되어 있습니다."
      );
    } else {
      try {
        const response = await api.post("/login", { userid, password }); // Request

        if (response.status === 200) {
          alert("로그인 성공!");
          navigate("/"); // 로그인 후 리디렉션
        } else {
          alert("로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error("로그인 요청 실패:", error);
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <S.Page>
      <S.ContentWrap>
        <form onSubmit={handleSubmit}>
          <S.InputWrapId error={!!useridError}>
            <S.Input
              type="text"
              placeholder="아이디"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              onBlur={handleUseridBlur}
            />
          </S.InputWrapId>
          {useridError && <S.ErrorMessage>{useridError}</S.ErrorMessage>}

          <S.InputWrapBig error={!!passwordError}>
            <S.Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
          </S.InputWrapBig>
          {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}

          <S.LoginButton type="submit">로그인</S.LoginButton>
        </form>
        <Link to="/findidpage">아이디 찾기</Link> <br />
        <Link to="/findpasswordpage">비밀번호 찾기</Link> <br />
        <Link to="/join">회원가입</Link>
      </S.ContentWrap>
    </S.Page>
  );
}

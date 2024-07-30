// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import * as S from "./Login.Style";

const regId = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{5,20}$/g;
const regPass =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export default function LoginPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [useridError, setUseridError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { refreshUser } = useUser(); // UserContext에서 refreshUser 함수 가져오기

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

    // 초기화 오류 메시지
    setUseridError("");
    setPasswordError("");

    // 유효성 검사
    if (!userid.trim()) {
      setUseridError("아이디는 필수 입력 사항입니다.");
    } else if (!regId.test(userid)) {
      setUseridError(
        "아이디: 영문으로 시작하며, 5~20자 길이의 영문자, 숫자를 사용해주세요."
      );
    } else if (!password.trim()) {
      setPasswordError("비밀번호는 필수 입력 사항입니다.");
    } else if (!regPass.test(password)) {
      setPasswordError(
        "비밀번호: 8~16자 길이의 영문자, 숫자 및 특수문자를 포함해야 합니다."
      );
    } else {
      try {
        const response = await axios.post("http://localhost:8080/login", {
          userid,
          password,
        });

        if (response.status === 200) {
          alert("로그인 성공!");
          await refreshUser(); // 로그인 후 사용자 정보 새로고침
          navigate("/"); // 로그인 후 리디렉션
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("로그인 요청 실패:", error);
        alert("로그인에 실패했습니다. 서버 오류가 발생했습니다.");
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
import React, { useEffect } from "react";
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";
import style from "./mypage.module.css";
import { useAuth } from "../header/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Mypage() {
  const { state } = useAuth();
  const [selectMode, setSelectMode] = React.useState("person");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 체크를 주석 처리하여 로그인 없이 접근 가능하게 함
    /*
    if (!state.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    */

    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    if (mode === "dog") {
      setSelectMode("dog");
    } else {
      setSelectMode("person");
    }
  }, [location.search, navigate, state.isAuthenticated]);

  // 로그인 상태 체크를 주석 처리하여 로그인 없이 접근 가능하게 함
  /*
  if (!state.isAuthenticated || !state.user) {
    return null;
  }
  */

  return (
    <div id={style.maxWidth}>
      <div id={style.mypageTop}>
        <h1 id={style.title}>마이페이지</h1>
        <div id={style.buttonWrap}>
          <button
            onClick={() => setSelectMode("person")}
            className={selectMode === "person" ? style.selected : ""}
          >
            {state.user ? state.user.nickname : "사용자 이름"}
          </button>
          <button
            onClick={() => setSelectMode("dog")}
            className={selectMode === "dog" ? style.selected : ""}
          >
            멍멍
          </button>
        </div>
      </div>
      <div>
        {selectMode === "person" && state.user && (
          <PersonMain userInfo={state.user} />
        )}
        {selectMode === "dog" && <DogMain />}
      </div>
    </div>
  );
}

export default Mypage;

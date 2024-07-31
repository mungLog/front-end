import React, { useEffect } from "react";
import { useUser } from "../context/UserContext"; // UserContext 훅을 import
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";
import style from "./mypage.module.css";
import { useAuth } from "../header/AuthContext";
import { useLocation } from "react-router-dom";

function Mypage() {
  const { state } = useAuth();
  const [selectMode, setSelectMode] = React.useState("person");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    if (mode === "dog") {
      setSelectMode("dog");
    } else {
      setSelectMode("person");
    }
  }, [location.search]);

  return (
    <div id={style.maxWidth}>
      <div id={style.mypageTop}>
        <h1 id={style.title}>마이페이지</h1>
        <div id={style.buttonWrap}>
          <button
            onClick={() => setSelectMode("person")}
            className={selectMode === "person" ? style.selected : ""}
          >
            {state.user.nickname}
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
        {selectMode === "person" && <PersonMain userInfo={state.user} />}
        {selectMode === "dog" && <DogMain />}
      </div>
    </div>
  );
}

export default Mypage;

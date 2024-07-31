import React from "react";
import { useUser } from "../context/UserContext"; // UserContext 훅을 import
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";
import style from "./mypage.module.css";

function Mypage() {
  const { user } = useUser(); // UserContext에서 user 정보 가져오기
  const [selectMode, setSelectMode] = React.useState("person");

  return (
    <div id={style.maxWidth}>
      <div id={style.mypageTop}>
        <h1 id={style.title}>마이페이지</h1>
        <div id={style.buttonWrap}>
          {/* 나중에 닉네임 받아오는걸로 바꾸기 */}
          <button
            onClick={() => setSelectMode("person")}
            className={selectMode === "person" ? style.selected : ""}
          >
            {user ? user.nickname : "닉네임"}{" "}
            {/* UserContext에서 가져온 nickname 사용 */}
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
        {selectMode === "person" && <PersonMain />}
        {selectMode === "dog" && <DogMain />}
      </div>
    </div>
  );
}

export default Mypage;

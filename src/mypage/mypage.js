import React, { useState } from "react";
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";
import style from "./mypage.module.css";

function MyPage() {
  const [selectMode, setSelectMode] = useState("person");

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
            닉네임
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

export default MyPage;

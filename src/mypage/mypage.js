// src/mypage/Mypage.js
import React from "react";
import { useUser } from "../context/UserContext"; // UserContext 훅을 import
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";

function Mypage() {
  const { user } = useUser(); // UserContext에서 user 정보 가져오기
  const [selectMode, setSelectMode] = React.useState("person");

  return (
    <div>
      <h1>마이페이지</h1>
      <div>
        <button onClick={() => setSelectMode("person")}>
          {user ? user.nickname : "닉네임"}{" "}
          {/* UserContext에서 가져온 nickname 사용 */}
        </button>
        <button onClick={() => setSelectMode("dog")}>멍멍</button>
      </div>
      <div>
        {selectMode === "person" && <PersonMain userInfo={user} />}
        {selectMode === "dog" && <DogMain />}
      </div>
    </div>
  );
}

export default Mypage;

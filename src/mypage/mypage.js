import React, { useState } from "react";
import PersonMain from "./PersonMain/person";
import DogMain from "./DogMain/dog";

function MyPage() {
  const [selectMode, setSelectMode] = useState("person");

  return (
    <div>
      <h1>마이페이지</h1>
      <div>
        <button onClick={() => setSelectMode("person")}>닉네임</button>
        <button onClick={() => setSelectMode("dog")}>멍멍</button>
      </div>
      <div>
        {selectMode === "person" && <PersonMain />}
        {selectMode === "dog" && <DogMain />}
      </div>
    </div>
  );
}

export default MyPage;

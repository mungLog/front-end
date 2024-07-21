import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./../../mypageDog/card/card";

function DogMain() {
  const [selectDogpage, setSelectDogpage] = useState("check");

  return (
    <>
      <div>
        <button onClick={() => setSelectDogpage("check")}>
          열량체크/기록일지
        </button>
        <button onClick={() => setSelectDogpage("plus")}>일정 추가</button>
        <button onClick={() => setSelectDogpage("mbti")}>멍BIT 기록보기</button>
        <Link>로그아웃</Link>
      </div>
      {selectDogpage === "check" && <Card />}
      {selectDogpage === "plus" && <Card />}
      {selectDogpage === "mbti" && <Card />}
    </>
  );
}

export default DogMain;

import React from "react";
import { useUser } from "../context/UserContext"; // UserContext 훅을 import
import "./main.css";

function Main() {
  const { user } = useUser(); // UserContext에서 user 정보 가져오기

  return <>메인</>;
}

export default Main;

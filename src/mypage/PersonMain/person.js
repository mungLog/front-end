import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 통해 API 호출
import * as S from "./person.style";
import { useAuth } from "../../header/AuthContext";
import ChangeInfoPage from "./pages/ChangeInfoPage";
import AddFamilyMember from "./pages/AddFamilyMemberPage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";

function PersonMain() {
  const [selectedButton, setSelectedButton] = useState("changeInfo");
  const navigate = useNavigate();
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const { state, dispatch } = useAuth();

  useEffect(() => {
    if (!state.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }

    setSelectedButton("changeInfo");
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  return (
    <S.Container>
      <S.LeftPanel>
        <S.Button onClick={() => handleButtonClick("changeInfo")}>
          회원정보 수정
        </S.Button>
        <S.Button onClick={() => handleButtonClick("addFamily")}>
          가족구성원 정보/추가
        </S.Button>
        <S.Button onClick={() => handleButtonClick("purchaseHistory")}>
          구매내역
        </S.Button>
        <S.logoutButton onClick={handleLogout}>로그아웃</S.logoutButton>
      </S.LeftPanel>
      <S.RightPanel>
        {selectedButton === "changeInfo" && <ChangeInfoPage />}
        {selectedButton === "addFamily" && <AddFamilyMember />}
        {selectedButton === "purchaseHistory" && <PurchaseHistoryPage />}
      </S.RightPanel>
    </S.Container>
  );
}

export default PersonMain;

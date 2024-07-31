import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 통해 API 호출
import * as S from "./person.style";

function PersonMain() {
  const [selectedButton, setSelectedButton] = useState("changeInfo");
  const navigate = useNavigate();
  const awsIP = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setSelectedButton("changeInfo");
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${awsIP}/user/logout`);
      alert("로그아웃되었습니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <S.Container>
      <S.LeftPanel>
        <Link
          to="changeinfopage"
          onClick={() => handleButtonClick("changeInfo")}
        >
          <S.Button selected={selectedButton === "changeInfo"}>
            회원정보 수정
          </S.Button>
        </Link>
        <Link
          to="addfamilymember"
          onClick={() => handleButtonClick("addFamily")}
        >
          <S.Button selected={selectedButton === "addFamily"}>
            가족구성원 정보/추가
          </S.Button>
        </Link>
        <Link
          to="purchasehistory"
          onClick={() => handleButtonClick("purchaseHistory")}
        >
          <S.Button selected={selectedButton === "purchaseHistory"}>
            구매내역
          </S.Button>
        </Link>
        {/* 로그아웃 버튼 추가 */}
        <S.logoutButton onClick={handleLogout}>로그아웃</S.logoutButton>
      </S.LeftPanel>
      <S.RightPanel>
        <Outlet /> {/* 자식 컴포넌트들이 이 위치에 렌더링됩니다 */}
      </S.RightPanel>
    </S.Container>
  );
}

export default PersonMain;

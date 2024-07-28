import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function PersonMain() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 로그아웃 요청을 서버로 전송
      await axios.post("http://localhost:8080/logout");
      // 클라이언트 측 세션 데이터 삭제 (필요시)
      // 예: localStorage.removeItem("userToken");

      // 로그아웃 성공 시 로그인 페이지 이동
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <>
      <div>
        <Link to="changeinfopage">
          <button>회원정보 수정</button>
        </Link>
        <Link to="addfamilymember">
          <button>가족구성원 정보/추가</button>
        </Link>
        <Link to="purchasehistory">
          <button>구매내역</button>
        </Link>
        {/* 임시 */}
        <Link to="adddog">
          <button>강아지등록</button>
        </Link>

        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div>
        <Outlet /> {/* 자식 컴포넌트들이 이 위치에 렌더링됩니다 */}
      </div>
    </>
  );
}

export default PersonMain;

import React from "react";
import { Link, Outlet } from "react-router-dom";

function PersonMain() {
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
      </div>
      <div>
        <Outlet /> {/* 자식 컴포넌트들이 이 위치에 렌더링됩니다 */}
      </div>
    </>
  );
}

export default PersonMain;

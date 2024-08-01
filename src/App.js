import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./header/AuthContext";
import { UserProvider } from "./context/UserContext";
import "./reset.css";

import Main from "./main/main";
import Shop from "./shop/shop";
import Card from "./mypageDog/card/card";
import CommunityList from "./board/listPost";
import CommunityDetail from "./board/detailPost";
import CommunityWrite from "./board/writePost";
import Header from "./header/header";
import HeaderMain from "./header/headerMain";
import Mypage from "./mypage/mypage";
import ChangeInfo from "./mypage/PersonMain/pages/ChangeInfoPage";
import AddFamilyMember from "./mypage/PersonMain/pages/AddFamilyMemberPage";
import PurchaseHistory from "./mypage/PersonMain/pages/PurchaseHistoryPage";
import MbtiPage from "./mbti/mbtiPage";
import JoinPage from "./user/JoinPage.jsx";
import FindIdPage from "./user/FindIdPage";
import FindPasswordPage from "./user/FindPasswordPage";
import AddDog from "./mypageDog/addDog"; // 임시 강아지 등록 페이지
import DogSelectionPage from "./mbti/DogSelectionPage"; // 추가된 강아지 선택 페이지
import ResultPage from "./mbti/ResultPage"; // 추가된 결과 페이지
import LoginPage from "./login/Login";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <UserProvider>
        <div id="app">
          {location.pathname === "/" ? <HeaderMain /> : <Header />}
          <div>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/mypage" element={<Mypage />}>
                <Route path="changeinfopage" element={<ChangeInfo />} />
                <Route path="addfamilymember" element={<AddFamilyMember />} />
                <Route path="purchasehistory" element={<PurchaseHistory />} />
                {/*임시*/}
              </Route>
              <Route path="/adddog" element={<AddDog />} />
              <Route path="/mbti" element={<MbtiPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/findidpage" element={<FindIdPage />} />
              <Route path="/findpasswordpage" element={<FindPasswordPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/card" element={<Card />} />
              <Route path="/community" element={<CommunityList />} />
              <Route path="/community/write" element={<CommunityWrite />} />
              <Route
                path="/community/posts/:postId"
                element={<CommunityDetail />}
              />
              <Route path="/dog-selection" element={<DogSelectionPage />} />{" "}
              {/* 추가된 경로 */}
              <Route path="/result" element={<ResultPage />} />{" "}
              {/* 추가된 경로 */}
            </Routes>
          </div>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

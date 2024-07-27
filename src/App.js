import "./reset.css";
import { Route, Routes } from "react-router-dom";
import Main from "./main/main";
// import Shop from "./shop/shop";
// import Card from "./mypageDog/card/card";
// import CommunityList from "./board/listPost";
// import CommunityDetail from "./board/detailPost";
// import CommunityWrite from "./board/writePost";
import Header from "./header/header";
import Mypage from "./mypage/mypage";
import ChangeInfo from "./mypage/PersonMain/pages/ChangeInfoPage";
import AddFamilyMember from "./mypage/PersonMain/pages/AddFamilyMemberPage";
import PurchaseHistory from "./mypage/PersonMain/pages/PurchaseHistoryPage";
import MbtiPage from "./mbti/mbtiPage";
import Login from "./login/Login";
import JoinPage from "./user/JoinPage";
import FindIdPage from "./user/FindIdPage";
import FindPasswordPage from "./user/FindPasswordPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/shop" element={<Shop />} />
        <Route path="/card" element={<Card />} />
        <Route path="/community" element={<CommunityList />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/posts/:postId" element={<CommunityDetail />} /> */}
        <Route path="/mypage" element={<Mypage />}>
          <Route path="changeinfopage" element={<ChangeInfo />} />
          <Route path="addfamilymember" element={<AddFamilyMember />} />
          <Route path="purchasehistory" element={<PurchaseHistory />} />
        </Route>
        <Route path="/mbti" element={<MbtiPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/findidpage" element={<FindIdPage />} />
        <Route path="/findpasswordpage" element={<FindPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;

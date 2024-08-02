import React from "react";
import style from "./main.module.css";
import main from "./main.png";
import mainBtn from "./mainBtn.svg";
import shopBtn from "./shopBtn.svg";
import commuBtn from "./commuBtn.svg";
import dog1 from "./dog1.png";
import dog2 from "./dog2.png";
import { Link } from "react-router-dom";
import food1 from "../shop/img/food/1.png";
import food2 from "../shop/img/food/2.png";
import food3 from "../shop/img/food/3.png";
import ad from "./advertise.png";

function Main() {
  const products = [
    { image: food1, name: "ROYAL CANIN", price: "30,500", ctg: "간식" },
    { image: food2, name: "ROYAL CANIN POODLE", price: "39,900", ctg: "간식" },
    { image: food3, name: "잘먹잘싸", price: "19,800", ctg: "간식" },
  ];
  const community = [
    {
      image: dog1,
      ctg: "수다방",
      title: "꽃을 물어왔어요:)",
      content:
        "이번 주말에 같이 공원에 나들이 갔는데 달려가더니 꽃을 물고 웃으면서 뛰어오더라고요. 너무 귀여워서 사진 공유해요.",
      date: "2024.07.31",
    },
    {
      image: dog2,
      ctg: "정보 공유해요",
      title: "서울시 애견 동반 카페 정보 나눠요.",
      content:
        "제가 좋아하는 곳 몇군데 정보 남깁니다! 다른 좋은 곳들 댓글로 부탁드려요!!",
      date: "2024.07.31",
    },
  ];
  return (
    <div id={style.backgroundWhite}>
      <div id={style.mainCenter}>
        <img src={main} alt="메인이미지" id={style.mainImg} />
        <h1>
          우리 강아지의
          <br /> 하루를 기록해 보세요!
        </h1>
        <Link to="/mypage?mode=dog">
          <img src={mainBtn} alt="마이페이지 이동" />
        </Link>
      </div>
      <div className={style.contentWrap}>
        <div className={style.product}>
          <div>
            <h2>
              7월 가장 많이 사랑받은
              <br />
              상품이에요!
            </h2>
            <Link to="/shop" id={style.shopBtn}>
              <img src={shopBtn} alt="상점버튼" />
            </Link>
          </div>
          <div id={style.prdFlex}>
            {products.map((product, index) => (
              <div className={style.card} key={index}>
                <img src={product.image} alt="상품" />
                <div className={style.name}>
                  <div className={style.title}>{product.name}</div>
                  <div className={style.ctg}>{product.ctg}</div>
                  <div className={style.price}>{product.price}원</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/shop" id={style.ad}>
          <img src={ad} alt="광고배너" />
        </Link>
      </div>
      <div id={style.commu}>
        <div className={style.contentWrap}>
          <h2>멍뮤니티 게시판</h2>
          <h3>다양한 카테고리의 게시물을 공유해 보세요!</h3>
          <div id={style.commuBtn}>
            <Link to="/community">
              <img src={commuBtn} alt="커뮤니티 버튼" />
            </Link>
          </div>
          <div className={style.commuDetail}>
            {community.map((content, index) => (
              <div className={style.commu} key={index}>
                <div>
                  <div className={style.titleFlex}>
                    <div className={style.ctg}>{content.ctg}</div>
                    <div className={style.title}>{content.title}</div>
                  </div>
                  <div className={style.content}>{content.content}</div>
                  <div className={style.date}>{content.date}</div>
                </div>
                <img src={content.image} alt="게시글 이미지" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

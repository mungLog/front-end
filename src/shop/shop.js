import React, { useState } from "react";
import style from "./shop.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import food1 from "./img/food/1.png";
import food2 from "./img/food/2.png";
import food3 from "./img/food/3.png";
import food4 from "./img/food/4.png";
import toy1 from "./img/toy/1.png";
import toy2 from "./img/toy/2.png";
import toy3 from "./img/toy/3.png";
import toy4 from "./img/toy/4.png";
import snack1 from "./img/snack/1.png";
import snack2 from "./img/snack/2.png";
import snack3 from "./img/snack/3.png";
import snack4 from "./img/snack/4.png";
import vitamin1 from "./img/vitamin/1.png";
import vitamin2 from "./img/vitamin/2.png";
import vitamin3 from "./img/vitamin/3.png";
import vitamin4 from "./img/vitamin/4.png";
import living1 from "./img/living/1.png";
import living2 from "./img/living/2.png";
import living3 from "./img/living/3.png";
import living4 from "./img/living/4.png";

function Shop() {
  const productList = [
    { image: food1, name: "ROYAL CANIN", price: "30,500", ctg: "사료" },
    { image: food2, name: "ROYAL CANIN POODLE", price: "39,900", ctg: "사료" },
    { image: food3, name: "잘먹잘싸", price: "19,800", ctg: "사료" },
    { image: food4, name: "건강백서 포메라니언", price: "28,900", ctg: "사료" },

    {
      image: vitamin1,
      name: "닥터바이 브레스 호흡기",
      price: "38,000",
      ctg: "영양제",
    },
    { image: vitamin2, name: "오메가3", price: "29,000", ctg: "영양제" },
    {
      image: vitamin3,
      name: "닥터바이 조인트",
      price: "42,000",
      ctg: "영양제",
    },
    {
      image: vitamin4,
      name: "보호리 바이탈Q 뉴트리냠냠 강아지 기관지 심장 영양제 협착증 기침 150g",
      price: "31,000",
      ctg: "영양제",
    },

    {
      image: toy1,
      name: "콩 클래식 강아지 장난감",
      price: "15,000",
      ctg: "장난감",
    },
    { image: toy2, name: "노즈워크 무밭", price: "25,000", ctg: "장난감" },
    { image: toy3, name: "노즈워크북", price: "12,000", ctg: "장난감" },
    { image: toy4, name: "나나오토슨", price: "36,000", ctg: "장난감" },

    { image: snack1, name: "육포 비프야채 300g", price: "15,000", ctg: "간식" },
    { image: snack2, name: "연어트릿", price: "35,000", ctg: "간식" },
    { image: snack3, name: "말랑 큐브 소고기", price: "42,000", ctg: "간식" },
    {
      image: snack4,
      name: "영양쑥쑥 면역력 강화",
      price: "26,000",
      ctg: "간식",
    },

    {
      image: living1,
      name: "볼빨간 곰돌이 쿨매트",
      price: "12,800",
      ctg: "리빙",
    },
    {
      image: living2,
      name: "댕댕이 발자국 하우스",
      price: "42,000",
      ctg: "리빙",
    },
    {
      image: living3,
      name: "리빙 하우스 인디핑크",
      price: "32,000",
      ctg: "리빙",
    },
    {
      image: living4,
      name: "커브형 강아지 계단",
      price: "43,000",
      ctg: "리빙",
    },
  ];

  const [selectedCtg, setSelectedCtg] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // 페이지당 상품 수

  // 페이지 변경 함수
  const handlePageChange = (page, totalPages) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 필터링 및 페이지네이션 처리 함수
  const filterAndPaginateProducts = () => {
    let filteredProducts = productList;
    if (selectedCtg !== "전체") {
      filteredProducts = productList.filter(
        (product) => product.ctg === selectedCtg
      );
    }
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return {
      products: filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
      totalPages: totalPages,
    };
  };

  const { products, totalPages } = filterAndPaginateProducts();
  const ctgList = ["전체", "간식", "사료", "장난감", "영양제", "리빙"];
  return (
    <div id={style.backgroundWhite}>
      <div className={style.productWrapper}>
        <div id={style.shopBtn}>
          {ctgList.map((ctg) => (
            <button
              key={ctg}
              onClick={() => {
                setSelectedCtg(ctg);
                setCurrentPage(1);
              }}
              className={`${selectedCtg === ctg ? style.selected : ""}`}
            >
              {ctg}
            </button>
          ))}
        </div>
        <div className={style.columns}>
          {products.map((product, index) => (
            <div className={style.card} key={index}>
              <div className={style.cardImg}>
                <img src={product.image} alt="상품" />
              </div>
              <div className={style.name}>
                <div className={style.title}>{product.name}</div>
                <div className={style.ctg}>{product.ctg}</div>
                <div className={style.price}>{product.price}원</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id={style.productFoot}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => handlePageChange(currentPage - 1, totalPages)}
          disabled={currentPage === 1}
          className={style.icon}
        />

        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`${style.box} ${
              currentPage === index + 1 ? style.active : ""
            }`}
            onClick={() => handlePageChange(index + 1, totalPages)}
          >
            {index + 1}
          </div>
        ))}

        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => handlePageChange(currentPage + 1, totalPages)}
          disabled={currentPage === totalPages}
          className={style.icon}
        />
      </div>
    </div>
  );
}

export default Shop;

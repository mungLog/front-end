import React, { useState } from "react";
import style from "./shop.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import img from "./img/1.png";

function Shop() {
  const shJproducts = [
    { image: img, name: "간식1", price: "300", ctg: "간식" },
    { image: img, name: "사료1", price: "300", ctg: "사료" },
    { image: img, name: "장난감1", price: "300", ctg: "장난감" },
    { image: img, name: "영양제1", price: "300", ctg: "영양제" },
    { image: img, name: "리빙1", price: "300", ctg: "리빙" },
    { image: img, name: "간식2", price: "300", ctg: "간식" },
    { image: img, name: "사료2", price: "300", ctg: "사료" },
    { image: img, name: "장난감2", price: "300", ctg: "장난감" },
    { image: img, name: "영양제2", price: "300", ctg: "영양제" },
    { image: img, name: "리빙2", price: "300", ctg: "리빙" },
    { image: img, name: "간식3", price: "300", ctg: "간식" },
    { image: img, name: "사료3", price: "300", ctg: "사료" },
    { image: img, name: "장난감3", price: "300", ctg: "장난감" },
    { image: img, name: "영양제3", price: "300", ctg: "영양제" },
    { image: img, name: "리빙3", price: "300", ctg: "리빙" },
    { image: img, name: "간식4", price: "300", ctg: "간식" },
    { image: img, name: "사료4", price: "300", ctg: "사료" },
    { image: img, name: "장난감4", price: "300", ctg: "장난감" },
    { image: img, name: "영양제4", price: "300", ctg: "영양제" },
    { image: img, name: "리빙4", price: "300", ctg: "리빙" },
    { image: img, name: "간식5", price: "300", ctg: "간식" },
    { image: img, name: "사료5", price: "300", ctg: "사료" },
    { image: img, name: "장난감5", price: "300", ctg: "장난감" },
    { image: img, name: "영양제5", price: "300", ctg: "영양제" },
    { image: img, name: "리빙5", price: "300", ctg: "리빙" },
    { image: img, name: "사료6", price: "300", ctg: "사료" },
    { image: img, name: "사료7", price: "300", ctg: "사료" },
    { image: img, name: "사료8", price: "300", ctg: "사료" },
    { image: img, name: "사료9", price: "300", ctg: "사료" },
  ];

  const [selectedCtg, setSelectedCtg] = useState("전체");
  const [shJcurrentPage, setshJcurrentPage] = useState(1);
  const shJproductsPerPage = 8; // 페이지당 상품 수

  // 페이지 변경 함수
  const shJhandlePageChange = (page, totalPages) => {
    if (page >= 1 && page <= totalPages) {
      setshJcurrentPage(page);
    }
  };

  // 필터링 및 페이지네이션 처리 함수
  const filterAndPaginateProducts = () => {
    let filteredProducts = shJproducts;
    if (selectedCtg !== "전체") {
      filteredProducts = shJproducts.filter(
        (product) => product.ctg === selectedCtg
      );
    }
    const shJtotalPages = Math.ceil(
      filteredProducts.length / shJproductsPerPage
    );
    const shJindexOfLastProduct = shJcurrentPage * shJproductsPerPage;
    const shJindexOfFirstProduct = shJindexOfLastProduct - shJproductsPerPage;
    return {
      products: filteredProducts.slice(
        shJindexOfFirstProduct,
        shJindexOfLastProduct
      ),
      totalPages: shJtotalPages,
    };
  };

  const { products, totalPages } = filterAndPaginateProducts();
  const ctgList = ["전체", "간식", "사료", "장난감", "영양제", "리빙"];
  return (
    <>
      <div className={style.shJproductWrapper}>
        <h1 className={style.shJTitle}>상점</h1>
        <>
          {ctgList.map((ctg) => (
            <button
              key={ctg}
              onClick={() => {
                setSelectedCtg(ctg);
                setshJcurrentPage(1);
              }}
              className={`${selectedCtg === ctg ? style.selected : ""}`}
            >
              {ctg}
            </button>
          ))}
        </>
        <div className={style.shJcolumns}>
          {products.map((product, index) => (
            <div className={style.shJcard} key={index}>
              <img src={product.image} alt="상품" />
              <div className={style.shJname}>
                <div className={style.shJtitle}>{product.name}</div>
                <div className={style.shJpoint}>{product.price} Point</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id={style.shJproductFoot}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => shJhandlePageChange(shJcurrentPage - 1, totalPages)} // <을 클릭하면 현재 페이지 -1
          disabled={shJcurrentPage === 1} //현재 페이지가 1 일때는 동작을 막음
          className={style.shJicon}
        />

        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`${style.shJbox} ${
              shJcurrentPage === index + 1 ? style.shJactive : ""
            }`}
            onClick={() => shJhandlePageChange(index + 1, totalPages)}
          >
            {index + 1}
          </div>
        ))}

        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => shJhandlePageChange(shJcurrentPage + 1, totalPages)} // > 을 클릭하면 현재 페이지 +1
          disabled={shJcurrentPage === totalPages} //현재 페이지가 마지막 페이지라면 동작 막음
          className={style.shJicon}
        />
      </div>
    </>
  );
}

export default Shop;

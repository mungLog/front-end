import style from "../styles/purchase.module.css";
import prd1 from "../../../shop/img/food/1.png";
import prd2 from "../../../shop/img/living/2.png";
import prd3 from "../../../shop/img/vitamin/2.png";

export default function PurchaseHistoryPage() {
  return (
    <div id={style.purchase}>
      <h2>구매내역</h2>
      <div>
        <div className={style.date}>2024.07.26</div>
        <div className={style.flex}>
          <img src={prd1} alt="상품" />
          <div>
            <div className={style.title}>ROYAL CANIN</div>
            <div className={style.ctg}>사료</div>
            <div className={style.price}>30,500원</div>
          </div>
        </div>
      </div>
      <div>
        <div className={style.date}>2024.07.28</div>
        <div className={style.flex}>
          <img src={prd2} alt="상품" />
          <div>
            <div className={style.title}>댕댕이 발자국 하우스</div>
            <div className={style.ctg}>리빙</div>
            <div className={style.price}>42,000원</div>
          </div>
        </div>
      </div>
      <div>
        <div className={style.date}>2024.07.30</div>
        <div className={style.flex}>
          <img src={prd3} alt="상품" />
          <div>
            <div className={style.title}>오메가3</div>
            <div className={style.ctg}>영양제</div>
            <div className={style.price}>29,000원</div>
          </div>
        </div>
      </div>
    </div>
  );
}

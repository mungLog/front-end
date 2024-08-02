import React from "react";
import * as S from "../styles/PurchaseHistoryPage.Style";

export default function PurchaseHistoryPage() {
  return (
    <S.Page>
      <S.TitleWrap>구매내역</S.TitleWrap>
      <S.ContentWrap>
        <S.TitleWrap2>2024.07.05</S.TitleWrap2>
        <S.box>
          <S.pic></S.pic>
          <S.product>
            <S.name>노즈워크북</S.name>
            <S.kategorie>장난감</S.kategorie>
          </S.product>
          <S.price>30,500원</S.price>
        </S.box>
        <S.TitleWrap2>2024.07.05</S.TitleWrap2>
        <S.box>
          <S.pic2></S.pic2>
          <S.product>
            <S.name>ROYAL CANIN </S.name>
            <S.kategorie>사료</S.kategorie>
          </S.product>
          <S.price>46,500원</S.price>
        </S.box>
      </S.ContentWrap>
    </S.Page>
  );
}

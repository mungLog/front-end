import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/AddFamilyMemberPage.Style";

export default function AddFamilyMember() {
  const [requestStatus, setRequestStatus] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [hasData, setHasData] = useState(false); // 데이터가 있는지 여부를 저장할 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    const fetchData = async () => {
      try {
        // 예시로 데이터 가져오는 API 호출
        const response = await axios.get("/request-data");
        const { name, date, status } = response.data;

        if (name && date) {
          // 데이터가 있는 경우
          setName(name);
          setDate(date);
          setRequestStatus(status);
          setHasData(true);
        } else {
          // 데이터가 없는 경우
          setHasData(false);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("데이터를 가져오는 데 실패했습니다.");
        setHasData(false); // 데이터 가져오기 실패 시에도 데이터 없음으로 설정
      }
    };

    fetchData();
  }, []); // 빈 배열을 의존성으로 주면 컴포넌트가 처음 마운트될 때만 호출됩니다.

  const handleAccept = async () => {
    try {
      // 요청 수락 API 호출
      const response = await axios.post("/accept-request", { name, date });
      if (response.data.success) {
        setRequestStatus("accepted");
      } else {
        alert("요청 수락에 실패했습니다.");
      }
    } catch (error) {
      console.error("요청 수락 실패:", error);
      alert("요청 수락에 실패했습니다.");
    }
  };

  const handleReject = async () => {
    try {
      // 요청 거절 API 호출
      const response = await axios.post("/reject-request", { name, date });
      if (response.data.success) {
        setRequestStatus("rejected");
      } else {
        alert("요청 거절에 실패했습니다.");
      }
    } catch (error) {
      console.error("요청 거절 실패:", error);
      alert("요청 거절에 실패했습니다.");
    }
  };

  return (
    <S.Page>
      {/* 가족추가칸 */}
      <S.ContentWrap>
        <S.TitleWrap>가족추가 알림</S.TitleWrap>
        <S.Content>
          <S.Titleform>
            <S.date>날짜</S.date>
            <S.name>이름</S.name>
            <S.empty></S.empty>
            <S.request>요청여부</S.request>
          </S.Titleform>
          {hasData ? (
            <S.dataform>
              <S.datadate>{date}</S.datadate>
              <S.dataname>{name}</S.dataname>
              <S.datamessage>
                {name}님이 가족추가 요청을 신청하였습니다.
              </S.datamessage>
              <S.datarequest>
                {requestStatus === null ? (
                  <>
                    <S.Button onClick={handleAccept}>수락</S.Button>
                    <S.Button onClick={handleReject}>거절</S.Button>
                  </>
                ) : (
                  <S.Status status={requestStatus}>
                    {requestStatus === "accepted" ? "수락됨" : "거절됨"}
                  </S.Status>
                )}
              </S.datarequest>
            </S.dataform>
          ) : (
            <S.nodataform>요청된 정보가 없습니다.</S.nodataform>
          )}
        </S.Content>
      </S.ContentWrap>

      {/* 가족구성원 정보/추가칸 */}
      <S.ContentWrap>
        <S.TitleWrap>가족구성원 정보 / 추가</S.TitleWrap>
        <S.Content>
          <S.personform>
            <S.div>
              <S.user1></S.user1>
              <S.user2></S.user2>
            </S.div>
            <S.div>
              <S.user3>
                <S.user4></S.user4>
              </S.user3>
            </S.div>
            <S.div>
              <S.user5></S.user5>
              <S.user6></S.user6>
            </S.div>
          </S.personform>
        </S.Content>
      </S.ContentWrap>
    </S.Page>
  );
}

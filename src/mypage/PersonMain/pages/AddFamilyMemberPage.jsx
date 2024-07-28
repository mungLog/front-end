import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as S from "../styles/AddFamilyMemberPage.Style";

export default function AddFamilyMember() {
  const { fam_id } = useParams(); // URL에서 fam_id 가져오기
  const [requests, setRequests] = useState([]); // 여러 요청을 저장할 상태
  const [users, setUsers] = useState([]); // 사용자 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 한 번의 요청으로 데이터 가져오기
        const response = await axios.get(
          `http://localhost:8080/family/${fam_id}`
        );
        const requestsData = response.data.requests; // 요청 데이터 배열로 가정
        const usersData = response.data.users; // 사용자 데이터 배열로 가정

        setRequests(requestsData);
        setUsers(usersData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [fam_id]); // fam_id가 변경될 때마다 fetchData가 다시 호출되도록 의존성 배열에 추가

  const handleAccept = async (name, date) => {
    try {
      // 1. 가족 추가 요청을 수락하는 API 호출
      const response = await axios.post("http://localhost:8080/family", {
        name,
        date,
      });
      if (response.data.success) {
        // 2. 요청 수락이 성공한 경우

        // 3. 수락된 요청을 requests 상태에서 제거
        setRequests((prevRequests) =>
          prevRequests.filter(
            (req) => !(req.name === name && req.date === date)
          )
        );

        // 4. 새로운 사용자를 users 상태에 추가하기 위해 사용자 정보 요청
        const newUser = {
          id: name,
          name: name,
          nickname: response.data.nickname,
        }; // 임의로 예시 데이터를 넣음
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } else {
        // 요청 수락이 실패한 경우 사용자에게 알림
        alert("요청 수락에 실패했습니다.");
      }
    } catch (error) {
      // 5. 에러 처리
      console.error("요청 수락 실패:", error);
      alert("요청 수락에 실패했습니다.");
    }
  };

  const handleReject = async (name, date) => {
    try {
      const response = await axios.post("http://localhost:8080/family", {
        name,
        date,
      });
      if (response.data.success) {
        // 요청 상태 업데이트
        setRequests((prevRequests) =>
          prevRequests.filter(
            (req) => !(req.name === name && req.date === date)
          )
        );
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
          {requests.length > 0 ? (
            requests.map((req) => (
              <S.dataform key={`${req.name}-${req.date}`}>
                <S.datadate>{req.date}</S.datadate>
                <S.dataname>{req.name}</S.dataname>
                <S.datamessage>
                  {req.name}님이 가족추가 요청을 신청하였습니다.
                </S.datamessage>
                <S.datarequest>
                  {req.status === null ? (
                    <>
                      <S.Button
                        onClick={() => handleAccept(req.name, req.date)}
                      >
                        수락
                      </S.Button>
                      <S.Button
                        onClick={() => handleReject(req.name, req.date)}
                      >
                        거절
                      </S.Button>
                    </>
                  ) : (
                    <S.Status status={req.status}>
                      {req.status === "accepted" ? "수락됨" : "거절됨"}
                    </S.Status>
                  )}
                </S.datarequest>
              </S.dataform>
            ))
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
            {users.length > 0 ? (
              users.map((user) => (
                <S.User key={user.id}>
                  <S.UserName>{user.name}</S.UserName>
                  <S.UserNickname>{user.nickname}</S.UserNickname>
                </S.User>
              ))
            ) : (
              <S.NoUser>가족을 추가하세요</S.NoUser>
            )}
          </S.personform>
        </S.Content>
      </S.ContentWrap>
    </S.Page>
  );
}

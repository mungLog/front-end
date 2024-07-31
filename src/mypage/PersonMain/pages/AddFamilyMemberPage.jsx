import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext"; // UserContext import
import * as S from "../styles/AddFamilyMemberPage.Style";

export default function AddFamilyMember() {
  const { fam_id } = useParams(); // URL에서 fam_id 가져오기
  const [requests, setRequests] = useState([]); // 여러 요청을 저장할 상태
  const [users, setUsers] = useState([]); // 사용자 데이터를 저장할 상태
  const { user, isLoading } = useUser(); // UserContext에서 현재 사용자 정보 가져오기
  const navigate = useNavigate(); // 페이지 리디렉션을 위한 navigate 훅

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 권한 확인
        if (!user || isLoading) {
          // 사용자 데이터 로딩 중이거나 데이터가 없으면 로딩 중 메시지 반환
          return;
        }

        if (!user.isFamilyRepresentative) {
          // 가족대표가 아니면 경고 후 리디렉션
          alert("가족대표인 경우에만 사용 가능한 페이지입니다.");
          navigate("/mypage");
          return;
        }

        // 가족 관련 데이터 가져오기
        const response = await axios.get(`${apiUrl}/family/${fam_id}`);
        const requestsData = response.data.requests;
        const usersData = response.data.users;

        setRequests(requestsData);
        setUsers(usersData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        alert("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [fam_id, apiUrl, navigate, user, isLoading]);

  // 로딩 상태 주석 처리
  // if (isLoading || !user) {
  //   return <div>로딩 중...</div>; // 사용자 데이터 로딩 중일 때 로딩 메시지
  // }

  const handleAccept = async (name, date) => {
    try {
      const response = await axios.post(`${apiUrl}/family/accept`, {
        name,
        date,
      });
      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.filter(
            (req) => !(req.name === name && req.date === date)
          )
        );
        const newUser = {
          id: name,
          name: name,
          nickname: response.data.nickname,
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } else {
        alert("요청 수락에 실패했습니다.");
      }
    } catch (error) {
      console.error("요청 수락 실패:", error);
      alert("요청 수락에 실패했습니다.");
    }
  };

  const handleReject = async (name, date) => {
    try {
      const response = await axios.post(`${apiUrl}/family/reject`, {
        name,
        date,
      });
      if (response.data.success) {
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

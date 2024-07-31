import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../header/AuthContext";
function CommunityList() {
  const [list, setList] = useState([]);
  const { state } = useAuth();

  // const sampleData = [
  //   {
  //     postId: "1",
  //     title: "첫 번째 게시물",
  //     content: "이것은 첫 번째 게시물입니다.",
  //     category: "공지사항",
  //     timestamp: "2024-07-16",
  //   },
  //   {
  //     postId: "2",
  //     title: "두 번째 게시물",
  //     content: "이것은 두 번째 게시물입니다.",
  //     category: "일반",
  //     timestamp: "2024-07-17",
  //   },
  //   {
  //     postId: "3",
  //     title: "세 번째 게시물",
  //     content: "이것은 세 번째 게시물입니다.",
  //     category: "질문",
  //     timestamp: "2024-07-18",
  //   },
  // ];
  // useEffect(() => {
  //   setList(sampleData);
  // }, []);

  const awsIP = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios({
      method: "get",
      url: `${awsIP}/posts`,
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then((response) => {
        setList(response.data);
        console.log("통신 성공");
      })
      .catch((error) => {
        console.log("커뮤니티 목록", error);
      });
  }, [awsIP, state.accessToken]);

  const commuWrite = () => {
    window.location.href = "/community/write";
  };
  return (
    <div>
      <input type="button" value="추가하기" onClick={commuWrite} />
      <div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {list.map((notice, idx) => {
              return (
                <div>
                  <Link to={`/community/posts/${notice.id}`}>
                    <tr key={idx}>
                      <td>{notice}</td>
                      {/* <td>{notice.category}</td>
                      <td>{notice.title}</td>
                      <td>{notice.timestamp}</td> */}
                    </tr>
                  </Link>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CommunityList;

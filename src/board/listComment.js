import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./css/comment.module.css";

const CommentList = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const [editContent, setUpdateContent] = useState("");
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  // const sampleComments = [
  //   {
  //     id: 1,
  //     author: "user1",
  //     content: "This is the first comment",
  //     userid: "user1",
  //   },
  //   {
  //     id: 2,
  //     author: "user2",
  //     content: "This is the second comment",
  //     userid: "user2",
  //   },
  //   {
  //     id: 3,
  //     author: "user1",
  //     content: "This is another comment by user1",
  //     userid: "user1",
  //   },
  // ];
  // setComments(sampleComments);
  // useEffect(() => {
  //   axios
  //     .get(`${awsIP}/posts/${postId}/comments`)
  //     .then((response) => {
  //       setComments(response.data.comments);
  //     })
  //     .catch((error) => {
  //       console.error("댓글 불러오기 실패", error);
  //     });
  // }, [postId]);

  const handleUpdateComment = (commentId, currentContent) => {
    setUpdateCommentId(commentId);
    setUpdateContent(currentContent);
  };

  const handleUpdateContentChange = (e) => {
    setUpdateContent(e.target.value);
  };

  const handleSaveEdit = (commentId) => {
    axios
      .put(`${awsIP}/comments/${commentId}`, { content: editContent })
      .then(() => {
        console.log("댓글 수정 성공");
        navigate(`/community/posts/${postId}`);
      })
      .catch((error) => {
        console.error("댓글 수정 실패", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${awsIP}/posts/${postId}/comments/delete/${commentId}`)
      .then(() => {
        console.log("댓글 삭제 성공");
        navigate(`/community/posts/${postId}`);
      })
      .catch((error) => {
        console.error("댓글 삭제 실패", error);
      });
  };

  const handleCancelUpdate = () => {
    setUpdateCommentId(null);
    setUpdateContent("");
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {updateCommentId === comment.id ? (
            <div>
              <textarea
                value={editContent}
                onChange={handleUpdateContentChange}
              />
              <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
              <button onClick={handleCancelUpdate}>취소</button>
            </div>
          ) : (
            <div>
              <div>
                {comment.author}: {comment.content}
              </div>
              {comment.userid === userId && (
                <div>
                  <button
                    onClick={() =>
                      handleUpdateComment(comment.id, comment.content)
                    }
                  >
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    axios
      .get(`/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data);
        console.log("댓글 호출 성공");
      })
      .catch((error) => {
        console.error("댓글 호출 오류", error);
      });
  }, [postId]);

  const handleEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditContent(content);
  };

  const handleEditSubmit = (commentId) => {
    axios
      .put(`/posts/${postId}/comments/update/${commentId}`, {
        content: editContent,
      })
      .then((response) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editContent }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditContent("");
      })
      .catch((error) => {
        console.error("댓글 수정 오류", error);
      });
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`/posts/${postId}/comments/delete/${commentId}`)
      .then((response) => {
        setComments(
          (prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          //지워진거 제외하고 다시 설정
        );
      })
      .catch((error) => {
        console.error("댓글 삭제 오류", error);
      });
  };

  return (
    <div>
      <h3>댓글</h3>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>작성자: {comment.userid}</p>
              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(comment.id)}>
                    저장
                  </button>
                  <button onClick={() => setEditingCommentId(null)}>
                    취소
                  </button>
                </div>
              ) : (
                <div>
                  <p>내용: {comment.content}</p>
                  <p>작성일: {comment.timestamp}</p>
                  {comment.userid === currentUserId && (
                    <>
                      <button
                        onClick={() => handleEdit(comment.id, comment.content)}
                      >
                        수정
                      </button>
                      <button onClick={() => handleDelete(comment.id)}>
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;

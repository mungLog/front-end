import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export async function logoutUser(dispatch) {
  try {
    await axios.post("http://localhost:8080/logout"); // 로그아웃 API 호출
    dispatch({ type: "LOGOUT" }); // 로그아웃 성공 후 상태 업데이트
  } catch (error) {
    console.error("로그아웃 요청 실패:", error);
  }
}

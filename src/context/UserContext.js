// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  // 사용자 정보 새로고침 함수
  const refreshUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/role`);
      setUser(response.data);
    } catch (error) {
      console.error("User fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [apiUrl]);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

import axios from "axios";

const api = axios.create({
  baseURL: "https://example.com/api", // 실제 API 서버 URL로 변경
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;

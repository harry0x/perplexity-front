import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};
export const login = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};
export const getMe = async () => {
  const response = await api.get("/get-me");
  return response.data;
};

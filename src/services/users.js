import axios from "axios";

const baseUrl = "https://api.realworld.io/api";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${baseUrl}/user`);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/users/login`, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/users`, credentials);
  return response.data;
};

const updateCurrentUser = async (user) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/user`, user, config);
  return response.data;
};
export default { getCurrentUser, login, register, updateCurrentUser, setToken };

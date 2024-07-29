import axios from "axios";

const baseUrl = "https://api.realworld.io/api/users/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };

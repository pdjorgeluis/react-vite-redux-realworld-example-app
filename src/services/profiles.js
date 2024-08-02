import axios from "axios";

const baseUrl = "https://api.realworld.io/api/profiles";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUserProfile = (username) => {
  const request = axios.get(`${baseUrl}/${username}`);
  return request.then((response) => response.data);
};

const followUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${username}/follow`,
    {},
    config
  );
  return response.data;
};

const unfollowUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${username}/follow`, config);
  return response.data;
};

export default { setToken, getUserProfile, followUser, unfollowUser };

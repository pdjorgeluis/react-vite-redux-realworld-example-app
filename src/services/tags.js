import axios from "axios";

const baseUrl = "https://api.realworld.io/api/tags";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };

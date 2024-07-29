import axios from "axios";

const baseUrl = "https://api.realworld.io/api/articles";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getTag = (tag) => {
  const request = axios.get(baseUrl, { params: { tag } });
  return request.then((response) => response.data);
};

const getBySlug = (slug) => {
  const request = axios.get(`${baseUrl}/${slug}`);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, newComment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    newComment,
    config
  );
  return response.data;
};

export default {
  getAll,
  setToken,
  create,
  update,
  deleteBlog,
  addComment,
  getTag,
  getBySlug,
};

import axios from "axios";

const baseUrl = "https://api.realworld.io/api/articles";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = (offset, user) => {
  const config = user
    ? {
        headers: { Authorization: token },
        params: { offset },
      }
    : { params: { offset } };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const getByTag = (tag, offset) => {
  const request = axios.get(baseUrl, { params: { tag, offset } });
  return request.then((response) => response.data);
};

const getBySlug = (slug) => {
  const request = axios.get(`${baseUrl}/${slug}`);
  return request.then((response) => response.data);
};

const getAllFeed = (offset) => {
  const config = {
    headers: { Authorization: token },
    params: { offset },
  };

  const request = axios.get(`${baseUrl}/feed`, config);
  return request.then((response) => response.data);
};

const favoriteArticle = async (slug) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/${slug}/favorite`, {}, config);
  return response.data;
};

const unfavoriteArticle = async (slug) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${slug}/favorite`, config);
  return response.data;
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
  getByTag,
  getBySlug,
  getAllFeed,
  favoriteArticle,
  unfavoriteArticle,
};

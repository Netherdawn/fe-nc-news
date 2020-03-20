import axios from "axios";

const instance = axios.create({
  baseURL: "https://news-app-from-bootcamp.herokuapp.com/api"
});

export const fetchTopics = () => {
  return instance.get("/topics");
};

export const fetchArticles = async params => {
  return await instance.get("/articles", { params: params });
};

export const fetchArticleById = id => {
  return instance.get(`/articles/${id}`);
};

export const fetchUserByUsername = username => {
  return instance.get(`/users/${username}`);
};

export const fetchCommentsByArticleId = async id => {
  return await instance.get(`/articles/${id}/comments`);
};

export const deleteCommentByCommentId = async id => {
  return await instance.delete(`/comments/${id}`);
};

export const patchCommentVoteById = async (id, value) => {
  return await instance.patch(`/comments/${id}`, { inc_votes: value });
};

export const patchArticleVoteById = async (id, value) => {
  return await instance.patch(`/articles/${id}`, { inc_votes: value });
};

export const postCommentByArticleId = async (id, body) => {
  const { data } = await instance.post(`/articles/${id}/comments`, body);
  return data.comment;
};

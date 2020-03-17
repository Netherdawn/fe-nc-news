import axios from "axios";

const instance = axios.create({
  baseURL: "https://news-app-from-bootcamp.herokuapp.com/api"
});

export const fetchTopics = () => {
  return instance.get("/topics");
};

export const fetchArticles = params => {
  return instance.get("/articles", { params: params });
};

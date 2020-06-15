import axios from "axios";
import humps from "lodash-humps";
import { get } from "svelte/store";
import { token } from "./store";

const service = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

service.interceptors.request.use((config) => {
  console.log("gettoken ", get(token));
  if (get(token)) {
    config.headers.Authorization = `Token ${get(token)}`;
  }

  return config;
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    response.data = humps(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;

import axios from "axios";
import store from "@/store";
import { baseURL } from "@/config/requests";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  //   baseURL: process.env.BASE_API, // api base_url
  //   baseURL: "http://localhost:8000", // api base_url
  // baseURL: "http://brands.solutionplus.net", // api base_url
  // baseURL: process.env.VUE_APP_BASE_URL, // api base_url
  baseURL: baseURL,

  timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers["Authorization"] = `${"Bearer " + getToken()}`;
    }
    if (config.headers["X-locale"] === undefined) {
      config.headers["X-locale"] = store.getters.language;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  function(response) {
    // Do something with response data
    store.dispatch("ClearServerErrors");
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // global success reponse message
    let { method } = response.config;
    if (method === "post" || method === "put" || method === "delete") {
      if (response.data.message) {
        store.dispatch("ShowNotification", {
          text: response.data.message,
          color: "success"
        });
      }
    }

    return response;
  },

  error => {
    // global error reponse message
    store.dispatch("ShowNotification", {
      text: error.response.data.message,
      color: "red"
    });
    const { errors } = error.response.data;
    store.dispatch("SetServerErrors", errors);
    return Promise.reject(error);
  }
);

export default service;

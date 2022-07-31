import axios from "axios";
import router from "@/router";
import { BASE_URL } from "../config";
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 20000;

axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem("token");
  return config;
})

axios.interceptors.response.use((res) => {
  if (res.status === 200 && res.data.meta.msg !== '无效token') {
    return res.data;
  }

  window.sessionStorage.removeItem("token")
  router.push("/login")
  return {
    meta: {
      status: 400,
      msg: "登录信息已过期，请重新登录！"
    }
  };
})

export default axios;
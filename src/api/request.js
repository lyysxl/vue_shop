import axios from "axios";
import { BASE_URL } from "../config";
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 20000;

axios.interceptors.response.use((res) => {
  console.log(res)
  if(res.status === 200) {
    return res.data;
  }
  return data;
})

export default axios;
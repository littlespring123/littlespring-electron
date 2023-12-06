import axios from "axios";
import { DesktopMsg } from "@renderer/utils/notification";
import { useStore } from "@renderer/stores";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const router = useRouter();
const stores = useStore();

const { loading } = storeToRefs(stores);
interface requestType {
  data?: any;
  method?: string;
}

interface responseType {
  result?: any;
  message?: string;
  code?: number;
}

const server = axios.create({
  baseURL: "http://47.98.47.146:3000",
  timeout: 20000,
});

server.interceptors.request.use(
  (config) => {
    console.log("req", config);
    loading.value = true;
    // config.headers['token'] = JSON.parse(localStorage.getItem('user') || '')?.token;
    return config;
  },
  (err) => {
    console.log(err); // for debug
    return Promise.reject(err);
  }
);

server.interceptors.response.use(
  (response) => {
    const res: responseType = response.data;
    loading.value = false;
    console.log("res", res);
    if (res.code !== 200) {
      DesktopMsg({ title: "接口信息报错", body: res.message });
      return Promise.reject(new Error(res.message || "Error"));
    }
    // DesktopMsg({ title: "成功", body: res.message });
    return res;
  },
  (err) => {
    loading.value = false;
    if (err.message.includes("timeout")) {
      DesktopMsg({ title: "网络超时", body: err.message });
    }
    if (err.message.includes("Network Error")) {
      DesktopMsg({ title: "服务端未启动，或网络连接错误", body: err.message });
    }
    return Promise.reject(err);
  }
);

export default server;

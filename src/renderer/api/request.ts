import axios from 'axios';
import { useStore } from '@renderer/stores';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter();
const stores = useStore();

const { loading } = storeToRefs(stores);
interface requestType {
  data?: any;
  method?: string;
}

interface responseType {
  data?: any;
  message?: string;
  state?: number;
}

const server = axios.create({
  baseURL: __CONFIG__.API_HOST,
  timeout: 20000
});

server.interceptors.request.use(
  (config) => {
    console.log('req', config);
    loading.value = true;
    // message.value.show = true;
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
    console.dir('res', res);
    if (res.state !== 200) {
      if (res.state === 401) {
        router.push('/login');
      }
      console.log('接口信息报错', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (err) => {
    loading.value = false;
    if (err.message.includes('timeout')) {
      console.log('错误回调', err);
      stores.setFailMsg('网络超时', 1000);
    }
    if (err.message.includes('Network Error')) {
      console.log('错误回调', err);
      stores.setFailMsg('服务端未启动，或网络连接错误', 1000);
    }
    return Promise.reject(err);
  }
);

export default server;

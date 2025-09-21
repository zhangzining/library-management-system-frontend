import axios from "axios";
import {store} from '@/app/lib/store';
import {hideError, onUnAuth, showError} from '@/app/lib/features/errorSlice';
import {AUTH_PATHS} from "@/app/lib/service/auth";

enum ENV {LOCAL, DEV}

const currentEnv: ENV = ENV.LOCAL

let baseUrl
if (ENV.LOCAL === currentEnv) {
  baseUrl = 'http://localhost:8080/api'
} else {
  baseUrl = 'http://localhost:8081'
}

export const BASE_URL = baseUrl
export const CLIENT_ID = 'library_system'

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (AUTH_PATHS.includes(config.url || '')) {
      config.headers["X-Client-ID"] = CLIENT_ID
    } else {
      config.headers["Authorization"] = "Bearer " + store.getState().userInfo.accessToken
    }
    return config; // 返回这个配置对象，如果没有返回，这个请求就不会发送出去
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 拦截器 处理响应体并返回json对象
axiosInstance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  let respStatus = error.response?.status
  if (respStatus === 401) {
    store.dispatch(onUnAuth())
  } else if (respStatus === 403) {
    store.dispatch(onUnAuth())
  } else {
    const errorMsg = error.response?.data?.message || '请求发生错误，请稍后重试';
    store.dispatch(showError(errorMsg))

    // 6 秒后隐藏错误消息
    setTimeout(() => {
      store.dispatch(hideError());
    }, 6000);
  }
  return Promise.reject(error)
})




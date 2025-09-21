import {axiosInstance, BASE_URL, CLIENT_ID} from "@/app/lib/service/axios";
import {AxiosRequestConfig} from "axios";
import {param} from "ts-interface-checker";

// Helpers

export function get<R, P>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return axiosInstance.get(url, config)
}

export function post<R, P>(url: string, param?: P, config?: AxiosRequestConfig): Promise<R> {
  return axiosInstance.post(url, param, config)
}


export function put<R, P>(url: string, param?: P, config?: AxiosRequestConfig): Promise<R> {
  return axiosInstance.put(url, param, config)
}


export function patch<R, P>(url: string, param?: P, config?: AxiosRequestConfig): Promise<R> {
  return axiosInstance.patch(url, param, config)
}


export function _delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return axiosInstance.delete(url, config)
}

export function getImageUrl(imgUid: string | null): string {
  if (!imgUid) {
    return ''
  }
  return BASE_URL + "/v1/files/" + imgUid
}
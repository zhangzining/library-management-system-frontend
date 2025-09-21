// accounts
import {put} from "@/app/lib/service/requests";

const USER = "/v1/users"

export async function updateInfo(param: NormalUserDto): Promise<NormalUserDto> {
  return put(USER, param)
}


export const ADMIN_PERMISSION_MAP = new Map<string, string>([
  ["USER_MANAGE", "普通用户管理"],
  ["ADMIN_USER_MANAGE", "管理员用户管理"],
  ["LENDING_MANAGE", "借阅管理"],
  ["BOOK_MANAGE", "图书管理"]
])

export const STATUS_MAP = new Map<string, string>([
  ["ACTIVE", "正常"],
  ["LOCKED", "禁用"],
  ["DISABLED", "已删除"],
  ["NEVER_LOGIN", "未登录"]
])

export function timestampToDateTime(timestamp: string|null): string {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0'+ date.getMonth(): date.getMonth();
  const day = date.getDate() < 10 ? '0'+ date.getDate(): date.getDate();
  const hours = date.getHours() < 10 ? '0'+ date.getHours(): date.getHours();
  const minutes = date.getMinutes() < 10 ? '0'+ date.getMinutes(): date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0'+ date.getSeconds(): date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const getRoleNames = (roles:string[]) => {
  return roles.map(key => ADMIN_PERMISSION_MAP.get(key))
    .filter(value => !!value)
}
export const getStatusName = (status:string|null) => {
  if (!status) {
    return ''
  }
  return STATUS_MAP.get(status)
}
// auth
import {patch, post} from "@/app/lib/service/requests";
import {store} from "@/app/lib/store";

const LOGIN_PATH = "/v1/auth/login"
const REGISTER_PATH = "/v1/auth/register"
const REFRESH_PATH = "/v1/auth/refresh"
const CHANGE_PASSWORD_PATH = "/v1/auth/changePassword"

export const AUTH_PATHS = [LOGIN_PATH, REFRESH_PATH, REGISTER_PATH, CHANGE_PASSWORD_PATH]

export async function login(loginForm: LoginForm): Promise<LoginResult> {
  return post(LOGIN_PATH, loginForm)
}

export async function register(loginForm: LoginForm): Promise<void> {
  return post(REGISTER_PATH, loginForm)
}

export async function refreshToken(refreshToken: RefreshToken): Promise<void> {
  return post(REFRESH_PATH, refreshToken)
}

export async function changePassword(param: ChangePasswordRequestDto): Promise<void> {
  return patch(CHANGE_PASSWORD_PATH, param, {headers: {"Authorization": "Bearer " + store.getState().userInfo.accessToken}})
}
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInfo {
  id: number | null,
  name: string | null,
  status: string | null,
  accessToken: string | null,
  refreshToken: string | null,
  roles: string[] | null
}

const initialState: UserInfo = {
  id: null,
  name: null,
  status: null,
  accessToken: null,
  refreshToken: null,
  roles: null
};

/**
 * 从LocalStorage中加载用户信息
 */
export const initUserInfoFromCache = () => {
  const cachedUserInfo = localStorage.getItem("userInfo");
  if (!!cachedUserInfo) {
    return JSON.parse(cachedUserInfo);
  } else {
    return initialState
  }
}

/**
 * 保存用户信息到LocalStorage中
 * @param userInfo
 */
const persistUserInfoIntoCache = (userInfo: UserInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

/**
 * 删除localStorage中的用户信息
 */
const deleteUserInfofromCache = () => {
  localStorage.removeItem("userInfo")
}

/**
 * 创建Thunk用来初始化信息
 */
export const initUserInfo = createAsyncThunk("userInfo/init", initUserInfoFromCache)

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    resetUserInfo(state) {
      deleteUserInfofromCache()
      return initialState;
    },
    loginSuccess(state, action: PayloadAction<UserInfo>) {
      const payload = action.payload;
      persistUserInfoIntoCache(payload)
      if (!payload.roles || payload.roles.length === 0) {
        payload.roles = ['NORMAL']
      }
      return payload
    },
  },
  selectors: {
    selectUserInfo: state => state,
    isAdmin: state => state.roles?.includes("ADMIN"),
    isNormal: state => state.roles?.includes("NORMAL"),
    getRoles: state => state.roles,
  },
  extraReducers: builder =>
    builder.addCase(initUserInfo.fulfilled, (state, action) => {
      const result = action.payload
      if (result.accessToken && !result.roles && result.roles.length === 0) {
        result.roles = ['NORMAL']
      }
      return result
    })
})

export default userInfoSlice.reducer

export const {selectUserInfo,isAdmin, isNormal, getRoles} = userInfoSlice.selectors
export const {resetUserInfo, loginSuccess} = userInfoSlice.actions
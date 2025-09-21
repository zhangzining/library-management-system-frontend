'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation"
import {useAppDispatch, useAppSelector} from "./lib/hooks";
import {initUserInfo, isAdmin, resetUserInfo, selectUserInfo} from "@/app/lib/features/userInfoSlice";

/**
 * 默认首页，不做内容展示，根据登录状态直接跳转
 */
export default function DefaultPage() {
  const {push} = useRouter()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(selectUserInfo)
  const adminUser = useAppSelector(isAdmin)

  useEffect(() => {
    dispatch(initUserInfo())
  }, []);

  useEffect(() => {
    // 如果已经登陆了就直接进入页面，否则需要登陆
    if (!!userInfo && userInfo.accessToken !== null) {
      if (adminUser){
        // 管理员用户每次都需要重新登陆
        dispatch(resetUserInfo())
        push('/login')
      } else {
        push("/home")
      }
    } else {
      push('/login')
    }
  }, [userInfo]);
  return (
    <div>
      <p>This is loading page</p>
    </div>
  )
}
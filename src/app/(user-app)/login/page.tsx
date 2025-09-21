'use client'

import Logo from "@/app/components/logo";
import LoginForm from "@/app/(user-app)/login/login-form";
import {useRouter} from 'next/navigation'
import {useState} from "react";
import {useAppDispatch} from "@/app/lib/hooks";
import * as service from "@/app/lib/service/auth";
import {loginSuccess, UserInfo} from "@/app/lib/features/userInfoSlice";

/**
 * 登录页面
 * /login
 */
export default function LoginPage() {
  const {push} = useRouter()
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')

  const errorHintWithDelay = (error:string) => {
    setError(error)
    setTimeout(() => setError(''), 4000)
  }

  const onLogin = (username:string, password:string) => {
    if (!username || !password) {
      errorHintWithDelay("请输入账号名和密码")
    } else {
      service.login({username, password})
        .then(resp => {
          const userInfo: UserInfo = {} as UserInfo
          userInfo.accessToken = resp.accessToken
          userInfo.refreshToken = resp.refreshToken
          const isAdmin = !!resp.adminUser
          if (isAdmin) {
            userInfo.id = resp.adminUser.id
            userInfo.name = resp.adminUser.username
            userInfo.status = resp.adminUser.status
            userInfo.roles = [...resp.adminUser.roles, 'ADMIN']
          } else {
            userInfo.id = resp.normalUser.id
            userInfo.name = resp.normalUser.username
            userInfo.status = resp.normalUser.status
            userInfo.roles = ['NORMAL']
          }
          dispatch(loginSuccess(userInfo))
          if (isAdmin) {
            push("/management")
          } else {
            push("/home")
          }
        })
        .catch(error => console.info(error.response?.data?.failedReason))
    }
  }

  const onRegister = () => {
      push("/register")
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-36 text-white md:w-40">
            <Logo />
          </div>
        </div>
        <LoginForm onLogin={onLogin} onRegister={onRegister} errorMessage={error} />
      </div>
    </main>
  );
}
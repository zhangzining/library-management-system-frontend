'use client'

import Logo from "@/app/components/logo";
import RegisterForm from "@/app/(user-app)/register/register-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import * as service from "@/app/lib/service/auth";

/**
 * 注册页面
 * /register
 */
export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const {push} = useRouter()

  const errorHintWithDelay = (error: string) => {
    setErrorMessage(error)
    setTimeout(() => setErrorMessage(''), 4000)
  }

  const onRegister = (username: string, password: string, passwordAgain: string) => {
    if (!username || !password || !passwordAgain) {
      errorHintWithDelay("请输入用户名和密码")
    } else if (password !== passwordAgain) {
      errorHintWithDelay("密码不一致")
    } else {
      service.register({username, password})
        .then(() => {
          errorHintWithDelay("注册成功，请前往登陆")
          setTimeout(() => push("/login"), 3000)
        })
        .catch(err => {
          console.error(err.response.data?.failedReason)
        })
    }
  }

  const onLogin = () => {
    push("/login")
  }
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-36 text-white md:w-40">
            <Logo/>
          </div>
        </div>
        <RegisterForm onRegister={onRegister} onLogin={onLogin} errorMessage={errorMessage}/>
      </div>
    </main>
  );
}
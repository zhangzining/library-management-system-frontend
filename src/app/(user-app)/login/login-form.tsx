'use client'

import {
  UserIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {Button} from '@/app/components/button';
import React, {useState} from "react";

export default function LoginForm({onLogin, onRegister, errorMessage}: {
  onLogin: (username: string, password: string) => void,
  onRegister: () => void,
  errorMessage: string
}) {
  // const errorMessage = "你的账号已锁定"
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const preventSubmit = (e: any) => {
    e.preventDefault()
  }

  return (

    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form className="space-y-3" onSubmit={preventSubmit}>
        <h1 className="mb-3 text-2xl">
          登录
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block font-light text-gray-900"
              htmlFor="username"
            >
              用户名
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="请输入用户名"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
              <UserIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block font-light text-gray-900"
              htmlFor="password"
            >
              密码
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="请输入密码"
                required
                minLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <KeyIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
        </div>
        <Button className="mt-6 w-full hover:bg-blue-600" onClick={() => onLogin(username, password)}>
          登录 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Button>

      </form>
      <Button className="mt-2 w-full bg-gray-300" onClick={onRegister}>
        没有账号？注册一个 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
      </Button>
      <div className="flex items-end space-x-1">
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-2"/>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  )
    ;
}

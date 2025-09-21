'use client'

import Modal from 'react-modal';
import React, {useEffect, useState} from "react";
import {Button} from "@/app/components/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ADMIN_PERMISSION_MAP} from "@/app/lib/service/account";
import * as service from "@/app/lib/service/management"
import {KeyIcon, UserIcon} from "@heroicons/react/24/outline";
import {CLIENT_ID} from "@/app/lib/service/axios";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0.375rem',
    backgroundColor: 'rgb(243 244 246)',
    border: 0
  },
  overlay: {
    opacity: 0.9,
    backgroundColor: 'rgb(249 250 251)',
  }
};

interface CheckList {
  value: string,
  name: string,
  checked: boolean
}

export default function AdminUserCreationModal({label, isOpen, closeModal}: {
  label: string,
  isOpen: boolean,
  closeModal: () => void
}) {

  const [rolesConfigs, setRolesConfigs] = useState<CheckList[]>([])
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  useEffect(() => {
    let arr = []
    for (const [key, value] of ADMIN_PERMISSION_MAP.entries()) {
      arr.push({
        value: key,
        name: value,
        checked: false
      })
    }
    setRolesConfigs(arr)
  }, []);


  const updateRoleConfig = (value: string, checkStatus: boolean) => {
    setRolesConfigs(rolesConfigs.map(item => {
      if (item.value === value) {
        item.checked = checkStatus
      }
      return item
    }))
  }

  const submitUpdate = () => {
    if (!username || !password) {
      return
    }
    let roles = rolesConfigs.filter((item) => item.checked)
      .map(item => item.value)

    service.createAdminUsers({
      username: username,
      password: password,
      roles: roles
    } as RegisterUserDto)
      .then(() => closeModal())
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={label}
        ariaHideApp={false}
      >
        <h2 className="font-semibold w-[400px] mb-3">
          创建管理员
        </h2>
        <div className="w-[400px] mb-3">
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
        <div className="border-t-2 mt-3">
          <div className="flex justify-around">
            <div className="text-left">权限</div>
            <div>
              {
                rolesConfigs.map(item => (
                  <div className="flex-col" key={item.value}>
                    <input type="checkbox"
                           id={item.value}
                           name={item.value}
                           value={item.name}
                           checked={item.checked}
                           onChange={e => updateRoleConfig(item.value, e.target.checked)}
                    />
                    <label id={item.value} htmlFor={item.value}>{item.name}</label>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-3">
          <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5 " onClick={submitUpdate}>
            <CheckIcon className="h-5 w-5 text-gray-50 mr-1"/>
            确认
          </Button>
          <Button className="hover:bg-gray-500 mr-2 h-8 px-1.5 bg-gray-400" onClick={closeModal}>
            <XMarkIcon className="h-5 w-5 text-gray-50 mr-1"/>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}
'use client'

import Modal from 'react-modal';
import {Button} from "@/app/components/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {ExclamationCircleIcon, KeyIcon} from "@heroicons/react/24/outline";

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

export default function ChangePasswordModal({isOpen, closeModal, onSubmit}: {
  isOpen: boolean,
  closeModal: () => void,
  onSubmit: (oldPasswordP:string, newPasswordP:string) => void,
}) {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newPasswordAgain, setNewPasswordAgain] = useState<string>('')

  const onConfirm = () => {
    if (!oldPassword || !newPassword || !newPasswordAgain) {
      setErrorMessage("请输入密码")
      return
    }
    if (newPassword !== newPasswordAgain) {
      setErrorMessage("两次密码输入不一致")
      return
    }
    setErrorMessage('')
    onSubmit(oldPassword, newPassword)
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2 className="font-semibold w-[400px] mb-3">
          修改密码
        </h2>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block font-light text-gray-900"
            htmlFor="password"
          >
            旧密码
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="oldPassword"
              type="password"
              name="oldPassword"
              placeholder="请输入旧密码"
              required
              minLength={6}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
            />
            <KeyIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block font-light text-gray-900"
            htmlFor="password"
          >
            新密码
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="请输入新密码"
              required
              minLength={6}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            />
            <KeyIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block font-light text-gray-900"
            htmlFor="password"
          >
            确认新密码
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="passwordAgain"
              type="password"
              name="passwordAgain"
              placeholder="请再次输入密码"
              required
              minLength={6}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordAgain(e.target.value)}
            />
            <KeyIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
          </div>
        </div>
        <div className="flex items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-2"/>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <div className="flex flex-row-reverse mt-3">
          <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5 " onClick={onConfirm}>
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
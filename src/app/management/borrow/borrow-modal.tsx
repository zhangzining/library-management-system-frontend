'use client'

import Modal from 'react-modal';
import {Button} from "@/app/components/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {UserIcon} from "@heroicons/react/24/outline";

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

export default function BorrowModal({isOpen, closeModal, onConfirm}: {
  isOpen: boolean,
  closeModal: () => void,
  onConfirm: (username:string | undefined) => void
}) {

  const [username, setUsername] = useState<string>()

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
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
        <div className="flex flex-row-reverse mt-3">
          <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5 " onClick={() => onConfirm(username)}>
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
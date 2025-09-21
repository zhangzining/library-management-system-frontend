'use client'

import Link from 'next/link';
import NavLinks from '@/app/management/nav-links';
import {PowerIcon, WrenchScrewdriverIcon} from '@heroicons/react/24/outline';
import Logo from "@/app/components/managementLogo";
import {useAdminAuth, useAppDispatch} from "@/app/lib/hooks";
import {resetUserInfo} from "@/app/lib/features/userInfoSlice";
import ChangePasswordModal from "@/app/components/change-password-modal";
import {useState} from "react";
import {changePassword} from "@/app/lib/service/auth";

export default function SideNav() {
  useAdminAuth('ADMIN')
  const dispatch = useAppDispatch()

  const onLogOut = () => {
    dispatch(resetUserInfo())
  }

  const [openModal, setOpenModal] = useState<boolean>(false)

  const onSubmitPassword = (oldPassword:string, newPassword:string) => {
    changePassword({oldPassword: oldPassword, newPassword: newPassword})
      .then(() => {
        onLogOut()
        setOpenModal(false)
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  const onCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <ChangePasswordModal isOpen={openModal} onSubmit={onSubmitPassword} closeModal={onCloseModal}></ChangePasswordModal>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/management"
      >
        <div className="w-50 text-white">
          <Logo/>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={() => setOpenModal(true)}
        >
          <WrenchScrewdriverIcon className="w-6"/>
          <div className="hidden md:block">修改密码</div>
        </button>
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={onLogOut}
        >
          <PowerIcon className="w-6"/>
          <div className="hidden md:block">退出登录</div>
        </button>
      </div>
    </div>
  );
}

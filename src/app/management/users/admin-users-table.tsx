'use client'

import {Button} from "@/app/components/button";
import {FolderArrowDownIcon, LockClosedIcon, LockOpenIcon, PencilSquareIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import * as service from "@/app/lib/service/management"
import PassiveSearchBox from "@/app/components/passive-search-box";
import {getRoleNames, getStatusName, timestampToDateTime} from "@/app/lib/service/account";
import AdminUserUpdateModal from "@/app/management/users/admin-user-update-modal";
import ConfirmModal from "@/app/components/confirm-modal";
import BooksTable from "@/app/management/books/books-table";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import AdminUserCreationModal from "@/app/management/users/admin-user-creation-modal";

export default function AdminUserTable() {

  const [userList, setUserList] = useState<AdminUserDto[]>([])
  const [searchName, setSearchName] = useState<string>('')
  const [refreshVersion, setRefreshVersion] = useState<number>(1)
  const [openCreationModal, setOpenCreationModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<AdminUserDto>({} as AdminUserDto)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [confirmModalContent, setConfirmModalContent] = useState<string>('')

  useEffect(() => {
    service.getAdminUsers({username: searchName} as UserQueryParam)
      .then(resp => setUserList(resp))
      .catch(error => console.info(error.response?.data?.failedReason))
  }, [searchName, refreshVersion]);

  const openUpdateAdmin = (user: AdminUserDto) => {
    setCurrentUser(user)
    setOpenUpdateModal(true)
  }

  const onCloseModal = () => {
    setOpenCreationModal(false)
    setOpenUpdateModal(false)
    setOpenConfirmModal(false)
    setRefreshVersion(refreshVersion + 1)
  }

  const onOpenLockModal = (user: AdminUserDto) => {
    setCurrentUser(user)
    let content = ''
    if (user.status === 'LOCKED') {
      content = `确认解锁账户 ${user.username} 吗？`
    } else {
      content = `确认锁定账户 ${user.username} 吗？`
    }

    setConfirmModalContent(content)
    setOpenConfirmModal(true)
  }

  const onConfirmLock = () => {
    if (!currentUser) {
      return
    }
    let targetStatus = currentUser.status === "LOCKED" ? "ACTIVE" : "LOCKED"
    service.updateAdminUsers({id: currentUser.id, status: targetStatus} as AdminUserDto)
      .finally(() => {
        setOpenConfirmModal(false)
        setRefreshVersion(refreshVersion + 1)
      })
  }

  return (
    <div className="pt-2">

      <div className="w-full min-w-full flex align-middle">
        <div className="flex-1">
          <PassiveSearchBox placeholder="请输入用户名，输入 ENTER 确认" onSearchHandler={setSearchName}></PassiveSearchBox>
        </div>
        <div className="ml-2">
          <Button className="w-full hover:bg-blue-600" onClick={() => setOpenCreationModal(true)}>
            <PlusCircleIcon className="h-5 w-5 text-gray-50 mr-1"/>
            新增
          </Button>
        </div>
      </div>

      <AdminUserCreationModal isOpen={openCreationModal} label={'管理员创建'} closeModal={onCloseModal}/>
      <AdminUserUpdateModal isOpen={openUpdateModal} label={'管理员信息修改'} closeModal={onCloseModal} user={currentUser}/>
      <ConfirmModal isOpen={openConfirmModal} content={confirmModalContent} closeModal={onCloseModal}
                    onConfirm={onConfirmLock}/>
      <table className="hidden min-w-full rounded-md text-gray-900 md:table">
        <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-3 py-5 font-medium">
            用户名
          </th>
          {/*<th scope="col" className="px-3 py-5 font-medium">*/}
          {/*  邮箱*/}
          {/*</th>*/}
          <th scope="col" className="px-3 py-5 font-medium">
            权限
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            最近登陆日期
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            状态
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            操作
          </th>
        </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
        {userList.map((user) => (
          <tr key={user.id} className="group">
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {user.username}
            </td>
            {/*<td className="whitespace-nowrap bg-white px-3 py-5 text-sm">*/}
            {/*  {user.email}*/}
            {/*</td>*/}
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {getRoleNames(user.roles).map(name => <p key={name}>{name}</p>)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {timestampToDateTime(user.lastLoginTime)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {getStatusName(user.status)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {
                user.username === 'admin' ? null : (
                  <div className="flex flex-row items-center min-w-full">
                    {
                      user.status === 'LOCKED'
                        ? <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onOpenLockModal(user)}>
                          <LockOpenIcon className="h-5 w-5 text-gray-50 mr-1"/>
                          解锁
                        </Button>
                        : <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onOpenLockModal(user)}>
                          <LockClosedIcon className="h-5 w-5 text-gray-50 mr-1"/>
                          锁定
                        </Button>
                    }

                    <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => openUpdateAdmin(user)}>
                      <PencilSquareIcon className="h-5 w-5 text-gray-50 mr-1"/>
                      修改
                    </Button>
                  </div>
                )
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
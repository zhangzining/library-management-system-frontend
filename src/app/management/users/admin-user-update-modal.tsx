'use client'

import Modal from 'react-modal';
import React, {useEffect, useState} from "react";
import {Button} from "@/app/components/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ADMIN_PERMISSION_MAP} from "@/app/lib/service/account";
import * as service from "@/app/lib/service/management"

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

export default function AdminUserUpdateModal({label, isOpen, closeModal, user}: {
  label: string,
  isOpen: boolean,
  closeModal: () => void,
  user: AdminUserDto | null
}) {

  const [rolesConfigs, setRolesConfigs] = useState<CheckList[]>([])
  useEffect(() => {
    let arr = []
    let roles = !!user && user.roles ? user.roles : []
    for (const [key, value] of ADMIN_PERMISSION_MAP.entries()) {
      arr.push({
        value: key,
        name: value,
        checked: roles.includes(key)
      })
    }
    setRolesConfigs(arr)
  }, [user]);


  const updateRoleConfig = (value:string, checkStatus:boolean) => {
    setRolesConfigs(rolesConfigs.map(item => {
      if(item.value === value){
        item.checked = checkStatus
      }
      return item
    }))
  }

  const submitUpdate = () => {
    if (!user) {
      return
    }
    let roles = rolesConfigs.filter((item) => item.checked)
      .map(item => item.value)

    service.updateAdminUsers({id: user.id, roles: roles} as AdminUserDto)
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
          修改管理员信息
        </h2>
        <div>
          <div className="flex justify-around">
            <div className="text-left">权限</div>
            <div >
              {
                rolesConfigs.map(item => (
                  <div className="flex-col" key={item.value}>
                    <input type="checkbox"
                           id={item.value}
                           name={item.value}
                           value={item.name}
                           checked={item.checked}
                           onChange={e=> updateRoleConfig(item.value, e.target.checked)}
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
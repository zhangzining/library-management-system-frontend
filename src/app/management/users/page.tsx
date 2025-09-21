'use client'

import React from "react";
import AdminUserTable from "@/app/management/users/admin-users-table";
import {useAdminAuth, useAppSelector} from "@/app/lib/hooks";
import {getRoles} from "@/app/lib/features/userInfoSlice";

export default function Page() {
  useAdminAuth("ADMIN_USER_MANAGE")

  const userRoles = useAppSelector(getRoles);

  const showAdminUserTable = userRoles?.includes("ADMIN_USER_MANAGE")
  // const showAdminUserTable = true

  return (
    <main className="w-[1200px]">
      {
        showAdminUserTable ? (
          <div>
            <h1 className='mb-4 text-xl md:text-2xl'>
              管理员账户管理
            </h1>
            <div className="mt-6 flow-root min-w-full align-middle overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <AdminUserTable/>
            </div>

          </div>
        ) : null
      }
      {/*<h1 className='mb-4 text-xl md:text-2xl'>*/}
      {/*  用户账户管理*/}
      {/*</h1>*/}
      {/*<div className="mt-6 flow-root min-w-full align-middle overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">*/}
      {/*<AdminUserTable/>*/}
      {/*</div>*/}
    </main>
  )
}
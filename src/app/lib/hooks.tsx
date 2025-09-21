'use client'

import {useDispatch, useSelector, useStore} from "react-redux"
import type {AppDispatch, AppStore, RootState} from './store'
import {useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {isAdmin, isNormal, selectUserInfo} from "@/app/lib/features/userInfoSlice";

// 带上了范型的hook函数
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useNormalUserAuth = () => {
  const router = useRouter();
  const normalUserPermissions = useAppSelector(isNormal);

  useEffect(() => {
    if (!normalUserPermissions) {
      router.push('/management');
    }
  }, [router, normalUserPermissions]);
};

export const useAdminAuth = (requiredPermission: string) => {
  const router = useRouter();
  const pathName = usePathname()
  const adminUserPermissions = useAppSelector(isAdmin);

  const roles = useAppSelector(selectUserInfo).roles || []

  useEffect(() => {
    if (adminUserPermissions === undefined) {
      router.push('/login')
      return
    }

    if (!adminUserPermissions) {
      router.push('/home');
      return;
    }

    const hasPermission = roles.includes(requiredPermission);

    if (!hasPermission) {
      router.push('/management');
    }
  }, [requiredPermission, router, adminUserPermissions, roles, pathName]);
};
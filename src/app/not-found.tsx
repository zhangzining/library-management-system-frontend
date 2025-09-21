'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

/**
 * 默认404页面
 * 直接跳转到login页面
 */
export default function NotFound() {
  const {push} = useRouter()
  // useEffect(() => {
  //   push("/login")
  // })

  return <p>Page not found, will direct to login page soon</p>
}
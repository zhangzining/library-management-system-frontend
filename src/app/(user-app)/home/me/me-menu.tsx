'use client'

import {
  BookmarkSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  CubeIcon,
  PowerIcon
} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/app/lib/hooks";
import {resetUserInfo} from "@/app/lib/features/userInfoSlice";

export default function MeMenu() {

  const {push} = useRouter()
  const dispatch = useAppDispatch()

  const onLogOut = () => {
    push("/login")
    dispatch(resetUserInfo())
  }
  return (
    <div className="w-full flex items-center flex-col mt-3 md:mt-5 bg-white">

      <div className="flex flex-row w-full p-3 border-b">
        <CubeIcon className="w-6 text-gray-700 md:w-8"/>
        <p className="text-black flex-1 ml-4 md:text-lg">我的收藏</p>
        <ChevronRightIcon className="w-6 text-gray-300 md:w-8"/>
      </div>

      <div className="flex flex-row w-full p-3 border-b">
        <BookmarkSquareIcon className="w-6 text-gray-700 md:w-8"/>
        <p className="text-black flex-1 ml-4 md:text-lg">我的订阅</p>
        <ChevronRightIcon className="w-6 text-gray-300 md:w-8"/>
      </div>

      <div className="flex flex-row w-full p-3 border-b">
        <ClipboardDocumentCheckIcon className="w-6 text-gray-700 md:w-8"/>
        <p className="text-black flex-1 ml-4 md:text-lg">我的借阅</p>
        <ChevronRightIcon className="w-6 text-gray-300 md:w-8"/>
      </div>

      <div className="flex flex-row w-full p-3 border-b">
        <ClipboardDocumentCheckIcon className="w-6 text-gray-700 md:w-8"/>
        <p className="text-black flex-1 ml-4 md:text-lg">修改信息</p>
        <ChevronRightIcon className="w-6 text-gray-300 md:w-8"/>
      </div>

      <div className="flex flex-row w-full p-3 " onClick={onLogOut}>
        <PowerIcon className="w-6 text-gray-700 md:w-8"/>
        <p className="text-red-500 flex-1 ml-4 md:text-lg">退出登陆</p>
        <ChevronRightIcon className="w-6 text-gray-300 md:w-8 invisible"/>
      </div>


    </div>

  )
}
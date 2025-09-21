'use client'

import Image from "next/image";
import {useAppSelector} from "@/app/lib/hooks";
import {selectUserInfo} from "@/app/lib/features/userInfoSlice";

export default function Avatar() {

  const name = useAppSelector(selectUserInfo).name;
  return (
    <div className="flex items-center bg-white pt-10 px-5 pb-5">
      <Image
        src="/avatar.jpg"
        className="rounded-lg"
        alt={"用户头像"}
        width={80}
        height={80}
      />
      <div className="flex-1 flex-col ml-5">

        <p className="text-black font-semibold text-xl mb-2">活泼开朗大男孩</p>
        <p className="text-gray-500 text font-light">{`用户名:${name}`}</p>

      </div>
    </div>
  )
}
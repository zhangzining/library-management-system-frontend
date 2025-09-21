'use client'

import {ArrowLeftIcon, StarIcon} from "@heroicons/react/24/outline";
import {StarIcon as StaredIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useRouter} from "next/navigation";
import {IBook} from "@/app/lib/placeholder-data";

export default function TopNavBarDetail({item, onSwitchCollected}: {
  item: BookInfoDto
  onSwitchCollected: (id:number, currentStatus: boolean) => void
}) {
  const {back} = useRouter()

  return (
    <nav className="flex flex-row px-5 py-2 md:py-5 md:px-7 bg-white sticky top-0">
      <button className="py-2 text-center mr-auto ml-2 md:ml-3">
        <ArrowLeftIcon className="w-6 text-gray-700" onClick={() => back()}/>
      </button>
      <p className="my-auto font-semibold md:text-lg">{item.title}</p>
      <button className="py-2 text-center ml-auto mr-2 md:mr-3" onClick={() => onSwitchCollected(item.id, item.hadCollected)}>
        {
          item.hadCollected ? <StaredIcon className="w-6 text-yellow-400"/> : <StarIcon className="w-6 text-gray-500"/>
        }
      </button>

    </nav>
  )
}
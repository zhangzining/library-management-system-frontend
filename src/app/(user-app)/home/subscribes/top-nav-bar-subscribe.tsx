import {ArrowLeftIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function TopNavBarSubscribe({onDeleteAll}: {onDeleteAll: () => void}) {
  return (
      <nav className="flex flex-row py-2 px-5 md:py-5 md:px-7 bg-white sticky top-0">
        <button className="py-2 text-center invisible">
          <ArrowLeftIcon className="w-6 text-gray-700"/>
        </button>
        <p className="m-auto font-semibold md:text-lg h-6">订阅通知</p>
        <button className="py-2 w-6 text-center" onClick={onDeleteAll}>
          <TrashIcon className="w-5 text-gray-700"/>
        </button>
      </nav>
  )
}
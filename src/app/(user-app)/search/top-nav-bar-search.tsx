'use client'

import {ArrowLeftIcon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {KeyboardEventHandler, ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function TopNavBarSearch({onSearchHandler, placeholder, searchKeyword, setSearchKeyword}: {
  onSearchHandler: (keyword: string) => void,
  placeholder: string,
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void,
}) {
  const {back} = useRouter()

  const onEnterClicked = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter") {
      onSearchHandler(searchKeyword)
    }
  }

  return (
    <nav className="flex flex-row px-5 py-2 md:py-5 md:px-7 bg-white sticky top-0">
      <button className="py-2 text-center mr-auto ml-2 md:ml-3">
        <ArrowLeftIcon className="w-6 text-gray-700" onClick={() => back()}/>
      </button>
      <input
        className="bg-neutral-50 rounded-lg w-full mx-5 px-5 outline-0 "
        placeholder={placeholder}
        value={searchKeyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
        onKeyUp={onEnterClicked}
      />
      <button className="py-2 text-center ml-auto mr-2 md:mr-3" onClick={() => onSearchHandler(searchKeyword)}>
        <MagnifyingGlassIcon className="w-6 text-gray-700"/>
      </button>

    </nav>
  )
}
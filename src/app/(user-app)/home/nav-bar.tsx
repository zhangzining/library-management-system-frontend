'use client'

import clsx from "clsx";
import React, {ReactElement, useEffect, useState} from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  ChatBubbleLeftEllipsisIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import {usePathname, useRouter} from "next/navigation";

interface ITab {
  index: number,
  name: string,
  href: string,
  iconNormal: ReactElement,
  iconSelected: ReactElement,
}

const tabs: ITab[] = [
  {
    index: 0,
    name: "首页",
    href: "/",
    iconNormal: <HomeIcon className="w-6 text-gray-300"/>,
    iconSelected: <HomeIconSolid className="w-6 text-sky-500 "/>
  },
  {
    index: 1,
    name: "图书",
    href: "/books",
    iconNormal: <AcademicCapIcon className="w-6 text-gray-300"/>,
    iconSelected: <AcademicCapIconSolid className="w-6 text-sky-500"/>
  },
  {
    index: 2,
    name: "订阅",
    href: "/subscribes",
    iconNormal: <ChatBubbleLeftRightIcon className="w-6 text-gray-300"/>,
    iconSelected: <ChatBubbleLeftEllipsisIcon className="w-6 text-sky-500"/>
  },
  {
    index: 3,
    name: "我的",
    href: "/me",
    iconNormal: <UserCircleIcon className="w-6 text-gray-300"/>,
    iconSelected: <UserIcon className="w-6 text-sky-500"/>
  },
]

export default function NavBar({pathPrefix}: { pathPrefix: string }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {push} = useRouter()
  let path = usePathname()
  // rest nav tab index when nav back
  useEffect(() => {
    if (path.startsWith("/home")) {
      path = path.replace("/home", "")
      tabs.forEach((tab) => {
        if (path === tab.href) {
          setCurrentIndex(tab.index)
        }
      })
    }
  }, [path])

  const onTabClick = (tab: ITab) => {
    if (!tab) {
      console.error("Tab missing")
    } else {
      setCurrentIndex(tab.index)
      push(pathPrefix + '/' + tab.href)
    }
  }

  return (
    <div className="flex justify-items-center py-2 md:py-5 bg-white sticky bottom-0 mt-auto">
      {
        tabs.map(item =>
          (<NavBarItem
            key={item.index}
            tab={item}
            selectedIndex={currentIndex}
            onTabClick={onTabClick}
          ></NavBarItem>)
        )
      }
    </div>
  )
}

function NavBarItem({tab, selectedIndex, onTabClick}: {
  tab: ITab,
  selectedIndex: number,
  onTabClick: (tab: ITab) => void
}) {
  const isSelected = tab.index === selectedIndex

  return (
    <button className="flex flex-col mx-auto px-3 md:px-7" onClick={() => onTabClick(tab)}>
      <div className="mx-auto">
        {
          isSelected ? tab.iconSelected : tab.iconNormal
        }
      </div>
      <p
        className={clsx("font-semibold text-sm md:text-lg text-center", isSelected ? "text-sky-500" : "text-gray-300")}
      >{tab.name}</p>
    </button>
  )
}
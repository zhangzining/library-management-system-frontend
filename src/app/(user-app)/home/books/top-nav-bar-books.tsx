import {ChatBubbleOvalLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ReactNode} from "react";
import Link from "next/link";

export default function TopNavBarBooks({href}:{href:string}) {
  return (
    <nav className="flex flex-row px-5 py-2 md:py-5 md:px-7 bg-white sticky top-0">
      <Link
        href={href}
        className="py-2 text-center w-full bg-neutral-50 rounded-lg">
        <p className="inline-block align-middle font-light text-gray-400 ">搜索图书</p>
        <MagnifyingGlassIcon className="w-5 text-gray-400 inline-block align-middle "/>
      </Link>
    </nav>
  )
}
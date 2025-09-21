import {ChatBubbleOvalLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ReactNode} from "react";
import {useRouter} from "next/navigation";

export default function TopNavBarHome({children}:{children?: ReactNode}) {
  const {push} = useRouter();

  const gotoSearch = () => {
    push("/search")
  }

  const gotoMessage  = () => {
    push("/home/subscribes")
  }

  return (
    <nav className="flex flex-row py-2 px-5 md:py-5 md:px-7 bg-white sticky top-0">
      <button className="py-2 text-center mr-auto ml-2 md:ml-5" onClick={gotoMessage}>
        <ChatBubbleOvalLeftIcon className="w-6 text-gray-700"/>
      </button>
      {children}
      <button className="py-2 text-center ml-auto mr-2 md:mr-5" onClick={gotoSearch}>
        <MagnifyingGlassIcon className="w-6 text-gray-700"/>
      </button>
    </nav>
  )
}
import Image from "next/image";
import React from "react";
import LikeBar from "@/app/components/like-bar";
import {useRouter} from "next/navigation";
import {getImageUrl} from "@/app/lib/service/requests";

export default function SearchResult({searchResult}: {
  searchResult: Array<BookInfoDto>,
}) {
  const router = useRouter()

  const onItemClick = (bookId:number) => {
    router.push("/detail/" + bookId)
  }

  return (
    <div className="columns-1 mt-2 lg:columns-2 no-scroll-bar">
      {
        searchResult.map((item) => (
          <button
            key={item.id}
            className="w-full bg-white rounded-lg flex flex-row max-w-[800px] mx-auto  mb-2 md:pr-5 md:mb-4"
            onClick={() => onItemClick(item.id)}
          >
            <Image
              src={getImageUrl(item.coverImg)}
              className="h-[150px] sm:h-[150px] md:h-[180px] lg:h-[200px] flex-none w-auto rounded-lg"
              width="200"
              height="200"
              alt={item.title||'' }/>
            <div className="justify-between flex flex-col h-[150px] sm:h-[150px] md:h-[180px] lg:h-[200px] text-left">
              <p className='text-xl font-semibold p-2 md:p-3'>{item.title}</p>
              <p className='text-xs pb-1 px-2 md:px-3'>{item.author}</p>
              <p className='text-slate-700 font-light line-clamp-3 text-sm px-2 md:px-3'>{item.description}</p>

              <div className="invisible flex-grow"></div>

              <LikeBar item={item}/>
            </div>
          </button>
        ))
      }

    </div>
  )
}
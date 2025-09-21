import Image from "next/image";
import React from "react";
import LikeBar from "@/app/components/like-bar";
import OtherDetail from "@/app/detail/[id]/other-detail";
import {getImageUrl} from "@/app/lib/service/requests";

export default function DetailContent({item}: {
  item: BookInfoDto
}) {

  return (
    <div className="w-full flex flex-col columns-1 p-3 justify-items-center border-b">
      {
        item.coverImg ?
          <Image
            src={getImageUrl(item.coverImg ? item.coverImg : '')}
            alt={item.title}
            height='400'
            width='400'
            className="w-full max-w-[400px] md:max-w-[600px] mx-auto"
          />
          :
          (<div></div>)
      }
      <div className='w-full block my-2'>
        <p className='text-xl font-semibold p-2 md:p-3'>{item.title}</p>
        <p className='text-xs pb-1 px-2 md:px-3'>{item.author}</p>
        <p className='text-slate-700 font-light line-clamp-3 text-sm px-2 md:px-3'>{item.description}</p>
      </div>


      <div className="invisible flex-grow"></div>

      <LikeBar item={item}/>

      <OtherDetail item={item}/>
    </div>
  )
}
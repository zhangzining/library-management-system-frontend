import {HeartIcon as HeartedIcon, StarIcon as StaredIcon} from "@heroicons/react/24/solid";
import {ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, HeartIcon, StarIcon} from "@heroicons/react/24/outline";
import React from "react";

const iconSize = 'size-5 md:size-7 inline-block align-middle'

export default function LikeBar({item}: {
  item: BookInfoDto,
}) {
  const onSwitchCollected = () => {
  }

  const onSwitchLike = () => {
  }

  return (
    <div className="w-full flex flex-row px-2 md:px-5 md:py-2">
      <div className='mr-auto text-left ' onClick={(e) => {
        e.stopPropagation();
        onSwitchLike()
      }}>
        {
          item.hadSubscribed ?
            <HeartedIcon className={`${iconSize} text-red-400`}/> :
            <HeartIcon className={`${iconSize} text-gray-500`}/>
        }
        <span className="ml-1 inline-block align-middle font-light">{item.subscribedTimes}</span>
      </div>
      <div className='mx-auto text-left ' onClick={(e) => {
        e.stopPropagation();
        onSwitchCollected()
      }}>
        {
          item.hadCollected ?
            <StaredIcon className={`${iconSize} text-yellow-400`}/> :
            <StarIcon className={`${iconSize} text-gray-500`}/>
        }
        <span className="ml-1 inline-block align-middle font-light">{item.collectedTimes}</span>
      </div>
      <div className='ml-auto text-left'>
        {
          item.lendingStatus === 'BORROWED' ? (
              <>
                <ClipboardDocumentListIcon className={`${iconSize} text-gray-500`}/>
                <span className="mx-1 inline-block align-middle font-light">借阅中</span>
              </>
            ) :
            (item.lendingStatus === 'RETURNED' ? (
              <>
                <ClipboardDocumentCheckIcon className={`${iconSize} text-sky-500`}/>
                <span className="mx-1 inline-block align-middle font-light">借过</span>
              </>
            ) : (
              <>
                <ClipboardDocumentCheckIcon className={`${iconSize} text-sky-500 invisible`}/>
                <span className="mx-1 inline-block align-middle font-light invisible">未借阅</span>
              </>
            ))
        }
      </div>
    </div>

  )
}
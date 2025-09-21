'use client'

import React, {useEffect, useState} from "react";
import TopNavBarDetail from "@/app/detail/[id]/top-nav-bar-detail";
import DetailContent from "@/app/detail/[id]/detail-content";
import Subscribe from "@/app/components/subscribe";

import * as service from "@/app/lib/service/book"

interface IRouteParam {
  id: string
}

/**
 * 图书详情页面
 * /detail/[id]
 */
export default function BookDetail({params}:{params: PromiseLike<IRouteParam>}) {
  // 处理路由中的id
  const {id} = React.use(params);
  let bookId = Number.parseInt(id);

  const [book, setBook] = useState<BookInfoDto>({} as BookInfoDto)

  useEffect(() => {
    if (!id) {
      return
    }
    service.getBookById(bookId)
      .then(res => {
        setBook(res)
        setSubscribeStatus(res.hadSubscribed)
      })
      .catch(err => console.log(err))
  }, [bookId]);

  const [subscribeStatus, setSubscribeStatus] = useState<boolean>(false)
  const [isOnShelf, setIsOnShelf] = useState<boolean>(true)

  useEffect(() => {
    setIsOnShelf(book.locations && book.locations.length > 0 )
  }, []);

  const onSwitchSubscribeStatus = () => {
    if (subscribeStatus) {
      service.unsubscribe(bookId)
        .then(() => {
          setSubscribeStatus(!subscribeStatus)
        })
        .catch(err => console.log(err))
    } else {
      service.subscribe(bookId)
        .then(() => {
          setSubscribeStatus(!subscribeStatus)
        })
        .catch(err => console.log(err))
    }
  }

  const onSwitchCollected = (id: number, currentStatus: boolean) => {
    console.log("switch collected for ", id, currentStatus)
  }

  return (
    <div className="w-full md:container bg-neutral-50 min-h-max flex flex-col">
      {
        book
          ?
          (
            <div>
              <TopNavBarDetail
                item={book}
                onSwitchCollected={onSwitchCollected}/>
              <DetailContent
                item={book}/>

              {
                book.lendingStatus !== 'BORROWED' ?
                  <Subscribe
                    isOnShelf={isOnShelf}
                    subscribeStatus={subscribeStatus}
                    onSwitchSubscribeStatus={onSwitchSubscribeStatus}/>
                  : <div></div>
              }

            </div>
          )
          :
          (<div></div>)
      }


    </div>
  )
}
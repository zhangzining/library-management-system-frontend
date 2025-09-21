'use client'

import TopNavBarHome from "@/app/(user-app)/home/(home)/top-nav-bar-home";
import TwoColCardList from "@/app/(user-app)/home/(home)/two-col-card-list";
import {ICard} from "@/app/components/card";
import {bookList, IBook,} from "@/app/lib/placeholder-data";
import {ReactNode, useEffect, useState} from "react";
import {HeartIcon} from "@heroicons/react/24/outline";
import {HeartIcon as HeartedIcon} from "@heroicons/react/24/solid";
import {useNormalUserAuth} from "@/app/lib/hooks";
import * as service from "@/app/lib/service/book"

const iconSize = 'size-5 md:size-7 inline-block align-middle'

function getFooter(book: IBook): ReactNode {
  return (
    <div key={book.id} className='w-full p-2 md:p-3 flex justify-items-center'>
      {/*<div className='ml-auto'>*/}
      {/*  {*/}
      {/*    book.readStatus === 'reading' ?*/}
      {/*      <ClipboardDocumentListIcon className={`${iconSize} text-gray-500`}/> :*/}
      {/*      (book.readStatus === 'read' ?*/}
      {/*        <ClipboardDocumentCheckIcon className={`${iconSize} text-sky-500`}/> : null)*/}
      {/*  }*/}
      {/*  <span className="mx-1 inline-block align-middle font-light">{*/}
      {/*    book.readStatus === 'reading' ?*/}
      {/*      "正在读" :*/}
      {/*      (book.readStatus === 'read' ? '已读完' : null)*/}
      {/*  }</span>*/}
      {/*</div>*/}

      <div className='ml-auto text-left leading-6'>
        {
          book.liked ?
            <HeartedIcon className={`${iconSize} text-red-400`}/> :
            <HeartIcon className={`${iconSize} text-gray-500`}/>
        }
        <span className="ml-1 inline-block align-middle font-light">{book.likeTimes}</span>
      </div>
      {/*<div className='mx-auto'>*/}
      {/*  {*/}
      {/*    book.collected ?*/}
      {/*      <StaredIcon className={`${iconSize} text-yellow-400`}/> :*/}
      {/*      <StarIcon className={`${iconSize} text-gray-500`}/>*/}
      {/*  }*/}
      {/*  <span className="ml-1 inline-block align-middle font-light">{book.collectTimes}</span>*/}
      {/*</div>*/}

    </div>
  )
}

/**
 * 首页
 * /home
 */
export default function HomePage() {
  useNormalUserAuth()

  const [bookList1, setBookList1] = useState<ICard[]>()
  const [bookList2, setBookList2] = useState<ICard[]>()
  const [bookList3, setBookList3] = useState<ICard[]>()

  const getBooks = (setter: (items: ICard[]) => void) => {
    service.getBookRecommendation()
      .then(res => setter(res.map<ICard>((item) => ({
        id: item.id,
        key: item.id + '',
        name: item.title,
        desc: item.description || '',
        coverImg: item.coverImg || '',
        children: null,
        footer: getFooter({
          liked: false,
          likeTimes: 0
        } as IBook),
        author: item.author || ''
      }))))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBooks(setBookList1)
    getBooks(setBookList2)
    getBooks(setBookList3)
  }, [])


  const bookCardList: ICard[] = bookList.map<ICard>((item) => ({
    id: item.id,
    key: item.id + '',
    name: item.name,
    desc: item.description,
    coverImg: item.coverImg,
    children: null,
    footer: getFooter(item),
    author: item.author
  }))

  return (
    <div className="min-h-full">
      <TopNavBarHome>
        <p className="my-auto font-semibold md:text-lg">掌上借阅</p>
      </TopNavBarHome>
      <div className="h-max overflow-scroll">
        <TwoColCardList title='今日推荐' dataList={bookList1 || []}/>
        <TwoColCardList title='月度好书' dataList={bookList2 || []}/>
        <TwoColCardList title='新书上架' dataList={bookList3 || []}/>
      </div>
    </div>
  )
}

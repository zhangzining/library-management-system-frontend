'use client'

import React, {useEffect, useState} from "react";
import BorrowingTable from "@/app/management/borrow/borrowing-table";
import PassiveSearchBox from "@/app/components/passive-search-box";
import * as service from "@/app/lib/service/management"

export default function Page() {

  const [searchContent, setSearchContent] = useState<string>('9787508685465')
  const [bookLendingStatus, setBookLendingStatus] = useState<BookLendingStatusDto[]>([])

  const getLendingStatus = () => {
    if (!searchContent){
      return
    }
    service.getLendingStatue(searchContent)
      .then(resp => {
        setBookLendingStatus(resp)
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  useEffect(() => {
    getLendingStatus()
  }, [searchContent]);

  return (
    <main className="w-[1200px]">
      <h1 className='mb-4 text-xl md:text-2xl'>
        借阅管理
      </h1>

      <div className="w-full min-w-full flex align-middle">
        <div className="flex-1">
          <PassiveSearchBox placeholder="请输入 ISBN 号" onSearchHandler={setSearchContent} ></PassiveSearchBox>
        </div>
      </div>
      <div className="mt-6 flow-root min-w-full align-middle overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
        <BorrowingTable statusList={bookLendingStatus} onRefreshHandler={getLendingStatus}/>
      </div>
    </main>
  )
}
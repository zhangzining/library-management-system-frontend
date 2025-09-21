'use client'

import PassiveSearchBox from "@/app/components/passive-search-box";
import React, {ChangeEventHandler, useEffect, useRef, useState} from "react";
import {FolderArrowDownIcon, PlusCircleIcon,} from "@heroicons/react/20/solid";
import {Button} from "@/app/components/button";
import BooksTable from "@/app/management/books/books-table";
import {useAdminAuth} from "@/app/lib/hooks";
import * as service from "@/app/lib/service/management"
import {showToast, hideToast} from '@/app/lib/features/toastSlice';

import {store} from '@/app/lib/store';

const DEFAULT_PAGE_SIZE = 150

export default function Page() {
  useAdminAuth("BOOK_MANAGE")

  const [bookList, setBookList] = useState<BookInfoDto[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentPageSize, setCurrentPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  useEffect(() => {
    fetchData()
  }, [searchKeyword]);

  const fetchData = () => {
    service.getBooks({page: currentPage, size: currentPageSize, title: searchKeyword} as BookQueryParam)
      .then(resp => {
        setBookList(resp.content)
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  const fileInputRef = useRef(null);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      service.importBooks(formData)
        .then(resp => {
          let failedAmount = 0
          let successAmount = 0

          resp.forEach(item => {
            failedAmount += item.failedAmount || 0
            successAmount += item.successAmount || 0
          })

          const message = failedAmount === 0 ? `导入成功 ${successAmount} 本书 (${resp.length}个文件)`:`导入失败 ${failedAmount} 本书 (${resp.length}个文件)`
          store.dispatch(showToast(message))
          setTimeout(()=> {store.dispatch(hideToast())}, 6000)
        })
        .catch(error => console.info(error.response?.data?.failedReason))
    }
  }

  const onOpenInput = () => {
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.click();
    }
  }

  return (
    <main className="w-[1200px]">
      <h1 className='mb-4 text-xl md:text-2xl'>
        图书管理
      </h1>

      <div className="w-full min-w-full flex align-middle">
        <div className="flex-1">
          <PassiveSearchBox placeholder="请输入图书名称" onSearchHandler={setSearchKeyword}></PassiveSearchBox>
        </div>
        <div className="ml-5">
          <label htmlFor="uploadBooks" onClick={onOpenInput}>
            <Button className="w-full hover:bg-blue-600">
              <FolderArrowDownIcon className="h-5 w-5 text-gray-50 mr-1"/>
              导入
            </Button>
          </label>
          <input type="file" name="uploadBooks" id="uploadBooks" className="hidden" ref={fileInputRef}
                 onChange={onFileSelected}/>
        </div>
        {/*<div className="ml-2">*/}
        {/*  <Button className="w-full hover:bg-blue-600">*/}
        {/*    <PlusCircleIcon className="h-5 w-5 text-gray-50 mr-1"/>*/}
        {/*    新增*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>

      <div className="mt-6 flow-root min-w-full align-middle overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
        <BooksTable bookList={bookList} fetchData={fetchData}/>
      </div>
    </main>
  )
}
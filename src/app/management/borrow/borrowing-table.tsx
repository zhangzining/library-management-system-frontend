import {Button} from "@/app/components/button";
import {ArrowUpTrayIcon, ArrowDownTrayIcon, LockClosedIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";
import {timestampToDateTime} from "@/app/lib/service/account";
import ConfirmModal from "@/app/components/confirm-modal";
import * as service from "@/app/lib/service/management"
import {showToast, hideToast} from '@/app/lib/features/toastSlice';
import {store} from "@/app/lib/store";
import BorrowModal from "@/app/management/borrow/borrow-modal";


export default function BorrowingTable({statusList, onRefreshHandler}: { statusList: BookLendingStatusDto[], onRefreshHandler:() => void }) {

  const [bookId, setBookId] = useState<number | undefined>()
  const [userId, setUserId] = useState<number | undefined>()
  const [locationId, setLocationId] = useState<number | undefined>()
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openBorrowModal, setOpenBorrowModal] = useState<boolean>(false)

  const onCloseModal = () => {
    setBookId(undefined)
    setUserId(undefined)
    setLocationId(undefined)
    setOpenConfirmModal(false)
    setOpenBorrowModal(false)
  }

  const onConfirmReturn = () => {
    if (!userId || !bookId) {
      console.error("选中的 userId 或 bookId 为空")
      return
    }
    service.returnBook({userId: userId, bookId: bookId} as BookLendingRequestDto)
      .then(() => {
        store.dispatch(showToast("归还成功"))
        setTimeout(()=> {store.dispatch(hideToast())}, 6000)
        onRefreshHandler()
        onCloseModal()
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  const onConfirmBorrow = (username: string | undefined) => {
    if (!username) {
      return
    }
    service.borrowBook({locationId: locationId, bookId: bookId, username: username} as BookLendingRequestDto)
      .then(() => {
        store.dispatch(showToast("借阅成功"))
        setTimeout(()=> {store.dispatch(hideToast())}, 6000)
        onRefreshHandler()
        onCloseModal()
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  const onClickReturn = (userId:number | null, bookId:number) => {
    if (!userId || !bookId) {
      console.error("选中的 userId 或 bookId 为空")
      return
    }
    setBookId(bookId)
    setUserId(userId)
    setOpenConfirmModal(true)
  }

  const onClickBorrow = (locationId:number | null, bookId:number) => {
    if (!locationId || !bookId) {
      console.error("选中的 locationId 或 bookId 为空")
      return
    }
    setBookId(bookId)
    setLocationId(locationId)
    setOpenBorrowModal(true)
  }

  const getOperationButton = (item: BookLendingStatusDto) => {
    if (!item.locationId && !item.userId) {
      return (
        <Button className="bg-gray-400 mr-2 h-8 px-1.5 hover:bg-gray-500 active:bg-gray-500" disabled>
          <LockClosedIcon className="h-5 w-5 text-gray-50 mr-1"/>
          未上架
        </Button>
      )
    }
    if (item.locationId) {
      return (
        <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onClickBorrow(item.locationId, item.bookId)}>
          <ArrowUpTrayIcon className="h-5 w-5 text-gray-50 mr-1"/>
          出借
        </Button>
      )
    }
    if (item.userId) {
      return (
        <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onClickReturn(item.userId, item.bookId)}>
          <ArrowDownTrayIcon className="h-5 w-5 text-gray-50 mr-1"/>
          归还
        </Button>
      )
    }
  }

  const getLocationString = (item: BookLendingStatusDto) => {
    if (!item.locationId && !item.userId) {
      return '未上架'
    }
    if (item.locationId) {
      return `${item.locationDescription} : ${item.replicationNumber} 本`
    }
    if (item.userId) {
      return '已借出'
    }
  }

  const getItemKey = (item: BookLendingStatusDto) => {
    return `${item.bookId}-${(item.userId ? item.userId : 0)}-${(item.locationId ? item.locationId : 0)}`
  }

  return (
    <div>
      <BorrowModal isOpen={openBorrowModal} closeModal={onCloseModal} onConfirm={onConfirmBorrow}/>
      <ConfirmModal isOpen={openConfirmModal} content={"确认归还图书?"} closeModal={onCloseModal} onConfirm={onConfirmReturn}/>
      <table className="hidden min-w-full rounded-md text-gray-900 md:table">
        <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-3 py-5 font-medium">
            书名
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            位置
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            借阅用户名
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            借阅时间
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            操作
          </th>
        </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
        {statusList.map((statusDto) => (
          <tr key={getItemKey(statusDto)} className="group">
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {statusDto.bookName}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {getLocationString(statusDto)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {statusDto.username}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {timestampToDateTime(statusDto.borrowTime)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              <div className="flex flex-row items-center min-w-full">
                {getOperationButton(statusDto)}
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  )
}
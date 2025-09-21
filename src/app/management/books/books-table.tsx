import Image from "next/image";
import {Button} from "@/app/components/button";
import {DocumentChartBarIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";
import {getImageUrl} from "@/app/lib/service/requests";
import ViewBookDetail from "@/app/management/books/view-book-detail";
import PlaceBookModal from "@/app/management/books/place-book-modal";

export default function BooksTable({bookList, fetchData}:{bookList:BookInfoDto[], fetchData:() => void}) {

  const [selectedBook, setSelectedBook] = useState<BookInfoDto>({} as BookInfoDto)
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)

  const onViewDetail = (book: BookInfoDto) => {
    setSelectedBook(book)
    setOpenDetailModal(true)
  }

  const onUpdateBook = (book: BookInfoDto) => {
    setSelectedBook(book)
    setOpenUpdateModal(true)
  }

  const onCloseModals = () => {
    setSelectedBook({} as BookInfoDto)
    setOpenDetailModal(false)
    setOpenUpdateModal(false)
    fetchData()
  }

  return (
    <div>
      <ViewBookDetail book={selectedBook} isOpen={openDetailModal} closeModal={onCloseModals} label={selectedBook.title}/>
      <PlaceBookModal book={selectedBook} isOpen={openUpdateModal} closeModal={onCloseModals} label={selectedBook.title}/>
      <table className="hidden min-w-full rounded-md text-gray-900 md:table">
        <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-3 py-5 font-medium">
            图片
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            书名
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            出版社
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            索书号
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            位置
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            总数/可借数
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            操作
          </th>
        </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
        {bookList.map((book) => (
          <tr key={book.id} className="group">
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              <Image
                src={getImageUrl(book.coverImg)}
                className="rounded-lg"
                alt={`${book.title}'s profile picture`}
                width={70}
                height={70}
              />
            </td>

            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {book.title}
            </td>

            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {book.publisher}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {book.indexNumber}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {book.locations.map(location => <p
                key={location.id}>{location.description} : {location.replicationNumber}本</p>)}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              {book.totalReplicationAmount}/{book.availableReplicationAmount}
            </td>
            <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
              <div className="flex flex-row items-center min-w-full">
                <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onViewDetail(book)}>
                  <DocumentChartBarIcon className="h-5 w-5 text-gray-50 mr-1"/>
                  详情
                </Button>
                <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5" onClick={() => onUpdateBook(book)}>
                  <PencilSquareIcon className="h-5 w-5 text-gray-50 mr-1"/>
                  上架管理
                </Button>
                {/*<Button className="hover:bg-blue-600 h-8 px-1.5">*/}
                {/*  <TrashIcon className="h-5 w-5 text-gray-50 mr-1"/>*/}
                {/*  删除*/}
                {/*</Button>*/}
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
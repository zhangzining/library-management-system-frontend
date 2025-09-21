'use client'

import Modal from 'react-modal';
import React from "react";
import {Button} from "@/app/components/button";
import {XMarkIcon} from "@heroicons/react/24/solid";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0.375rem',
    backgroundColor: 'rgb(243 244 246)',
    border: 0,
    width: '700px'
  },
  overlay: {
    opacity: 0.9,
    backgroundColor: 'rgb(249 250 251)',
  }
};

export default function ViewBookDetail({label, isOpen, closeModal, book}: {
  label: string,
  isOpen: boolean,
  closeModal: () => void,
  book: BookInfoDto
}) {

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={label}
        ariaHideApp={false}
      >
        <h2 className="font-semibold w-[300px] mb-3">
          图书详情
        </h2>
        <div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">书名</div>
            <div className="text-center w-[300px] inline-block">{book.title}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">作者</div>
            <div className="text-center w-[300px] inline-block">{book.author}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">出版社</div>
            <div className="text-center w-[300px] inline-block">{book.publisher}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">ISBN</div>
            <div className="text-center w-[300px] inline-block">{book.isbn}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">索书号</div>
            <div className="text-center w-[300px] inline-block">{book.indexNumber}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">分类</div>
            <div className="text-center w-[300px] inline-block">{book.category}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">语言</div>
            <div className="text-center w-[300px] inline-block">{book.language}</div>
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold w-[100px] inline-block">上架位置</div>
            <div className="text-center w-[300px] inline-block">
              {
                book.locations && book.locations.length > 0
                  ?
                  book.locations.map(location => <p
                    key={location.id}>{location.description} : {location.replicationNumber}本</p>)
                  :
                  <p>暂未上架</p>
              }
            </div>
          </div>

          <div className="border-t-2 mt-3">
            <h2 className="text-left font-semibold mb-1">描述</h2>
            <p>{book.description}</p>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-3">
          <Button className="hover:bg-gray-500 mr-2 h-8 px-1.5 bg-gray-400" onClick={closeModal}>
            <XMarkIcon className="h-5 w-5 text-gray-50 mr-1"/>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}
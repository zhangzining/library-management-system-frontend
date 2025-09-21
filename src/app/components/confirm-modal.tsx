'use client'

import Modal from 'react-modal';
import {Button} from "@/app/components/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import React from "react";

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
    border: 0
  },
  overlay: {
    opacity: 0.9,
    backgroundColor: 'rgb(249 250 251)',
  }
};

export default function ConfirmModal({isOpen, closeModal, onConfirm, content}: {
  isOpen: boolean,
  closeModal: () => void,
  onConfirm: () => void,
  content: string | null
}) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2 className="font-semibold w-[400px] mb-3">
          {content}
        </h2>
        <div className="flex flex-row-reverse mt-3">
          <Button className="hover:bg-blue-600 mr-2 h-8 px-1.5 " onClick={onConfirm}>
            <CheckIcon className="h-5 w-5 text-gray-50 mr-1"/>
            确认
          </Button>
          <Button className="hover:bg-gray-500 mr-2 h-8 px-1.5 bg-gray-400" onClick={closeModal}>
            <XMarkIcon className="h-5 w-5 text-gray-50 mr-1"/>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}
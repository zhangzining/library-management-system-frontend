'use client'

import Modal from 'react-modal';
import React, {useEffect, useState} from "react";
import {Button} from "@/app/components/button";
import {XMarkIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {CheckIcon} from "@heroicons/react/24/outline";

import * as service from "@/app/lib/service/management"
import {showToast, hideToast} from '@/app/lib/features/toastSlice';

import {store} from '@/app/lib/store';
import {bindBookToLocation} from "@/app/lib/service/management";

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
    width: '900px'
  },
  overlay: {
    opacity: 0.9,
    backgroundColor: 'rgb(249 250 251)',
  }
};

const emptyLocation: () => LocationDto = () => {
  return {
    id: null,
    buildingName: null,
    buildingLevel: null,
    roomName: null,
    shelfNumber: null,
    shelfLevelNumber: null,
    description: null,
    replicationNumber: null,
  }
}

export default function PlaceBookModal({label, isOpen, closeModal, book}: {
  label: string,
  isOpen: boolean,
  closeModal: () => void,
  book: BookInfoDto
}) {

  const [locations, setLocations] = useState<LocationDto[]>()

  useEffect(() => {
    console.log(book.locations)
    if (book.locations) {
      setLocations([...book.locations, emptyLocation()])
      console.log(locations)
    } else {
      setLocations([emptyLocation()])
      console.log(locations)
    }
  }, [isOpen]);

  const onUpdateBuildingName = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].buildingName = value
      setLocations(newLocations)
    }
  }
  const onUpdateBuildingLevel = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].buildingLevel = value
      setLocations(newLocations)
    }
  }
  const onUpdateRoomName = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].roomName = value
      setLocations(newLocations)
    }
  }
  const onUpdateShelfNumber = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].shelfNumber = value
      setLocations(newLocations)
    }
  }
  const onUpdateShelfLevelNumber = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].shelfLevelNumber = value
      setLocations(newLocations)
    }
  }
  const onUpdateReplicationNumber = (index: number, value: string) => {
    if (locations) {
      const newLocations: LocationDto[] = [...locations]
      newLocations[index].replicationNumber = parseInt(value)
      setLocations(newLocations)
    }
  }

  const onConfirm = (index: number) => {
    if (!locations || !locations[index]) {
      return
    }
    console.log("submit====", locations[index])
    service.bindBookToLocation(locations[index], book.id)
      .then(() => {
        store.dispatch(showToast("修改成功"))
        setTimeout(()=> {store.dispatch(hideToast())}, 6000)
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={label}
        ariaHideApp={false}
      >
        <h2 className="font-semibold w-[800px] mb-3">
          上架管理
        </h2>
        <div>
          <div className="min-w-full border-t-2 mt-5">

            {
              locations?.map((location: LocationDto, index: number) => (
                <div key={index} className="flex flex-row items-center min-w-full mb-2">
                  <div>
                    <select
                      name="buildingName"
                      id="buildingName"
                      value={location.buildingName || ''}
                      onChange={(event) => onUpdateBuildingName(index, event.target.value)}
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[9rem] text-sm outline-2 placeholder:text-gray-500">
                      <option value="">--请选择--</option>
                      <option value="新校区图书馆">新校区图书馆</option>
                      <option value="老校区图书馆">老校区图书馆</option>
                    </select>
                  </div>
                  <div className="ml-1">
                    <input
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[6rem] text-sm outline-2 placeholder:text-gray-500"
                      id="buildingLevel"
                      type="number"
                      name="buildingLevel"
                      placeholder="楼层"
                      required
                      minLength={0}
                      value={location.buildingLevel || ''}
                      onChange={(event) => onUpdateBuildingLevel(index, event.target.value)}
                    />
                  </div>
                  <div className="mx-1">楼</div>
                  <div>
                    <input
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[6rem] text-sm outline-2 placeholder:text-gray-500"
                      id="roomName"
                      type="number"
                      name="roomName"
                      placeholder="房间"
                      required
                      value={location.roomName || ''}
                      onChange={(event) => onUpdateRoomName(index, event.target.value)}
                    />
                  </div>
                  <div className="mx-1">室</div>
                  <div>
                    <input
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[6rem] text-sm outline-2 placeholder:text-gray-500"
                      id="shelfNumber"
                      type="number"
                      name="shelfNumber"
                      placeholder="书架号"
                      required
                      value={location.shelfNumber || ''}
                      onChange={(event) => onUpdateShelfNumber(index, event.target.value)}
                    />
                  </div>
                  <div className="mx-1">架</div>
                  <div>
                    <input
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[6rem] text-sm outline-2 placeholder:text-gray-500"
                      id="shelfLevelNumber"
                      type="number"
                      name="shelfLevelNumber"
                      placeholder="书架层号"
                      required
                      value={location.shelfLevelNumber || ''}
                      onChange={(event) => onUpdateShelfLevelNumber(index, event.target.value)}
                    />
                  </div>
                  <div className="mx-1">层</div>
                  <div>
                    <input
                      className="block rounded-md border border-gray-200 py-[3px] pl-3 w-[6rem] text-sm outline-2 placeholder:text-gray-500"
                      id="replicationNumber"
                      type="number"
                      name="replicationNumber"
                      placeholder="数量"
                      required
                      value={location.replicationNumber || ''}
                      onChange={(event) => onUpdateReplicationNumber(index, event.target.value)}
                    />
                  </div>
                  <div className="mx-1">本</div>
                  <div className="ml-auto">
                    <Button className="hover:bg-blue-600 h-8" onClick={() => onConfirm(index)}>
                      <CheckIcon className="h-5 w-5 text-gray-50"/>
                    </Button>
                  </div>
                </div>
              ))
            }
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
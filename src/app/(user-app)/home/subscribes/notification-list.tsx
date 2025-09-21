import React from "react";
import NotificationListItem from "@/app/(user-app)/home/subscribes/notification-list-item";

export default function NotificationList({itemList}: { itemList: NotificationDto[] }) {

  if (!itemList ||itemList.length === 0) {
    return <p className="text-neutral-300 text-center p-2 w-full mt-4">暂无通知</p>
  }

  return (
    <div className="w-full flex flex-col">
      {
        itemList.map(item => (
          <NotificationListItem key={item.id} item={item}/>
        ))
      }
    </div>
  )
}
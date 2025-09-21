'use client'

import React, {useEffect, useState} from "react";
import TopNavBarSubscribe from "@/app/(user-app)/home/subscribes/top-nav-bar-subscribe";
import NotificationList from "@/app/(user-app)/home/subscribes/notification-list";

import * as service from "@/app/lib/service/book"


export default function SubscribePage() {

  const [notifications, setNotifications] = useState<NotificationDto[]>()

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = () => {
    service.getAllNotification()
      .then(res => setNotifications(res))
      .catch(err => console.log(err))
  }

  const readAllNotifications = () => {
    service.readAllNotification()
      .then(() => getNotifications())
      .catch(err => console.log(err))
  }

  return (
    <div className="w-full md:container bg-neutral-50 min-h-screen">
      <TopNavBarSubscribe onDeleteAll={readAllNotifications}/>
      <NotificationList itemList={notifications || []}/>
    </div>
  )
}

'use client'

import Avatar from "@/app/(user-app)/home/me/avatar";
import MeMenu from "@/app/(user-app)/home/me/me-menu";

export default function MePage() {

  return (
    <div className="min-h-full w-full ">
      <Avatar/>
      <MeMenu/>
    </div>
  )
}

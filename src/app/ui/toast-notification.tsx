'use client'
import {useAppSelector} from "@/app/lib/hooks";

export default function ToastNotification({}) {
  const {message, isVisible} = useAppSelector(state => state.toastMessage);

  return (
    <div
      className="text-gray-00 tran fixed z-20 h-[52px] -top-2 right-2 pl-4 pr-4 bg-white transition-all  duration-300 ease-in"
      style={{
        transform: isVisible ? 'translateY(30%)' : 'translateY(-100%)',
      }}>
      <div className='flex items-center justify-between p-2 bg-blue-600 shadow-xl rounded-lg'>
        <div className='flex items-center'>
          <h1 className="text-white text-md px-4">{message}</h1>
        </div>
      </div>
    </div>
  )
}
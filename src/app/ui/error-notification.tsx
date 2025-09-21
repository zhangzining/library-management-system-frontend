'use client'
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {clearUnAuth} from "@/app/lib/features/errorSlice";

export default function ErrorNotification({}) {
  const {push} = useRouter()
  const {message, isVisible, unAuth} = useAppSelector(state => state.errorMessage);
  const dispatch = useAppDispatch()
  useEffect(() => {

    if (unAuth) {
      push('/login')
      dispatch(clearUnAuth())
    }
  }, [unAuth]);

  return (
    <div
      className="text-gray-00 tran fixed z-20 h-[52px] -top-2 right-2 pl-4 pr-4 bg-white transition-all  duration-300 ease-in"
      style={{
        transform: isVisible ? 'translateY(30%)' : 'translateY(-100%)',
      }}>
      <div className='flex items-center justify-between p-2 bg-rose-400 shadow-xl rounded-lg'>
        <div className='flex items-center'>
          <h1 className="text-gray-00 text-md px-4">{message}</h1>
        </div>
      </div>
    </div>
  )
}
import React from "react";

export default function LoadMore({onLoadMoreResult, hadMoreResult} :{
  hadMoreResult: boolean,
  onLoadMoreResult: () => void
}) {
  return (
    <div className='w-full'>
      {
        hadMoreResult ? (
          <button
            onClick={() => onLoadMoreResult()}
            className='mx-auto w-full py-2 hover:text-sky-500 md:text-xl md:py-5'>加载更多... </button>
        ) : (
          <p className='text-center w-full py-2 text-gray-400 md:text-xl md:py-5'>到底啦...</p>
        )
      }
    </div>
  )
}
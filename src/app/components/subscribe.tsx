import clsx from "clsx";

export default function Subscribe({subscribeStatus, isOnShelf, onSwitchSubscribeStatus}: {
  subscribeStatus: boolean,
  isOnShelf: boolean,
  onSwitchSubscribeStatus: () => void
}) {
  if (isOnShelf) {
    // 如果是有在架图书，不需要订阅功能
    return <></>;
  }

  return (
    <div className='w-full justify-items-center flex mt-auto mb-9'>
      <button
        onClick={onSwitchSubscribeStatus}
        className={clsx(
        'font-semibold rounded-lg mx-auto px-4 py-2 text-white',
          subscribeStatus ? 'bg-orange-400' : 'bg-sky-500'
        )}
      >{subscribeStatus ? '取消订阅通知' : '订阅上架通知'}</button>
    </div>
  )
}
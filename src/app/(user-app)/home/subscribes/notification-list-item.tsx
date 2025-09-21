export default function NotificationListItem({item}: {
  item: NotificationDto,
}) {
  const formatDate = (date: string) => {
    return date.replace("T"," ").replace("Z", "")
  }

  return (
    <div className="w-full p-3 bg-white rounded-xl md:rounded-3xl mt-2">
      <p className="font-semibold text-lg">{item.title}</p>
      <p className="py-1">{item.content}</p>
      <p className="text-neutral-300">{formatDate(item.creationTime)}</p>
    </div>
  )
}
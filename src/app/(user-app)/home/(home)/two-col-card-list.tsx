import Card, {ICard} from "@/app/components/card";

export default function TwoColCardList({title,  dataList}: {
  title?: string,
  dataList: ICard[]
}) {

  return (
    <div className="p-2">
      {
        !!title ? <p className="font-bold text-xl pb-2 pl-1 md:pl-3">{title}</p> : null
      }

      <div className="columns-2 no-scroll-bar">
        {
          dataList.map(item => (
            <Card key={item.key} card={item}></Card>
          ))
        }
      </div>

      {/*{*/}
      {/*  !!loadMore ?*/}
      {/*    <button*/}
      {/*      onClick={loadMore}*/}
      {/*      className='mx-auto w-full py-2 hover:text-sky-500 md:text-xl md:py-5'*/}
      {/*    >查看更多...</button>*/}
      {/*    : null*/}
      {/*}*/}
    </div>
  )
}
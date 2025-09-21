import Image from "next/image";
import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {getImageUrl} from "@/app/lib/service/requests";

export interface ICard {
  id: number
  key: string,
  name: string,
  author?: string,
  desc: string,
  coverImg?: string
  children?: ReactNode,
  footer?: ReactNode
}

export default function Card({card}: { card: ICard }) {
  const router = useRouter()

  const gotoDetail = (id: number) => {
    router.push("/detail/" + id)
  }

  return (
    <div className='bg-white w-full mb-1 rounded-lg' onClick={() => gotoDetail(card.id)}>
      <Image
        width={20}
        height={20}
        layout="responsive"
        src={getImageUrl(!!card.coverImg ? card.coverImg : '')}
        alt={card.name}/>
      {
        !!card.children ? card.children :
          <>
            <p className='text-xl font-semibold p-2 md:p-3'>{card.name}</p>
            <p className='text-xs pb-1 px-2 md:px-3'>{card.author}</p>
            <p className='text-slate-700 font-light line-clamp-3 text-sm px-2 md:px-3'>{card.desc}</p>
          </>
      }
      {
        card.footer
      }

    </div>
  )
}
import {useEffect, useState} from "react";
import SearchResult from "@/app/components/search-result";
import LoadMore from "@/app/components/load-more";
import * as service from "@/app/lib/service/book";

interface ITab {
  index: number,
  name: string
}

const PAGE_SIZE = 5

export default function BookFilterWithTab() {
  const [bookCategoryTabs, setBookCategoryTabs] = useState<ITab[]>([])
  const [bookList, setBookList] = useState<BookInfoDto[]>([])

  const [currentPageSize, setCurrentPageSize] = useState<number>(PAGE_SIZE)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [hadMoreResult, setHadMoreResult] = useState<boolean>(true)

  // 加载图书类别
  useEffect(() => {
    service.getBooksCategories()
      .then(res => {
        let tabs: ITab[] = []
        for (const [index, item] of res.entries()) {
          tabs.push({index: index, name: item})
        }
        setBookCategoryTabs(tabs)
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }, []);

  // 当切换tab或者修改pageSize就重新加载
  useEffect(() => {
    if (bookCategoryTabs.length === 0) {
      return
    }

    let categoryTab = bookCategoryTabs.filter(item => item.index === currentIndex)[0]
    service.getBooks({page: 0, size: currentPageSize, category: categoryTab.name} as BookQueryParam)
      .then(resp => {
        setBookList(resp.content)
        if (resp.page.totalPages > 1) {
          setHadMoreResult(true)
        } else {
          setHadMoreResult(false)
        }
      })
      .catch(error => console.info(error.response?.data?.failedReason))
  }, [currentPageSize, currentIndex, bookCategoryTabs]);

  // 切换图书类别时加载图书列表
  const onSwitchTab = (index: number) => {
    if (index !== currentIndex) {
      setCurrentPageSize(PAGE_SIZE)
    }
    setCurrentIndex(index)
  }

  const onLoadMoreResult = () => {
    setCurrentPageSize(currentPageSize + PAGE_SIZE)
    onSwitchTab(currentIndex)
  }

  return (
    <div className='w-full '>
      <section className="max-w-full overflow-x-scroll no-scroll-bar" aria-multiselectable="false">
        <ul
          className="flex items-center"
          role="tablist"
        >
          {
            bookCategoryTabs.map(item => (
              <li key={item.index} className="h-11" role="presentation">
                <button
                  className={`-mb-px inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-sky-50 hover:stroke-sky-600 focus:bg-sky-50 focus-visible:outline-none  ${
                    item.index === currentIndex
                      ? "border-sky-500 stroke-sky-500 text-sky-500 bg-sky-50 hover:border-sky-500  hover:text-sky-500 focus:border-sky-500 focus:stroke-sky-500 focus:text-sky-500 "
                      : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-sky-500 hover:text-sky-500 focus:border-sky-500 focus:stroke-sky-500 focus:text-sky-500 "
                  }`}
                  tabIndex={currentIndex === item.index ? 0 : -1}
                  onClick={() => onSwitchTab(item.index)}
                >
                  <span>{item.name}</span>
                </button>
              </li>
            ))
          }
        </ul>

      </section>
      <div className="border-t border-slate-200">
        <SearchResult searchResult={bookList}/>
      </div>

      <LoadMore hadMoreResult={hadMoreResult} onLoadMoreResult={onLoadMoreResult}/>
    </div>
  )
}
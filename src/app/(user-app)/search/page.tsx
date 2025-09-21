'use client'

import TopNavBarSearch from "@/app/(user-app)/search/top-nav-bar-search";
import React, {useEffect, useState} from "react";
import EmptyResult from "@/app/(user-app)/search/empty-result";
import SearchResult from "@/app/components/search-result";
import {useRouter} from "next/navigation";
import LoadMore from "@/app/components/load-more";

import * as service from "@/app/lib/service/book"

/**
 * 搜索页面
 * /search
 */
export default function SearchPage() {
  const cachedSearchHistory = ["白鹿原", "骆驼祥子", "朝花夕拾", "南城往事"]

  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>("")
  const [searchResult, setSearchResult] = useState<Array<BookInfoDto>>([])
  const [searchHistories, setSearchHistories] = useState<Array<string>>(cachedSearchHistory)
  const [hadMoreResult, setHadMoreResult] = useState<boolean>(true)

  useEffect(() => {
    let randomKeyword = searchHistories[Math.floor(Math.random() * searchHistories.length)];
    setSearchPlaceholder(randomKeyword)
  }, [searchHistories]);

  const onSearch = (keyword: string) => {
    console.log("search input:", keyword)
    if (!!keyword) {
      putKeywordToHistory(keyword)
      service.getBooks({title: keyword} as BookQueryParam)
        .then(res => setSearchResult(res.content))
        .catch(err => console.log(err))
    }
  }

  const onClearHistory = () => {
    setSearchHistories([])
    setSearchKeyword("")
  }

  const onSelectHistory = (keyword: string) => {
    putKeywordToHistory(keyword)
  }

  const putKeywordToHistory = (keyword: string) => {
    let histories = searchHistories.slice()
    let index = histories.indexOf(keyword);
    if (index !== -1) {
      histories.splice(index, 1)
    }
    histories.splice(0, 0, keyword)
    setSearchHistories(histories)
    setSearchKeyword(keyword)
  }

  const onLoadMoreResult = () => {
    setHadMoreResult(!hadMoreResult)
  }

  return (
    <div className="w-full md:container bg-neutral-50 min-h-max">
      <TopNavBarSearch
        placeholder={searchPlaceholder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onSearchHandler={onSearch}/>
      {
        searchResult.length > 0 ? (
          <>
            <SearchResult
              searchResult={searchResult}
            />
            <LoadMore hadMoreResult={hadMoreResult} onLoadMoreResult={onLoadMoreResult}/>
          </>

        ) : (
          <EmptyResult
            searchHistories={searchHistories}
            onClearHistory={onClearHistory}
            onSelectHistory={onSelectHistory}
          />
        )
      }

    </div>
  )
}
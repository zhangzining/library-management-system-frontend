'use client'

import TopNavBarBooks from "@/app/(user-app)/home/books/top-nav-bar-books";
import BookFilterWithTab from "@/app/(user-app)/home/books/book-filter-with-tab";

/**
 * 图书页面
 * /home/book
 */
export default function BooksPage() {

  return (
    <div className="min-h-full">
      <TopNavBarBooks href="/search"/>
      <BookFilterWithTab/>
    </div>
  )
}

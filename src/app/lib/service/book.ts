import {_delete, get, patch, post, put} from "@/app/lib/service/requests";

const GET_BOOKS = "/v1/books"
const GET_BOOK_CATEGORIES = "/v1/books/categories"
const GET_BOOK_RECOMMENDED = "/v1/books/recommended"
const NOTIFICATION = "/v1/notifications"
const SUBSCRIPTION = "/v1/subscriptions"

export async function getBooks(param: BookQueryParam): Promise<PagedResponse<BookInfoDto>> {
  return get(GET_BOOKS, {params: param})
}

export async function getBooksCategories(): Promise<string[]> {
  return get(GET_BOOK_CATEGORIES)
}

export async function getAllNotification(): Promise<NotificationDto[]> {
  return get(NOTIFICATION)
}

export async function readAllNotification(): Promise<NotificationDto[]> {
  return patch(NOTIFICATION)
}

export async function getBookRecommendation(): Promise<BookInfoDto[]> {
  return get(GET_BOOK_RECOMMENDED)
}


export async function getBookById(bookId: number): Promise<BookInfoDto> {
  return get(GET_BOOKS + "/" + bookId)
}


export async function subscribe(bookId: number): Promise<void> {
  return post(SUBSCRIPTION, {bookId: bookId})
}


export async function unsubscribe(bookId: number): Promise<void> {
  return put(SUBSCRIPTION, {bookId: bookId})
}


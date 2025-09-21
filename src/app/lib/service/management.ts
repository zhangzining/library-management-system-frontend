import {_delete, get, post, patch, put} from "@/app/lib/service/requests";
import {CLIENT_ID} from "@/app/lib/service/axios";

const BOOKS = "/v1/management/books"
const ADMIN_USERS = "/v1/management/users/admin"
const NORMAL_USERS = "/v1/management/users/normal-user"
const LOCATIONS = "/v1/management/locations"
const LENDING = "/v1/management/books/lending"
const REPORT = "/v1/management/report"
const IMPORT_BOOK = "/v1/management/books/batch-import"
const UPLOAD_FILE = "/v1/files"
const BOOK_LOCATION = "/v1/management/books/{bookId}/place"

export const MANAGE_PATH = [BOOKS, ADMIN_USERS, NORMAL_USERS, LOCATIONS, LENDING]

// Books
export async function getBooks(param: BookQueryParam): Promise<PagedResponse<BookInfoDto>> {
  return get(BOOKS, {params: param})
}

export async function createBook(param: BookInfoDto): Promise<void> {
  return post(BOOKS, param)
}

export async function updateBook(param: BookInfoDto): Promise<void> {
  return patch(BOOKS+ "/" + param.id, param)
}

export async function toggleBookEnable(id: number): Promise<void> {
  return _delete(BOOKS+ "/" + id)
}

export async function placeBookIntoLocation(param: BookBindingDto): Promise<void> {
  return post(BOOKS+ "/" + param.bookId + "/locations", )
}
// Import book

export async function uploadFile(formData: FormData): Promise<void> {
  return post(UPLOAD_FILE, formData, {headers:{'Content-Type': 'multipart/form-data'}})
}
export async function importBooks(formData: FormData): Promise<BookImportResultDto[]> {
  return post(IMPORT_BOOK, formData, {headers:{'Content-Type': 'multipart/form-data'}})
}

// Location

export async function getLocations(param: LocationQueryParam): Promise<PagedResponse<LocationDto>> {
  return get(LOCATIONS, {params: param})
}

export async function createLocation(param: LocationDto): Promise<void> {
  return post(LOCATIONS, param)
}

export async function toggleLocation(id: number): Promise<void> {
  return _delete(LOCATIONS+ "/" + id)
}

export async function bindBookToLocation(param: LocationDto, bookId: number): Promise<void> {
  const url = BOOK_LOCATION.replace("{bookId}", bookId + "")
  return post(url, param)
}

// Lending
export async function borrowBook(param: BookLendingRequestDto): Promise<void> {
  return post(LENDING+ "/" + param.bookId, param)
}
export async function returnBook(param: BookLendingRequestDto): Promise<void> {
  return put(LENDING+ "/" + param.bookId, param)
}
export async function getLendingStatue(isbn: string): Promise<BookLendingStatusDto[]> {
  return get(LENDING, {params:{isbn:isbn}})
}


// Admin users
export async function getAdminUsers(param: UserQueryParam): Promise<AdminUserDto[]> {
  return get(ADMIN_USERS, {params: param})
}

export async function createAdminUsers(param: RegisterUserDto): Promise<void> {
  return post(ADMIN_USERS, param, {headers:{'X-Client-ID': CLIENT_ID}})
}

export async function updateAdminUsers(param: AdminUserDto): Promise<void> {
  return put(ADMIN_USERS + "/" + param.id, param)
}

export async function getNormalUsers(param: UserQueryParam): Promise<PagedResponse<NormalUserDto>> {
  return get(NORMAL_USERS, {params: param})
}

export async function blockNormalUsers(id: number): Promise<void> {
  return _delete(NORMAL_USERS + "/" + id)
}

// Report

export async function getReport(): Promise<ReportSummaryDto> {
  return get(REPORT)
}




// Common

interface PageMetaData {
  size: number,
  number: number,
  totalElements: number,
  totalPages: number,
}

interface PagedResponse<DTO> {
  content: DTO[],
  page: PageMetaData
}


// Account
interface NormalUserDto {
  id: number,
  username: string,
  nickname: string,
  email: string | null,
  status: string,
  lastLoginTime: string
}

interface AdminUserDto {
  id: number,
  username: string,
  email: string | null,
  status: string,
  lastLoginTime: string,
  roles: Array<string> | [],
}

interface LoginForm {
  username: string,
  password: string
}

interface LoginResult {
  accessToken: string,
  refreshToken: string,
  normalUser: NormalUserDto
  adminUser: AdminUserDto
}

interface RegisterUserDto{
  username: string,
  password: string,
  roles: Array<string> | [],
}

interface RefreshToken {
  refreshToken: string
}

interface UserQueryParam {
  page: number | null,
  size: number | null,
  username: string | null
}

interface ChangePasswordRequestDto {
  newPassword: string,
  oldPassword: string
}


// Book
interface BookQueryParam {
  page: number,
  size: number,
  title: string | null,
  author: string | null,
  isbn: string | null,
  publisher: string | null,
  category: string | null,
  borrowable: string | null,
}

interface BookInfoDto {
  id: number,
  title: string,
  description: string | null,
  author: string | null,
  isbn: string | null,
  publisher: string | null,
  indexNumber: string | null,
  category: string | null,
  language: string | null,
  coverImg: string | null,
  availableReplicationAmount: number | null,
  totalReplicationAmount: number | null,
  locations: LocationDto[]
  hadCollected: boolean,
  collectedTimes: number,
  hadSubscribed: boolean,
  subscribedTimes: number,
  lendingTimes: number
  lendingStatus: string | null,
}

interface BookBindingDto {
  locationId: number,
  bookId: number,
  placeAmount: number,
  binding: boolean
}

interface BookImportResultDto {
  failedAmount: number,
  successAmount: number
}

interface LocationDto {
  id: number | null,
  buildingName: string | null,
  buildingLevel: string | null,
  roomName: string | null,
  shelfNumber: string | null,
  shelfLevelNumber: string | null,
  description: string | null,
  replicationNumber: number | null,
}

interface LocationQueryParam {
  page: number | null,
  size: number | null,
}

// LENDING
interface BookLendingStatusDto {
  bookId: number,
  bookName: string,

  locationId: number | null,
  locationDescription: string | null,
  replicationNumber: number | null,

  userId: number | null,
  username: string | null,
  borrowTime: string | null,
}

interface BookLendingRequestDto {
  bookId: number,
  locationId: number,
  userId: number | null,
  username: string | null
}

// REPORT
interface ReportBookTrendDto {
  title?: string,
  category?: string,
  date?: string,
  count?: number
}

interface ReportSummaryDto {
  bookSubscriptionCount: number,
  borrowedBookCount: number,
  totalBookCount: number,
  activeUserCount: number,
  borrowedBookTrendList: Array<ReportBookTrendDto>,
  bookSubscriptionTrendList: Array<ReportBookTrendDto>
}

// Notification
interface NotificationDto {
  id: number,
  title: string,
  content: string,
  creationTime: string
}

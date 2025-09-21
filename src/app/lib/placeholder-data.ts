export interface User {
  id: number,
  username: string,
  password: string,
  gender?: 'male' | 'female',
  email?: string
}

export interface IBook {
  id: number,
  name: string,
  author: string,
  description: string,
  coverImg?: string,
  liked: boolean,
  likeTimes: number,
  collected: boolean,
  collectTimes: number,
  readStatus: 'never' | 'reading' | 'read'
  borrowedTimes: number,
  bookIndex: string,
  locations: Array<ILocation>,
  availableReplicationAmount: number,
  category: string
}

export interface ILocation {
  id: number,
  buildingName: string,
  floorNumber: string,
  roomNumber: string,
  shelfNumber: string,
  shelfLevelNumber: string
}

export interface INotification {
  id: number,
  bookName: string,
  message: string,
  hadRead: boolean,
  creationTime: string
}

export const defaultLocation = {
  id:1,
  buildingName: '新校区图书馆',
  floorNumber: '1',
  roomNumber: '101',
  shelfNumber: '5',
  shelfLevelNumber: '3'
}

export const notifications = [
  {
    id: 1,
    message: '已上架至新校区图书馆3楼302室12架4层',
    bookName:"《骆驼祥子》",
    hadRead: false,
    creationTime:"2024-05-06 09:20:04"
  }, {
    id: 2,
    message: '已上架至新校区图书馆1楼105室10架2层',
    bookName:"《白鹿原》",
    hadRead: false,
    creationTime: "2024-05-06 08:20:04"
  }, {
    id: 3,
    message: '已上架至新校区图书馆5楼503室8架1层',
    bookName:"《朝花夕拾》",
    hadRead: false,
    creationTime: "2024-06-15 09:20:04"
  }, {
    id: 4,
    message: '已上架至新校区图书馆3楼302室12架4层',
    bookName:"《晚熟的人》",
    hadRead: false,
    creationTime: "2024-09-08 09:20:04"
  },
]

export const loggedInUser: User = {
  id: 1,
  username: "zzn",
  password: "123456",
  gender: "male",
  email: "23123@123.com"
}

export const bookList: Array<IBook> = [
  {
    "id": 1,
    "name": "骆驼祥子",
    "author": "鲁迅",
    "description": "骆驼祥子 初一七年级下必读 初中名著阅读课外书目 正版原著完整无删减 老舍 人民文学出版社",
    "coverImg": "/cover-img/ltxz.jpg",
    "likeTimes": 2,
    "borrowedTimes": 9,
    "liked": true,
    "collected": false,
    "readStatus": 'read',
    "collectTimes": 20,
    "bookIndex": 'TP-12/345',
    "locations": [defaultLocation],
    "availableReplicationAmount": 1,
    "category":"小说"
  }, {
    "id": 2,
    "name": "朝花夕拾",
    "author": "鲁迅",
    "description": "朝花夕拾 七年级上册推荐阅读",
    "coverImg": "/cover-img/zhxs.jpg",
    "likeTimes": 20,
    "borrowedTimes": 48,
    "liked": false,
    "collected": false,
    "readStatus": 'read',
    "collectTimes": 70,
    "bookIndex": 'TP-12/345',
    "locations": [defaultLocation],
    "availableReplicationAmount": 1,
    "category":"小说"
  }, {
    "id": 3,
    "name": "晚熟的人",
    "author": "莫言",
    "description": "莫言新书 朗读者第三期朗读书 诺贝尔文学奖获奖作者 从红高粱到晚熟的人从历史深处到当下现实现当代文学小说",
    "coverImg": "/cover-img/wsdr.jpg",
    "likeTimes": 6,
    "borrowedTimes": 11,
    "liked": true,
    "collected": true,
    "readStatus": 'reading',
    "collectTimes": 150,
    "bookIndex": 'TP-12/345',
    "locations": [defaultLocation],
    "availableReplicationAmount": 2,
    "category":"小说"
  }, {
    "id": 4,
    "name": "檀香刑",
    "author": "莫言",
    "description": "莫言写透刽子手的心理；绝美爱情与惨烈酷刑同时上演",
    "coverImg": "/cover-img/txx.jpg",
    "likeTimes": 34,
    "borrowedTimes": 51,
    "liked": false,
    "collected": false,
    "readStatus": 'reading',
    "collectTimes": 30,
    "bookIndex": 'TP-12/345',
    "locations": [defaultLocation],
    "availableReplicationAmount": 3,
    "category":"小说"
  }, {
    "id": 5,
    "name": "罪与罚",
    "author": "陀思妥耶夫斯基",
    "description": "“俄罗斯文学天才”陀思妥耶夫斯基成名之作，人能从洁白里拷打出罪恶，也能从罪恶中拷打出洁白。",
    "coverImg": "/cover-img/zyf.jpg",
    "likeTimes": 2,
    "borrowedTimes": 4,
    "liked": true,
    "collected": false,
    "readStatus": 'never',
    "collectTimes": 13,
    "bookIndex": 'TP-12/345',
    "locations": [],
    "availableReplicationAmount": 0,
    "category":"小说"
  }, {
    "id": 6,
    "name": "双城记",
    "author": "狄更斯",
    "description": "狄更斯经典代表作，逝世150周年纪念版！翻译泰斗宋兆霖权威译本。",
    "coverImg": "/cover-img/scj.jpg",
    "likeTimes": 90,
    "borrowedTimes": 100,
    "liked": true,
    "collected": false,
    "readStatus": 'never',
    "collectTimes": 111,
    "bookIndex": 'TP-12/345',
    "locations": [],
    "availableReplicationAmount": 0,
    "category":"小说"
  },
]
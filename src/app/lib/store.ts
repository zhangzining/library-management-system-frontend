import {configureStore} from "@reduxjs/toolkit";
import UserInfoSlice, {initUserInfoFromCache, UserInfo} from "@/app/lib/features/userInfoSlice";
import ErrorMessageSlice from "@/app/lib/features/errorSlice";
import ToastMessageSlice from "@/app/lib/features/toastSlice";
import SearchHistorySlice, {getFromCache} from "@/app/lib/features/searchHistorySlice";

let userInfo = initUserInfoFromCache();
let histories = getFromCache()

export const store =
  configureStore({
    reducer: {
      userInfo: UserInfoSlice,
      errorMessage: ErrorMessageSlice,
      toastMessage: ToastMessageSlice,
      searchHistories: SearchHistorySlice,
    },
    preloadedState: {
      userInfo: userInfo as UserInfo,
      searchHistories: {histories: histories as string[]}
    }
  })

// Infer the type of makeStore
export type AppStore = typeof store
// export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

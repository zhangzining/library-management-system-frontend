import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  histories: [] as string[]
};

export const getFromCache = () => {
  const cachedUserInfo = localStorage.getItem("searchHistory");
  if (!!cachedUserInfo) {
    return JSON.parse(cachedUserInfo) as string[];
  } else {
    return initialState
  }
}

const persistIntoCache = (histories:string[]) => {
  localStorage.setItem("searchHistory", JSON.stringify(histories))
}

const errorSlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.histories.push(action.payload)
      persistIntoCache(state.histories)
    },
    clearHistory: (state) => {
      state.histories.splice(0)
    },
  },
});

export const { addHistory, clearHistory } = errorSlice.actions;
export default errorSlice.reducer;

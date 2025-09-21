import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  message: null, // 错误消息
  isVisible: false, // 是否显示弹窗
  unAuth: false
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideError: (state) => {
      state.isVisible = false;
      state.message = null;
    },
    onUnAuth: (state) => {
      state.unAuth = true
    },
    clearUnAuth: (state) => {
      state.unAuth = false
    },
  },
});

export const {showError, hideError, onUnAuth, clearUnAuth} = errorSlice.actions;
export default errorSlice.reducer;

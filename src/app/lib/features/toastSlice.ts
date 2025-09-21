import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  message: null, // 消息
  isVisible: false, // 是否显示弹窗
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
      state.message = null;
    },

  },
});

export const {showToast, hideToast} = toastSlice.actions;
export default toastSlice.reducer;

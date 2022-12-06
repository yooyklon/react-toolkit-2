import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: []
  },
  reducers: {
    addFiles(state, action) {
      state.files = [...state.files, ...action.payload];
    },
    removeFileItem(state, action) {
      state.files = [
        ...state.files.filter((elem) => elem.id !== action.payload),
      ]
    }
  }
});

export const { addFiles, removeFileItem } = fileSlice.actions;

export default fileSlice.reducer;
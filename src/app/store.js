import { configureStore } from '@reduxjs/toolkit';

import fileSlice from '../slice/fileSlice';

export const store = configureStore({
  reducer: {
    file: fileSlice
  },
});

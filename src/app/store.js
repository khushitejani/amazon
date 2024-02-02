import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './reducer/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})
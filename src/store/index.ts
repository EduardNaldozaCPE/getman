import { configureStore } from '@reduxjs/toolkit';
import requestReducer from '../features/requests/requestSlice.ts';

export const store = configureStore({
  reducer: {
    requests: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

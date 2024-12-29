import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { getTranslate } from './api';
import historySlice from './historySlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [getTranslate.reducerPath]: getTranslate.reducer,
    history: historySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getTranslate.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

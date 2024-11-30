import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { injectedRtkApi } from './api';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    [injectedRtkApi.reducerPath]: injectedRtkApi.reducer,
    chat: chatReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(injectedRtkApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

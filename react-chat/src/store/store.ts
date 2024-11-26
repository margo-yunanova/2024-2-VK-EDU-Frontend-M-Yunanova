import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { injectedRtkApi } from './api';

export const store = configureStore({
  reducer: {
    [injectedRtkApi.reducerPath]: injectedRtkApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(injectedRtkApi.middleware),
});

setupListeners(store.dispatch);

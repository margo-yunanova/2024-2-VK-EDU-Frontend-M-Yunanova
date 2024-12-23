import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { getTranslate } from './api';

export const store = configureStore({
  reducer: {
    [getTranslate.reducerPath]: getTranslate.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getTranslate.middleware),
});

setupListeners(store.dispatch);

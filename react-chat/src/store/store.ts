import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { enhancedApi } from './enhancedApi';
import { rtkQueryErrorLogger } from './middleware';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    [enhancedApi.reducerPath]: enhancedApi.reducer,
    chat: chatReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(enhancedApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export const getActiveChatId = () => store.getState().chat.activeChat?.id;

export const getTokenForConnection = () =>
  store.dispatch(enhancedApi.endpoints.centrifugoConnectCreate.initiate());

export const getTokenForSubscription = () =>
  store.dispatch(enhancedApi.endpoints.centrifugoSubscribeCreate.initiate());

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

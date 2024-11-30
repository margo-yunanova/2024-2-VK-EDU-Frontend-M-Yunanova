import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LastMessageRead, UserRead } from '../api';

interface IChatState {
  activeChat?: {
    id?: string;
    title?: string;
    members?: UserRead[];
    creator?: UserRead;
    avatar?: string | null;
    created_at?: string;
    updated_at?: string;
    is_private?: boolean;
    last_message?: LastMessageRead;
  };
}

const initialState: IChatState = {};

const activeChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<IChatState['activeChat']>) => {
      state.activeChat = { ...state.activeChat, ...action.payload };
    },
  },
});

const { actions, reducer } = activeChatSlice;
export const { setActiveChat } = actions;
export default reducer;

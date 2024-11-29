import { PayloadAction } from '@reduxjs/toolkit';

import { LastMessageRead, UserRead } from '../api';

interface IActiveChatState {
  id?: string;
  title?: string;
  members?: UserRead[];
  creator?: UserRead;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  is_private?: boolean;
  last_message?: LastMessageRead;
}

const initialState: IActiveChatState = {};

const activeChatSlice = {
  name: 'activeChat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
};

const { actions, reducer } = activeChatSlice;
export const { setActiveChat } = actions;
export default reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface HistoryState {
  isHistoryEmpty: boolean;
}

const initialState: HistoryState = {
  isHistoryEmpty: false,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.isHistoryEmpty = true;
    },
    updateHistory: (state) => {
      state.isHistoryEmpty = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearHistory, updateHistory } = historySlice.actions;

export default historySlice.reducer;

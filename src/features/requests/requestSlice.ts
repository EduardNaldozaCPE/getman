import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RequestItem {
  id: string;
  url: string;
  method: string;
  status: number | null;
  response: any;
  timestamp: string;
}

interface RequestState {
  history: RequestItem[];
  currentRequest: Partial<RequestItem>;
}

const initialState: RequestState = {
  history: [],
  currentRequest: { method: 'GET', url: '', status: null, response: null },
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setCurrentRequest: (state, action: PayloadAction<Partial<RequestItem>>) => {
      state.currentRequest = { ...state.currentRequest, ...action.payload };
    },
    addToHistory: (state, action: PayloadAction<RequestItem>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { setCurrentRequest, addToHistory } = requestSlice.actions;
export default requestSlice.reducer;

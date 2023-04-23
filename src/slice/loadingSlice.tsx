import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  loading: boolean;
}
interface Action {
  payload: {
    loading: boolean;
  };
}

const initialState: CartItem = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state: CartItem, action: Action) => {
      return { ...state, loading: action.payload.loading };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../typings';

interface IALert {
  alert: string;
  status: '' | 'error' | 'sucess';
}

const initialState: IALert = {
  alert: '',
  status: '',
};

interface Action {
  payload: {
    text: string;
    status: '' | 'error' | 'sucess';
  };
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state: IALert, action: Action) => {
      return { ...state, alert: action.payload.text, status: action.payload.status };
    },
    clearAlert: (state: IALert, _) => {
      return { ...state, alert: '', status: '' };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;

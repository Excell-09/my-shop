import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../typings';

interface IUserProps {
  user: IUser | null;
}
interface IUserActionProps {
  payload: {
    user: IUser;
  };
}

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserProps, action: IUserActionProps): any => {
      const currentUser = action.payload.user;
      return { ...state, user: currentUser };
    },
    clearUser: (state: IUserProps, _): any => {
      return { ...state, user: null };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

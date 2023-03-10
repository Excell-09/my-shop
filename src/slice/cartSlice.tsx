import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../typings';

interface CartItem {
  cartItem: IProduct[];
}
interface Action {
  payload: {
    item: IProduct;
    id: string;
  };
}

const initialState: CartItem = {
  cartItem: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartItem, action: Action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

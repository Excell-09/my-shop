import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../typing';

interface InitialState {
  product: Product[];
  totalItem: number;
  totalPrice: number;
}

interface ActionAddToCart {
  payload: {
    product: Product;
    totalItem: number;
  };
}

const initialState: InitialState = {
  product: [],
  totalItem: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: ActionAddToCart) => {
      const exitsItem = state.product.find((item) => item._id === action.payload.product._id);

      if (exitsItem) {
        state.totalItem += action.payload.totalItem;
        state.totalPrice += state.totalItem * exitsItem.price;
        return;
      }
      state.product.push(action.payload.product);
      state.totalItem += action.payload.totalItem;
      state.totalPrice += state.totalItem * action.payload.product.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

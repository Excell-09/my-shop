import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../typings';

export interface CartItemStore extends IProduct {
  quantity: number;
}

interface CartItem {
  cartItems: CartItemStore[];
  total: number;
  totalItems: number;
}
interface Action {
  payload: {
    item: IProduct;
  };
}
interface ActionRemove {
  payload: {
    _id: string;
  };
}
interface ActionIncrement {
  payload: {
    _id: string;
  };
}
interface ActionDecrement {
  payload: {
    _id: string;
  };
}

const initialState: CartItem = {
  cartItems: [],
  total: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartItem, action: Action) => {
      const newItem = action.payload.item;
      const exitsItem = state.cartItems.find((item) => item._id === newItem._id);

      state.totalItems++;
      if (!exitsItem) {
        state.cartItems.push({
          _id: newItem._id,
          title: newItem.title,
          imageUrl: newItem.imageUrl,
          quantity: 1,
          price: newItem.price,
        });
      } else {
        exitsItem.quantity++;
        exitsItem.price = Number(exitsItem.price) + Number(exitsItem.price);
      }

      state.total = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    removeItem: (state: CartItem, action: ActionRemove) => {
      const findItem = state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (state.cartItems.length > -1) {
        state.cartItems.splice(findItem, 1);
      } else {
        console.warn('cant to remove, cause no item in here');
      }
    },
    incrementQuantity: (state: CartItem, action: ActionIncrement) => {
      const findItem = state.cartItems.findIndex((item) => item._id === action.payload._id);
      ++state.cartItems[findItem].quantity;
    },
    decrementQuantity: (state: CartItem, action: ActionDecrement) => {
      const findItem = state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (state.cartItems[findItem].quantity > 1) {
        --state.cartItems[findItem].quantity;
      } else {
        alert('Quantity Minimum is 1');
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, decrementQuantity, incrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;

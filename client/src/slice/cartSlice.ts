import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductCart } from '../../typing';

interface InitialState {
  product: ProductCart[];
  totalItem: number;
  totalPrice: number;
}

interface ActionAddToCart {
  payload: {
    product: Product;
    totalItem: number;
  };
}
interface ActionRemoveItemToCart {
  payload: {
    productId: string;
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
      const newItem = action.payload;
      const exitsItem = state.product.find((item) => item._id === newItem.product._id);

      if (exitsItem) {
        const index = state.product.findIndex((item) => item._id === newItem.product._id);
        state.totalItem += newItem.totalItem;
        state.totalPrice += newItem.totalItem * newItem.product.price;
        state.product[index].totalPrice += newItem.totalItem * newItem.product.price;
        state.product[index].totalItem += newItem.totalItem;
        return;
      }
      state.product.push({
        _id: newItem.product._id,
        title: newItem.product.title,
        imageUrl: newItem.product.imageUrl,
        price: newItem.product.price,
        totalItem: newItem.totalItem || 1,
        totalPrice: newItem.product.price * newItem.totalItem || 1,
      });
      state.totalItem += newItem.totalItem;
      state.totalPrice += newItem.totalItem * newItem.product.price;
    },
    removeItem: (state, action: ActionRemoveItemToCart) => {
      const itemIndex = state.product.findIndex((item) => item._id === action.payload.productId);

      if (itemIndex === -1) return;
      const removedItem = state.product[itemIndex];
      state.product.splice(itemIndex, 1);
      state.totalItem -= removedItem.totalItem;
      state.totalPrice -= removedItem.totalPrice;
      return;
    },
    incrementItem: (state, action: ActionRemoveItemToCart) => {
      const itemIndex = state.product.findIndex((item) => item._id === action.payload.productId);

      if (itemIndex === -1) return;
      const currentItem = state.product[itemIndex];
      currentItem.totalItem += 1;
      currentItem.totalPrice += state.product[itemIndex].price;
      state.totalItem += 1;
      state.totalPrice += currentItem.price;
      return;
    },
    decrementItem: (state, action: ActionRemoveItemToCart) => {
      const itemIndex = state.product.findIndex((item) => item._id === action.payload.productId);

      if (itemIndex === -1) return;
      const currentItem = state.product[itemIndex];
      if (currentItem.totalItem <= 1) {
        alert('maximum item is 1');
        return;
      }
      currentItem.totalItem -= 1;
      currentItem.totalPrice -= state.product[itemIndex].price;
      state.totalItem -= 1;
      state.totalPrice -= currentItem.price;
      return;
    },
  },
});

export const { addToCart, removeItem, incrementItem, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;

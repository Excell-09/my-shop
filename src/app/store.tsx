import cartSlice from '@/slice/cartSlice';
import loadingSlice from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    cart: cartSlice,
    loading: loadingSlice,
  },
});

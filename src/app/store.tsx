import cartSlice from '@/slice/cartSlice';
import loadingSlice from '@/slice/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    loading: loadingSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;

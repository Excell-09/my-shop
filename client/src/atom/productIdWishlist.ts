import { atom, selector } from 'recoil';
import userState from './userAtom';

export const getProductIdWishlist = selector({
  key: 'getProductIdWishlist',
  get: ({ get }) => {
    const user = get(userState)
    return user?.wishlistProduct
  }
});

const productIdWishlistState = atom<string[]>({
  key: 'productIdWishlistState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default productIdWishlistState;

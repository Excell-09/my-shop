import { atom } from 'recoil';

const productIdWishlistState = atom<string[]>({
  key: 'productIdWishlistState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default productIdWishlistState;

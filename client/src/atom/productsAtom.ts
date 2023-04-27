import { atom } from 'recoil';

const productsState = atom({
  key: 'productsState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export default productsState;

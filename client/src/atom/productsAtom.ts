import { atom, useRecoilState } from 'recoil';
import { Product } from '../../typing';

const productsState = atom<Product[]>({
  key: 'productsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const useProductsState = () => {
  const [products, setProducts] = useRecoilState(productsState);
  return { products, setProducts };
};

export default productsState;

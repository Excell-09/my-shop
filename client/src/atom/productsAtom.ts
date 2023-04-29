import { atom,  useRecoilState } from 'recoil';
import { Product } from '../../typing';

const productsState = atom<Product[]>({
  key: 'productsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});


export const useProductsState = () => {
  const [productState, setProductState] = useRecoilState(productsState);
  return { productState, setProductState };
};

export default productsState;

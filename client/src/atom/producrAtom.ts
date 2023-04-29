import { atom, useRecoilState } from 'recoil';

const cartState = atom<boolean>({
  key: 'cartState', // unique ID (with respect to other atoms/selectors)
  default: false,
});

export default cartState;

export const useCartState = () => {
  const [isLoading, setLoading] = useRecoilState(cartState);
  return { isLoading, setLoading };
};

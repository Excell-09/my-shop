import { atom, useRecoilState } from 'recoil';

const loadingState = atom<boolean>({
  key: 'loadingState', // unique ID (with respect to other atoms/selectors)
  default: false,
});

export default loadingState;

export const useLoadingState = () => {
  const [isLoading, setLoading] = useRecoilState(loadingState);
  return { isLoading, setLoading };
};

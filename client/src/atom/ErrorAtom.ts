import { atom, useRecoilState } from 'recoil';
import { ErrorMessage } from '../../typing';


const errorState = atom<ErrorMessage>({
  key: 'errorState', // unique ID (with respect to other atoms/selectors)
  default: {
    message: '',
    type: 'success',
  },
});

export default errorState;

export const useErrorState = () => {
  const [error, setError] = useRecoilState(errorState);
  return {error, setError};
};

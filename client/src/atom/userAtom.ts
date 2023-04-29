import { atom, useRecoilState } from 'recoil';
import { User } from '../../typing';

const userState = atom< User  | null>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);
  return { user, setUser };
};

export default userState;

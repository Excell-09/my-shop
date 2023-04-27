import { atom } from 'recoil';
import { AuthUser } from '../../typing';

const userState = atom<AuthUser | null>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default userState;

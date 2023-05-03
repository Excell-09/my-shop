import { Navigate } from 'react-router-dom';
import { useUserState } from '../atom/userAtom';

export default function ProtectRoute({ children }: { children: JSX.Element }) {
  const { user } = useUserState();

  return user ? <Navigate to={'/'} /> : children;
}

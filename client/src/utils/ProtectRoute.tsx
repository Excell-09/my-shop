import { Navigate } from 'react-router-dom';
import getCookie from './getCookie';

export default function ProtectRoute({ children }: { children: JSX.Element }) {
  const token = getCookie('token');

  return token ? <Navigate to={'/'} /> : children;
}

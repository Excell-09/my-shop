import { createContext, useState, ReactNode, useContext } from 'react';
import { AuthUser } from '../../typing';

const AuthContext = createContext<AuthUser | null>(null);

type props = {
  children: ReactNode;
};

const AuthProvider = (props: props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default AuthProvider;

import { createContext, useState, ReactNode } from 'react';
import { AuthUser } from '../../typing';

const defaultUser = {
  user: {
    _id: '',
    name: '',
    email: '',
    historyProduct: [],
    wishlistProduct: [],
  },
  token: '',
};

const AuthContext = createContext<AuthUser>(defaultUser);

type props = {
  children: ReactNode;
};

const AuthProvider = (props: props) => {
  const [user, setUser] = useState<AuthUser>(defaultUser);
  console.log(user)
  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;

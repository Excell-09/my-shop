import { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, User } from '../../typing';
import axiosCreate from '../utils/axiosCreate';
import Alert from '../components/Alert';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userState from '../atom/userAtom';
import productIdWishlistState from '../atom/productIdWishlist';
import { useLoadingState } from '../atom/loadingAtom';
import { useProductsState } from '../atom/productsAtom';
import getCookie from '../utils/getCookie';

const AuthContext = createContext<User | null>(null);

type props = {
  children: ReactNode;
};

type callback = (data: Product[]) => void;

//eslint-disable-next-line
export const logoutUser = () => {
  let cookieValue = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax;';

  if (window.location.protocol === 'https:') {
    cookieValue += `domain=${import.meta.env.VITE_CLIENT_DOMAIN};Secure`;
  }
  document.cookie = cookieValue;
  window.location.reload();
};



const AuthProvider = (props: props) => {
  const { setProducts } = useProductsState();
  const setUser = useSetRecoilState(userState);
  const [productIdWishlist, setProductIdWishlist] = useRecoilState(productIdWishlistState);
  const { isLoading, setLoading } = useLoadingState();

  const getCurrentUserFromCookie = async () => {
    try {
      const token = getCookie('token');
      if (token === '') {
        throw new Error("you don't have cookie");
      }
      const { data } = await axiosCreate.post<{ user: User } | null>('/auth/getCurrentUser', {
        token,
      });
      setUser(data?.user as User);
    } catch (error) {
      const result: string = (error as Error).message;
      if (result === "you don't have cookie") return;
      setUser(null);
    }
  };

  const getProducts = async (fn: callback) => {
    if (isLoading) setLoading(false);
    setLoading(true);
    try {
      const { data } = await axiosCreate<Product[]>('/product');
      fn(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUserFromCookie();
    getProducts((res) => {
      setProducts(res);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user?._id) {
      setProductIdWishlist(user.wishlistProduct);
    }
    //eslint-disable-next-line
  }, [productIdWishlist]);

  axiosCreate.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      if (error?.response?.status === 429) {
        Alert({ message: 'Too many request, Please wait!', type: 'error' });
      }
      return Promise.reject(error);
    }
  );

  const [user] = useState<User | null>(null);

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;

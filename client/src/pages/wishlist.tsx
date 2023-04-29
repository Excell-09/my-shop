import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../../typing';
import axiosCreate from '../utils/axiosCreate';
import { useUserState } from '../atom/userAtom';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

type Callback = (data: Product[]) => void;

export default function Wishlist() {
  const { pathname } = useLocation();
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useUserState();
  const getWishlistProducts = async (userId: string, fn: Callback) => {
    if (loading) setLoading(false);
    setLoading(true);
    try {
      const response = await axiosCreate<Product[]>(`/product/wishlist/${userId}`);
      fn(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (user?._id) {
      getWishlistProducts(user._id, (products) => {
        setWishlistProducts(products);
        setLoading(false);
      });
    }
    //eslint-disable-next-line
  }, [user?._id]);

  return (
    <>
      <Header />
      <main className='pt-[4.5rem] px-2'>
        <section className='min-h-[85vh]'>
          <h3 className='font-semibold text-3xl capitalize text-indigo-500 my-3 text-center'>
            Wishlist
          </h3>
          {user === null ? (
            <h3 className='text-red-500 text-center'>Need login!</h3>
          ) : loading ? (
            <Loading />
          ) : wishlistProducts.length === 0 ? (
            <h3 className='text-indigo-500 font-semibold text-center'>No Wishlist Products</h3>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
              {wishlistProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  price={item.price}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

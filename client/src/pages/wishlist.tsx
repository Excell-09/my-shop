import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../../typing';
import { useUserState } from '../atom/userAtom';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { useProductsState } from '../atom/productsAtom';
import productIdWishlistState from '../atom/productIdWishlist';
import { useRecoilState } from 'recoil';

export default function Wishlist() {
  const { products } = useProductsState();
  const { pathname } = useLocation();
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);
  const [productIdWishlist] = useRecoilState(productIdWishlistState);
  const { user } = useUserState();

  useEffect(() => {
    const productsResult = [];
    if (user && products.length !== 0 && productIdWishlist.length !== 0) {
      for (const id of productIdWishlist) {
        const result = products.find((item) => item._id === id);
        if (!result) break;
        productsResult.push(result);
      }
    }
    setWishlistProducts(productsResult);
    //eslint-disable-next-line
  }, [user, products, productIdWishlist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          ) : wishlistProducts.length === 0 ? (
            <h6 className='text-indigo-500 font-semibold text-center'>
              You Don't have any products wishlist
            </h6>
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

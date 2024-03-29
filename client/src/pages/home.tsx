import React from 'react';
import Header from '../components/Header';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import banner from '../assets/banner';
import { useProductsState } from '../atom/productsAtom';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { useLocation } from 'react-router-dom';
import { useLoadingState } from '../atom/loadingAtom';

export default function Home() {
  const { products } = useProductsState();
  const { isLoading } = useLoadingState();
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Header />
      <main className='pt-[4.5rem] px-2'>
        <section className='container-auto bg-white m-2 sm:m-5 '>
          <div className='grid grid-cols-12'>
            <Carousel
              className='col-span-full sm:col-span-8 mr-2 h-full'
              autoPlay
              infiniteLoop
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
              interval={5000}>
              <img src={banner.banner1} className='h-full object-cover' />
              <img src={banner.banner2} className='h-full object-cover' />
              <img src={banner.banner3} className='h-full object-cover' />
            </Carousel>
            <div className='col-span-4 space-y-1 hidden sm:block h-full'>
              <img className='hidden sm:block' src={banner.banner2} />
              <img className='hidden sm:block' src={banner.banner3} />
            </div>
          </div>
        </section>
        <section className='mt-3 max-w-[1200px] mx-auto'>
          <div className='bg-white py-3 sticky top-[4.5rem] border-b-4 border-violet-500 z-40'>
            <h3 className='text-lg font-semibold text-violet-500 text-center'>Rekomendasi</h3>
          </div>
          <div className='mt-3 relative z-10'>
            {isLoading ? (
              <Loading />
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                {products.map((item) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

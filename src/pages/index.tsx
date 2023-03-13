import axiosGet from '@/utils/axiosGet';
import { useState } from 'react';
import { IProduct } from '../../typings';
import Layout from '../components/Layout';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../assets/banner-1.jpeg';
import banner2 from '../assets/banner-2.png';
import banner3 from '../assets/banner-3.jpeg';
import Image, { StaticImageData } from 'next/image';
import CartProduct from '@/components/CartProduct';
import { GetStaticProps } from 'next';
import { setCache, getCache } from '@/utils/cache';
import { useAppDispatch } from '@/app/hooks';

interface Props {
  products: IProduct[];
  productsWishlistId: string[];
}

const Home = (props: Props) => {
  let [products] = useState<IProduct[]>(props.products);
  let [productsIdWislist] = useState<string[]>(props.productsWishlistId);
  return (
    <Layout>
      <section>
        <div className='grid grid-cols-3 space-x-1 mb-3 md:mb-5 bg-white p-3 md:p-5'>
          <div className='md:col-span-2 col-span-3'>
            <Carousel
              className='z-30'
              autoPlay
              infiniteLoop
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
              interval={5000}>
              <Image loading='lazy' src={banner1} alt='banner' />
              <Image loading='lazy' src={banner2} alt='banner' />
              <Image loading='lazy' src={banner3} alt='banner' />
            </Carousel>
          </div>
          <div className='col-span-1 md:block space-y-1 hidden'>
            <div className=' row-span-1'>
              <Image loading='lazy' src={banner1} alt='banner' />
            </div>
            <div className=' row-span-1'>
              <Image loading='lazy' src={banner2} alt='banner' />
            </div>
          </div>
        </div>
        <div className='section-container px-2'>
          <div className='sticky top-16 lef-0 w-full z-40 bg-white mb-5'>
            <h2 className='text-center text-xl uppercase font-semibold p-3'>Recomendasi</h2>
            <hr className='border-t-indigo-500 border-t-8' />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {products.map((item: IProduct, i: number) => (
              <div key={i} className='bg-white flex justify-center items-center'>
                <CartProduct
                  productIdWislist={productsIdWislist}
                  _id={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cacheKey = 'homePageData';
  let cachedData = getCache<Props>(cacheKey);

  if (cachedData) {
    return {
      props: cachedData,
      revalidate: 60,
    };
  }

  const products = await axiosGet<IProduct[]>('/product');
  const productsWishlist = await axiosGet<IProduct[]>('/product/wishlist/640df5500a283af202e92ed6');
  const productsWishlistId = productsWishlist.map((item) => item._id);
  const props = { products, productsWishlistId };
  setCache(cacheKey, props);
  return {
    props,
    revalidate: 20,
  };
};

export default Home;

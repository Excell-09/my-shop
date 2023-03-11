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

interface Props {
  data: IProduct[];
  banner: StaticImageData[];
}

const Home = (props: Props) => {
  let [products] = useState<IProduct[]>(props.data);
  const [banner] = useState<StaticImageData[]>(props.banner);
  

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
              {banner.map((item: StaticImageData, i: number) => {
                return (
                  <div key={i}>
                    <Image loading='lazy' src={item} alt='banner' />
                  </div>
                );
              })}
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

export async function getServerSideProps() {
  const data = await axiosGet<IProduct[]>('/product/product');
  const banner: [StaticImageData, StaticImageData, StaticImageData] = [banner1, banner2, banner3];
  return {
    props: { data, banner }, // will be passed to the page component as props
  };
}

export default Home;

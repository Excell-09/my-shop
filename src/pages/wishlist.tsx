import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CartProduct from '@/components/CartProduct';
import Layout from '@/components/Layout';
import axiosGet from '@/utils/axiosGet';
import { getCache, setCache } from '@/utils/cache';
import { GetStaticProps } from 'next';
import { IProduct } from '../../typings';

interface Props {
  productsWishlist: IProduct[] | string;
}

const Whishlist = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);

  console.log(props.productsWishlist);
  return (
    <Layout>
      <section className='section-container px-3'>
        {user ? (
          <>
            <h3 className='text-2xl font-bold text-pink-500 my-3 '>Wishlist</h3>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {typeof props.productsWishlist == 'string' ? (
                <h3 className='text-pink-500 text-lg text-center col-span-full'>{props.productsWishlist}</h3>
              ) : (
                props.productsWishlist.map((item: IProduct, i: number) => (
                  <div key={i} className='bg-white flex justify-center items-center'>
                    <CartProduct
                      productIdWislist={item._id}
                      _id={item._id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                      price={item.price}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <h1 className='text-xl font-bold text-indigo-500 my-3 text-center'>You Need To Login!</h1>
        )}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cacheKey = 'WishlistPageData';
  let cachedData = getCache<Props>(cacheKey);

  if (cachedData) {
    return {
      props: cachedData,
      revalidate: 60,
    };
  }

  const productsWishlist = await axiosGet<IProduct[]>(`/product/wishlist/640ecd5c67e4d169310e33d6`);
  const props = { productsWishlist };
  setCache(cacheKey, props);
  return {
    props,
    revalidate: 20,
  };
};

export default Whishlist;

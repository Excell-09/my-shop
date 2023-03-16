import { useAppSelector } from '@/app/hooks';
import CartProduct from '@/components/CartProduct';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import axiosGet from '@/utils/axiosGet';
import { useEffect, useState } from 'react';
import { IProduct, IUser } from '../../typings';

const Whishlist = () => {
  const user = useAppSelector<IUser | null>((state) => state.user.user);
  const [props, setProps] = useState<IProduct[] | string>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductWishlist = async (userId: string): Promise<IProduct[] | string> => {
    if (!userId) {
      return 'You Need To Login!';
    }
    const productWislist = await axiosGet<IProduct[] | string>(`/product/wishlist/${userId}`);
    return productWislist;
  };

  useEffect(() => {
    setLoading(true);
    getProductWishlist(user?._id as string)
      .then((result) => setProps(result))
      .then(() => setLoading(false));
  }, [user]);

  return (
    <Layout>
      <section className='section-container p-3'>
        {user ? (
          loading ? (
            <div className='w-7 h-7 mx-auto'>
              <Loading />
            </div>
          ) : (
            <>
              <h3 className='text-2xl font-bold text-pink-500 mb-3 text-center md:text-start'>Wishlist</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {typeof props == 'string' ? (
                  <h3 className='text-pink-500 text-lg text-center col-span-full'>{props}</h3>
                ) : (
                  props.map((item: IProduct, i: number) => (
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
          )
        ) : (
          <h1 className='text-xl font-bold text-indigo-500 my-3 text-center'>You Need To Login!</h1>
        )}
      </section>
    </Layout>
  );
};

export default Whishlist;

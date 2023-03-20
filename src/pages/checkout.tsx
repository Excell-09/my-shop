import { useAppSelector } from '@/app/hooks';
import CardProductCheckout from '@/components/CardProductCheckout';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import axiosPost from '@/utils/axiosPost';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IUser } from '../../typings';

const Checkout = () => {
  const totalItemProduct = useAppSelector((state) => state.cart.totalItems);
  const itemProduct = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.total);
  const user = useAppSelector<IUser | null>((state) => state.user.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  let formattedPrice = totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  formattedPrice = formattedPrice.slice(0, -3);

  const handlePayment = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      router.push('/login');
      return;
    }
    try {
      const result = await axiosPost('/product/invoice', {
        amount: totalPrice,
        email: user?.email,
        userID: user?._id,
      });
      window.location.replace(result.data.invoiceURL);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className='section-container px-2 mt-5 grid grid-cols-12'>
        <div className='col-span-full lg:col-span-9 mb-5'>
          {totalItemProduct < 1 && <h1 className='text-2xl font-semibold'>{'No Products'}</h1>}
          <div className='bg-white shadow m-0'>
            {itemProduct.map((item, i) => (
              <div key={i}>
                <CardProductCheckout
                  _id={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white p-2 col-span-full lg:col-span-3 shadow mb-5 flex justify-between flex-col space-y-10'>
          <div>
            <h1 className='text-lg font-bold'>Checkout</h1>
            <hr className='border-t-2 mb-2 border-t-pink-500' />
            <div>
              <div className='flex justify-between mb-1'>
                <p>Total Item : </p>
                <p>{totalItemProduct} Items</p>
              </div>
              <div className='flex justify-between'>
                <p>Total Price : </p>
                <p className='text-red-500'>{formattedPrice}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              disabled={isLoading}
              onClick={handlePayment}
              className='w-full mx-auto bg-gray-800 text-pink-500 font-semibold py-2 text-lg disabled:bg-opacity-75 active:bg-gray-700 hover:bg-gray-900'>
              {isLoading ? (
                <div className='w-5 h-5 mx-auto'>
                  <Loading />
                </div>
              ) : (
                'Checkout'
              )}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;

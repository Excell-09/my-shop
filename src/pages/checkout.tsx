import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CardProductCheckout from '@/components/CardProductCheckout';
import Layout from '@/components/Layout';
import { useMemo } from 'react';

const Checkout = () => {
  const totalItemProduct = useAppSelector((state) => state.cart.totalItems);
  const itemProduct = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.total);

  let formattedPrice = totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  formattedPrice = formattedPrice.slice(0, -3);
  
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
        <div className='bg-white p-2 col-span-full lg:col-span-3 shadow mb-5'>
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
      </section>
    </Layout>
  );
};

export default Checkout;

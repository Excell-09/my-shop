import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CardProductCheckout from '@/components/CardProductCheckout';
import Layout from '@/components/Layout';

const Checkout = () => {
  const totalItemProduct = useAppSelector((state) => state.cart.totalItems);
  const itemProduct = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.total);

  return (
    <Layout>
      <section className='flex justify-center space-x-2 section-container px-2 flex-wrap'>
        <div className='flex-1 bg-white'>
          {totalItemProduct < 1 ? (
            <h3>{totalItemProduct}</h3>
          ) : (
            <div className=''>
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
          )}
        </div>
        <div className='bg-white px-2'>
          <h1>Checkout</h1>
          <hr className='border-t-2' />
          <div>
            <div className='flex justify-between'>
              <p>Total Item</p>
              <p>{totalItemProduct}</p>
            </div>
            <div className='flex justify-between'>
              <p>Total Price</p>
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;

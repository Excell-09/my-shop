import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppSelector } from '../store/hooks';
import ProductCart from '../components/ProductCart';
import { useUserState } from '../atom/userAtom';
import { useErrorState } from '../atom/ErrorAtom';
import { useEffect, useState } from 'react';
import axiosCreate from '../utils/axiosCreate';
import getCookie from '../utils/getCookie';

export default function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const { user } = useUserState();
  const { setError } = useErrorState();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleCheckout = async () => {
    if (loading) setLoading(false);
    if (!user?._id) {
      setError({ message: 'Need User to Checkout Products', type: 'error' });
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const token = getCookie('token');
      const response = await axiosCreate.post('/product/invoice', {
        token,
        amount: cart.totalPrice,
      });
      window.location.replace(response.data.invoiceURL);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return;
  };
  return (
    <>
      <Header />
      <main className='pt-[5rem] max-w-6xl mx-auto px-2'>
        <section>
          <h3 className='font-bold text-4xl tracking-wide mb-8'>Shopping Cart</h3>
          {cart.totalItem <= 0 ? (
            <>
              <p className='font-bold pb-1'>{cart.totalItem} Product in Cart</p>
              <div className='min-h-[375px] border-2 grid place-items-center'>
                <div className='text-center space-y-5'>
                  <p>Your cart is empty. Keep shopping to find a product!</p>
                  <button className='btn btn-color' onClick={() => navigate('/')}>
                    Keep Shopping
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className='grid md:grid-cols-12'>
              <div className=' md:col-span-9 md:mr-10'>
                <p className='font-bold pb-1'>{cart.totalItem} Products in Cart</p>
                <div className='border-t-[1px] border-t-gray-400 flex-1'>
                  {cart.product.map((item, i) => (
                    <ProductCart
                      totalItem={item.totalItem}
                      totalPrice={item.totalPrice}
                      key={i}
                      _id={item._id}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
              <div className='space-y-1 md:col-span-3'>
                <h3 className='font-bold text-2xl'>Summary</h3>
                <div className='w-full flex items-center justify-between text-indigo-500'>
                  <h6>Total Items</h6>
                  <p className='font-bold'>{cart.totalItem} Items</p>
                </div>
                <hr />
                <div className='w-full flex items-center justify-between text-indigo-500'>
                  <h6>Total Price</h6>
                  <p className='font-bold'>Rp {cart.totalPrice.toLocaleString('id')}</p>
                </div>
                <button className='btn-full btn-color' disabled={loading} onClick={handleCheckout}>
                  {loading ? 'Loading...' : 'Checkout'}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

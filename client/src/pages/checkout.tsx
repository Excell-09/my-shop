import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppSelector } from '../store/hooks';
import ProductCart from '../components/ProductCart';

export default function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className='pt-[5rem] max-w-6xl mx-auto px-2'>
        <section>
          <h3 className='font-bold text-4xl tracking-wide mb-8'>Shopping Cart</h3>
          <div className='font-bold pb-1'>{cart.totalItem} Products in Cart</div>

          {cart.totalItem <= 0 ? (
            <div className='min-h-[375px] border-2 grid place-items-center'>
              <div className='text-center space-y-5'>
                <p>Your cart is empty. Keep shopping to find a product!</p>
                <button className='btn btn-color' onClick={() => navigate('/')}>
                  Keep Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className='border-t-[1px] border-t-gray-400'>
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
          )}
        </section>
        <section></section>
      </main>
      <Footer />
    </>
  );
}

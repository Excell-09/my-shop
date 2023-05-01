import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProductsState } from '../atom/productsAtom';
import { useEffect, useState } from 'react';
import { Product } from '../../typing';
import { useUserState } from '../atom/userAtom';
import { useErrorState } from '../atom/ErrorAtom';
import axiosCreate from '../utils/axiosCreate';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToCart } from '../slice/cartSlice';
import IncrementDecrementProduct from '../components/IncrementDecrementProduct';

export default function DetailProduct() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useErrorState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserState();
  const { products } = useProductsState();
  const { pathname } = useLocation();
  const [totalItem, setTotalItem] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    if (products.length === 0) {
      navigate('/');
    } else {
      const selectedProduct = products.filter((item) => item._id === id);
      setProduct(selectedProduct[0]);
    }
    //eslint-disable-next-line
  }, []);

  const handlePayment = async () => {
    if (loading) setLoading(false);
    setLoading(true);
    if (!user?._id || !product?.price) {
      navigate('/login');
      setError({ message: 'need Login!', type: 'error' });
      return;
    }

    try {
      const getCookie = document.cookie.split(';');
      const token = getCookie[1].split('=')[1];
      const response = await axiosCreate.post('/product/invoice', {
        token,
        amount: product.price,
      });
      window.location.replace(response.data.invoiceURL);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (loading) setLoading(false);
    if (!user?._id || !product) {
      navigate('/login');
      setError({ message: 'need Login!', type: 'error' });
      return;
    }
    dispatch(addToCart({ product, totalItem }));
    return;
  };

  const handleDecrement = () =>
    setTotalItem((prevValue) => {
      if (prevValue <= 1) {
        alert('minimal item' + prevValue);
        return 1;
      }
      return (prevValue -= 1);
    });
  const handleIncrement = () =>
    setTotalItem((prevValue) => {
      if (prevValue >= 10) {
        alert('maximal item' + prevValue);
        return prevValue;
      }
      return (prevValue += 1);
    });

  return (
    <>
      <Header />
      <main className='mt-[5rem]  max-w-4xl mx-auto bg-white p-2 sm:p-5 grid sm:grid-cols-2 gap-5'>
        <article className=''>
          <div className='max-w-[200px] mx-auto'>
            <img
              src={product?.imageUrl}
              alt={product?.title}
              className='w-full h-full object-contain'
            />
          </div>
        </article>
        <article className='space-y-3'>
          <h1 className='font-bold text-2xl text-gray-600'>{product?.title}</h1>
          <p className='text-gray-500'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore in necessitatibus culpa
            reiciendis voluptatum, ipsa amet expedita debitis natus dolorem? Lo
          </p>
          <h3 className='text-xl font-medium text-indigo-500 '>
            Rp {product?.price.toLocaleString('id')}
          </h3>
          <IncrementDecrementProduct
            handleEventDecrement={handleDecrement}
            handleEventIncrement={handleIncrement}
            totalItem={totalItem}
          />
          <div className='flex gap-2'>
            <button
              disabled={loading}
              className='btn-full btn-color'
              onClick={() => handlePayment()}>
              {loading ? 'loading...' : 'Buy Now'}
            </button>
            <button
              disabled={loading}
              className='btn-full btn-color--outline'
              onClick={() => handleAddToCart()}>
              {loading ? 'loading...' : 'Add To Cart'}
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

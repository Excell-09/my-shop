import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProductsState } from '../atom/productsAtom';
import { useEffect, useState } from 'react';
import { Product } from '../../typing';
import { useUserState } from '../atom/userAtom';
import { useErrorState } from '../atom/ErrorAtom';
import axiosCreate from '../utils/axiosCreate';

export default function DetailProduct() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useErrorState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserState();
  const { products } = useProductsState();
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
        <article className=''>
          <h1 className='font-bold text-2xl text-gray-600 mb-3'>{product?.title}</h1>
          <p className='text-gray-500'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore in necessitatibus culpa
            reiciendis voluptatum, ipsa amet expedita debitis natus dolorem? Lo
          </p>
          <button disabled={loading} className='btn-full btn-color' onClick={() => handlePayment()}>
            {loading ? 'loading...' : 'Buy Now'}
          </button>
        </article>
      </main>
      <Footer />
    </>
  );
}

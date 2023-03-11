import React from 'react';
import { IProduct } from '../../typings';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/slice/cartSlice';

const CartProduct = ({ _id, title, imageUrl, price }: IProduct) => {
  let formattedPrice = price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  formattedPrice = formattedPrice.slice(0, -3);
  const dispatch = useDispatch();
  return (
    <div className='w-full flex flex-col items-center justify-center md:p-2 p-1 gap-3'>
      <div>
        <img src={imageUrl} alt='product' className='object-contain w-[100px] h-[100px]' />
      </div>
      <h3 className='font-semibold line-clamp-1'>{title}</h3>
      <small className='text-lg md:text-xl text-red-600'>{formattedPrice}</small>
      <button
        className=' bg-indigo-500 hover:bg-indigo-700 p-2 text-center w-full text-white font-semibold active:bg-indigo-600 z-30 cursor-pointer'
        onClick={() => dispatch(addToCart({ item: { title, imageUrl, price, _id } }))}>
        Add to cart
      </button>
    </div>
  );
};

export default CartProduct;

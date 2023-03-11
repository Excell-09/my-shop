import { CartItemStore, decrementQuantity, incrementQuantity } from '@/slice/cartSlice';
import React from 'react';
import { XCircleIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { removeItem } from '@/slice/cartSlice';

const CardProductCheckout = ({ _id, title, imageUrl, quantity, price }: CartItemStore) => {
  let formattedPrice = price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  formattedPrice = formattedPrice.slice(0, -3);
  const dispatch = useDispatch();
  return (
    <div className='flex p-4 border-2'>
      <div className='w-24 h-24'>
        <img src={imageUrl} alt={title} className='object-contain w-full h-full select-none' />
      </div>
      <div className='flex-1 flex flex-col'>
        <div className='flex justify-between flex-1'>
          <h3 className='font-semibold line-clamp-1 select-none'>{title}</h3>
          <div>
            <XCircleIcon
              className='w-8 h-8 cursor-pointer'
              onClick={() => dispatch(removeItem({ _id: _id }))}
            />
          </div>
        </div>
        <div className='flex-1 flex justify-between items-end'>
          <div className='flex item-center gap-3'>
            <div className='w-7 h-7'>
              <MinusCircleIcon
                className='cursor-pointer'
                onClick={() => dispatch(decrementQuantity({ _id: _id }))}
              />
            </div>
            <h3 className='select-none'>{quantity}</h3>
            <div className='w-7 h-7'>
              <PlusCircleIcon
                className='cursor-pointer'
                onClick={() => dispatch(incrementQuantity({ _id: _id }))}
              />
            </div>
          </div>
          <p className='text-red-500 font-semibold select-none'>{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProductCheckout;

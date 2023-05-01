import { ProductCart } from '../../typing';
import IncrementDecrementProduct from './IncrementDecrementProduct';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { decrementItem, incrementItem, removeItem } from '../slice/cartSlice';

export default function ProductCart(props: ProductCart) {
  const dispatch = useDispatch();
  const handleRemove = () => dispatch(removeItem({ productId: props._id }));
  const handleIncrement = () => dispatch(incrementItem({ productId: props._id }));
  const handleDecrement = () => dispatch(decrementItem({ productId: props._id }));

  return (
    <div className='flex justify-between space-x-3 py-3 relative'>
      <div className='max-w-[60px] min-h-[100px]'>
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className='flex-1'>
        <h3 className='sm:text-lg font-semibold line-clamp-1 text-sm'>{props.title}</h3>
        <p className='sm:text-sm text-xs'>
          {' '}
          Rp
          {props.price.toLocaleString('id')} &#215; {props.totalItem}
        </p>
        <div className='flex gap-3 mt-3 absolute'>
          <IncrementDecrementProduct
            handleEventDecrement={handleDecrement}
            handleEventIncrement={handleIncrement}
            totalItem={props.totalItem}
          />{' '}
          <button className='text-red-600 font-semibold text-sm' onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
      <p className='font-bold text-indigo-500 text-sm whitespace-nowrap'>Rp {props.totalPrice.toLocaleString('id')}</p>
    </div>
  );
}

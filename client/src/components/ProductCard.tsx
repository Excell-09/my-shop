import { useNavigate } from 'react-router-dom';
import { Product } from '../../typing';
import ButtonWishlist from './ButtonWishlist';

export default function ProductCard(props: Product) {
  const navigate = useNavigate();
  return (
    <div className=' p-1 bg-white space-y-3 flex flex-col justify-between cursor-pointer relative group'>
      <ButtonWishlist _idProducts={props._id} />
      <div className='max-w-[125px] mx-auto'>
        <img
          src={props.imageUrl}
          alt={props.title}
          className='w-full h-full object-contain aspect-square'
        />
      </div>
      <div className='px-3'>
        <h6 className='line-clamp-2 text-sm'>{props.title}</h6>
      </div>
      <p className='text-indigo-500 px-3'>Rp {props.price.toLocaleString('id')}</p>
      <button type='button'
        className='text-center btn btn-color'
        onClick={() => navigate(`/product/${props._id}`)}>
        Product detail
      </button>
    </div>
  );
}

import { Product } from '../../typing';
import ButtonWishlist from './ButtonWishlist';

export default function ProductCard(props: Product) {
  return (
    <div className=' p-1 bg-white space-y-3 flex flex-col justify-between cursor-pointer hover:z-20 hover:border-2 hover:border-indigo-500 relative group transition-all duration-100'>
      <ButtonWishlist _idProducts={props._id} />
      <div className='max-w-[125px] mx-auto'>
        <img
          src={props.imageUrl}
          alt={props.title}
          className='w-full h-full object-contain aspect-square'
        />
      </div>
      <div className='p-3'>
        <h6 className='line-clamp-2 text-sm'>{props.title}</h6>
      </div>
      <p className='text-indigo-500 p-3'>Rp {props.price.toLocaleString('id')}</p>
      <div className='text-center absolute -bottom-7 -left-[2px] -right-[2px] bg-indigo-500 py-2 z-40 text-white hidden group-hover:inline-block'>
        Product detail
      </div>
    </div>
  );
}

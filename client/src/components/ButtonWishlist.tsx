import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useUserState } from '../atom/userAtom';
import axiosCreate from '../utils/axiosCreate';
import { useRecoilState } from 'recoil';
import productIdWishlistState from '../atom/productIdWishlist';
import { useNavigate } from 'react-router-dom';
import { useErrorState } from '../atom/ErrorAtom';

type props = {
  _idProducts: string;
};

export default function ButtonWishlist({ _idProducts }: props) {
  const { user } = useUserState();
  const [productIdWishlist, setProductIdWishlist] = useRecoilState(productIdWishlistState);
  const navigate = useNavigate();
  const { setError } = useErrorState();

  const isLiked = (): boolean => {
    return productIdWishlist.includes(_idProducts);
  };

  const handleDisLike = () => {
    const currentProduct = [...productIdWishlist];
    const index = productIdWishlist.indexOf(_idProducts);
    currentProduct.splice(index, 1);
    setProductIdWishlist(currentProduct);
  };

  const handleLike = () => {
    setProductIdWishlist((id) => [...id, _idProducts]);
    console.log(productIdWishlist);
  };

  const handleRequestLike = async () => {
    if (!user?._id) {
      navigate('/login');
      setError({ type: 'error', message: 'you need login if you want add wishlist product' });
      return;
    }
    try {
      if (isLiked()) {
        handleDisLike();
      } else {
        handleLike();
      }
      await axiosCreate.post('/product/wishlist/' + user?._id, { id: _idProducts });
    } catch (error) {
      if (isLiked()) {
        handleLike();
      } else {
        handleDisLike();
      }
    }
  };

  return (
    <div className='absolute top-1 right-1'>
      {isLiked() ? (
        <HeartIconSolid className='w-8 text-pink-500' onClick={() => handleRequestLike()} />
      ) : (
        <HeartIcon className='w-8 text-pink-500' onClick={() => handleRequestLike()} />
      )}
    </div>
  );
}

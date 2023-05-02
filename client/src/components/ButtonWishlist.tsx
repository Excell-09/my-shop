import { useEffect } from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useUserState } from '../atom/userAtom';
import axiosCreate from '../utils/axiosCreate';
import { useRecoilState } from 'recoil';
import productIdWishlistState from '../atom/productIdWishlist';

type props = {
  _idProducts: string;
};

export default function ButtonWishlist({ _idProducts }: props) {
  const { user } = useUserState();
  const [productId, setProductId] = useRecoilState(productIdWishlistState);

  useEffect(() => {
    if (user?._id) {
      setProductId(user.wishlistProduct);
    }
    //eslint-disable-next-line
  }, []);

  const isLiked = (): boolean => {
    return productId.includes(_idProducts);
  };

  const handleDisLike = () => {
    const currentProduct = [...productId];
    const index = productId.indexOf(_idProducts);
    currentProduct.splice(index, 1);
    setProductId(currentProduct);
  };

  const handleLike = () => {
    setProductId((id) => [...id, _idProducts]);
  };


  const handleRequestLike = async () => {
    if (!user?._id) return;
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

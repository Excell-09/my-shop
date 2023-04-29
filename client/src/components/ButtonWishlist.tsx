import React from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useUserState } from '../atom/userAtom';
import axiosCreate from '../utils/axiosCreate';

type props = {
  _idProducts: string;
};

export default function ButtonWishlist({ _idProducts }: props) {
  const [productId, setProductId] = React.useState<string[]>([]);
  const { user } = useUserState();

  React.useEffect(() => {
    if (user?._id) {
      setProductId(user.wishlistProduct);
    }
  }, [user?._id]);

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

  const handleRequestLike = React.useCallback(async () => {
    if (!user?._id) return;
    try {
      if (isLiked()) {
        handleDisLike();
      } else {
        handleLike();
      }
      await axiosCreate.post('/product/wishlist/' + user?._id, { id: _idProducts });
    } catch (error) {
      console.log(error);
      if (isLiked()) {
        handleLike();
      } else {
        handleDisLike();
      }
    }
  }, [productId]);

  return (
    <div className='absolute top-1 right-1 z-30'>
      {isLiked() ? (
        <HeartIconSolid className='w-8 text-pink-500' onClick={() => handleRequestLike()} />
      ) : (
        <HeartIcon className='w-8 text-pink-500' onClick={() => handleRequestLike()} />
      )}
    </div>
  );
}

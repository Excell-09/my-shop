import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { IUser } from '../../typings';
import { useAppSelector } from '@/app/hooks';
import axiosPost from '@/utils/axiosPost';
import { useRouter } from 'next/router';

interface Props {
  _id: string;
  IdProducts?: string[];
}

interface Data {
  id: string;
}

const WishlistButton = (props: Props) => {
  const user = useAppSelector<IUser | null>((state) => state.user.user);
  const router = useRouter();

  const handleWishlist = async () => {
    if (!user) {
      alert('Login To add your product wishlist');
      return;
    }

    try {
      router.push('/wishlist');
      if (router.pathname === '/wishlist') {
        router.reload();
      }
      await axiosPost<Data>(`/product/wishlist/${user?._id}`, {
        id: props._id,
      });
    } catch (error: any) {
      if (error.response.data.msg === 'you need to login') {
        alert(error.response.data.msg);
        return;
      }
      if (props.IdProducts) {
        const index = props.IdProducts.indexOf(props._id);
        if (index !== -1) {
          props.IdProducts.splice(index, 1);
        }
        router.push('/');
      }
    }
  };
  return (
    <div className='cursor-pointer' onClick={handleWishlist}>
      {props.IdProducts?.includes(props._id) ? (
        <HeartIconSolid className={`w-7 h-7 text-pink-500`} />
      ) : (
        <HeartIcon className={`w-7 h-7`} />
      )}
    </div>
  );
};

export default WishlistButton;

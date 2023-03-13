import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Props {
  _id: string;
  IdProducts?: string[] | string;
}

const WishlistButton = (props: Props) => {
  return (
    <div className='cursor-pointer'>
      {props.IdProducts?.includes(props._id) ? (
        <HeartIconSolid className={`w-7 h-7 text-pink-500`} />
      ) : (
        <HeartIcon className={`w-7 h-7`} />
      )}
    </div>
  );
};

export default WishlistButton;

import Link from 'next/link';
import React from 'react';

const Success = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex'>
        <h3 className='text-green-500 text-xl font-bold'>Payment Success!</h3>
        <Link href={'/'}>Back</Link>
      </div>
    </div>
  );
};

export default Success;

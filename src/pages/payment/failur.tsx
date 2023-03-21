import Link from 'next/link';
import React from 'react';

const Failur = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex'>
        <h3 className='text-red-500 text-xl font-bold'>Payment Fail!</h3>
        <Link href={'/'}>Back</Link>
      </div>
    </div>
  );
};

export default Failur;

import React from 'react';

const LoadingBig = () => {
  return (
    <div className=' min-h-screen justify-center items-center flex-col flex space-y-5 bg-white'>
      <div className='flex  space-x-5'>
        <span className='relative flex h-10 w-10'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-full w-full bg-sky-500'></span>
        </span>
        <span className='relative flex h-10 w-10'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-full w-full bg-sky-500'></span>
        </span>
        <span className='relative flex h-10 w-10'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-full w-full bg-sky-500'></span>
        </span>
      </div>
      <h1 className='text-black font-bold text-3xl'>
        My<span className='text-pink-500'>Shop</span>
      </h1>
    </div>
  );
};

export default LoadingBig;

import Layout from '@/components/Layout';
import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

const Success = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center w-full h-screen -mt-16 space-x-1'>
        <CheckBadgeIcon className='text-green-500 w-7 h-7' />
        <h3 className='text-green-500 text-xl font-bold'>Payment Success!</h3>
      </div>
    </Layout>
  );
};

export default Success;

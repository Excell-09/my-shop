import Layout from '@/components/Layout';
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Failur = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center w-full h-screen space-x-1 -mt-16'>
        <ExclamationCircleIcon className='text-red-500 w-7 h-7' />
        <h3 className='text-red-500 text-xl font-bold'>Payment Fail!</h3>
      </div>
    </Layout>
  );
};

export default Failur;

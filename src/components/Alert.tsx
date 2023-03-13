import { useAppSelector } from '@/app/hooks';
import React from 'react';

const Alert = () => {
  const alertText = useAppSelector((state) => state.alert.alert);
  const alertStatus: '' | 'error' | 'sucess' = useAppSelector((state) => state.alert.status);
  const ALERTCOLOR: { [key: string]: string } = {
    error: 'bg-red-500 border-red-500 text-red-500',
    sucess: 'bg-green-500 border-green-500 text-green-700',
  };
  return (
    <>
      {alertText && (
        <div
          className={`p-2 w-full border-2 bg-opacity-30 font-semibold ${ALERTCOLOR[alertStatus]} rounded-md flex justify-center items-center`}>
          {alertText}
        </div>
      )}
    </>
  );
};

export default Alert;

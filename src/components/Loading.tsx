import React from 'react';

const Loading = () => {
  return (
    <div className='h-full w-full'>
      <div className='animate-spin min-h-full min-w-full border-[5px] border-transparent border-t-indigo-500 rounded-full border-l-indigo-500' />
    </div>
  );
};

export default Loading;

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  totalItem: number;
  handleEventDecrement: () => void;
  handleEventIncrement: () => void;
}

export default function IncrementDecrementProduct({
  totalItem,
  handleEventDecrement,
  handleEventIncrement,
}: Props) {
  return (
    <div className='border-2 inline-flex'>
      <div className='max-w-[23px] mx-2'>
        <ChevronLeftIcon className='w-full h-full cursor-pointer' onClick={handleEventDecrement} />
      </div>
      <div className=' border-x-2 px-4 font-semibold'>{totalItem}</div>
      <div className='max-w-[23px] mx-2'>
        <ChevronRightIcon className='w-full h-full cursor-pointer' onClick={handleEventIncrement} />
      </div>
    </div>
  );
}

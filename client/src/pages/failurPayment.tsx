import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function FailurePayment() {
  return (
    <main className='min-h-screen grid place-items-center px-1'>
      <section className='flex items-start gap-2'>
        <div className='max-w-[45px]'>
          <InformationCircleIcon className='h-full w-full text-red-600' />
        </div>
        <article>
          <h6 className='text-lg sm:text-3xl font-semibold'>Seems has an error</h6>
          <Link className='link capitalize text-sm sm:text-lg' to={'/'}>
            Try checkout again!
          </Link>
        </article>
      </section>
    </main>
  );
}

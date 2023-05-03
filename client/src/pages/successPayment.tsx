import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function SuccessPayment() {
  return (
    <main className='min-h-screen grid place-items-center px-1'>
      <section className='flex items-start gap-2'>
        <div className='max-w-[50px]'>
          <CheckBadgeIcon  className='h-full w-full text-green-600'/>
        </div>
        <article>
          <h6 className='text-lg sm:text-3xl font-semibold'>Thank You For Shopping</h6>
          <Link className='link lowercase text-sm sm:text-lg' to={'/'}>
            let's Shopping Again
          </Link>
        </article>
      </section>
    </main>
  );
}

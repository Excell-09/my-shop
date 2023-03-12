import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../assets/android-chrome-512x512.png';
import { useRouter } from 'next/router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '@/app/hooks';

interface INavigation {
  display: string;
  href: string;
}

const navigation: INavigation[] = [
  { display: 'Home', href: '/' },
  { display: 'Wishlist', href: '/wishlist' },
];

export default function Navbar() {
  const router = useRouter();
  const totalLengthItem = useAppSelector((state) => state.cart.totalItems);

  return (
    <Disclosure as='nav' className='bg-gray-800 hidden sm:block fixed top-0 left-0 w-full z-50'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
          <div className='flex flex-1 items-center justify-between'>
            <div
              className='flex flex-shrink-0 items-center cursor-pointer'
              onClick={() => router.push('/')}>
              <Image
                src={Logo}
                alt='logo'
                width={40}
                height={40}
                onClick={() => router.push('/')}
              />
            </div>

            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-2 whitespace-nowrap text-medium font-semibold items-center'>
                {navigation.map(({ display, href }: INavigation, i) => {
                  if (display === 'Wishlist') {
                    return (
                      <Link
                        href={href}
                        key={i}
                        className={`${
                          router.pathname === href
                            ? 'rounded-full text-opacity-100'
                            : 'text-opacity-40'
                        } px-3 py-1 text-pink-500 transition duration-200 hover:text-opacity-100`}>
                        {display}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={i}
                      href={href}
                      className={`${
                        router.pathname === href
                          ? 'bg-gray-700 rounded-full text-white text-opacity-100'
                          : 'text-opacity-40'
                      }  hover:bg-gray-600 hover:rounded-full rounded-full  px-2 py-1 text-white transition duration-200  hover:text-opacity-100`}>
                      {display}
                    </Link>
                  );
                })}
                <Link
                  href={'/register'}
                  className={`${
                    router.pathname === '/register'
                      ? 'bg-indigo-700 rounded-full border-2 border-transparent'
                      : ''
                  }  hover:bg-indigo-600 hover:rounded-full px-3 py-1 border-indigo-600 border-2 rounded-full transition duration-200 text-white`}>
                  Get Started
                </Link>
              </div>
            </div>
            <div className='relative cursor-pointer' onClick={() => router.push('/checkout')}>
              <small className='absolute top-0 -right-1 bg-pink-300 rounded-full w-5 h-5 text-pink-600 font-bold flex justify-center items-center'>
                {totalLengthItem}
              </small>
              <ShoppingCartIcon className='w-9 h-9 text-pink-500' />
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

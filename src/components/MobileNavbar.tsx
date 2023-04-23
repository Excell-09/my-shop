import React, { useState } from 'react';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';
import Logo from './../assets/android-chrome-512x512.png';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import logoutUser from '@/utils/logoutUser';
import { clearUser } from '@/slice/userSlice';
import { RootState } from '@/app/store';

interface INavigation {
  display: string;
  href: string;
}

const navigation: INavigation[] = [
  { display: 'Home', href: '/' },
  { display: 'Wishlist', href: '/wishlist' },
];
const MobileNavbar = () => {
  const router = useRouter();
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const variants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  const totalLengthItem = useAppSelector((state) => state.cart.totalItems);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  return (
    <nav className='fixed top-0 left-0 w-full sm:hidden z-50'>
      <div className='relative'>
        <div className='bg-gray-800 p-3 absolute top-0 left-0 w-full'>
          <div className='flex justify-between items-center'>
            <div className='cursor-pointer' onClick={() => router.push('/')}>
              <Image src={Logo} alt='logo' width={40} height={40} />
            </div>
            <div className='relative cursor-pointer' onClick={() => router.push('/checkout')}>
              <small className='absolute top-0 -right-1 bg-pink-300 rounded-full w-5 h-5 text-pink-600  font-bold flex justify-center items-center'>
                {totalLengthItem}
              </small>
              <ShoppingCartIcon className='w-9 h-9 text-pink-500' />
            </div>
            <div className='flex justify-center items-center'>
              <Bars3Icon
                className='w-11 h-11 text-white p-2 bg-indigo-500 rounded-full hover:bg-indigo-600'
                onClick={() => setIsOpenNav(true)}
              />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpenNav && (
            <>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={{ hidden: { opacity: 0 }, visible: { opacity: '100%' } }}
                transition={{ duration: 0.3 }}
                exit='hidden'
                className='absolute top-0 left-0 w-full bg-black h-screen bg-opacity-50'
                onClick={() => setIsOpenNav(false)}
              />
              <motion.div
                className='absolute top-0 right-0 w-1/2'
                initial='closed'
                animate='open'
                exit='closed'
                variants={variants}
                transition={{ duration: 0.3 }}>
                <div className='bg-gray-800 py-3 px-4 min-h-screen space-y-5'>
                  <div>
                    <XCircleIcon
                      className='w-12 h-12 text-white ml-auto'
                      onClick={() => setIsOpenNav(false)}
                    />
                  </div>
                  <div className='flex flex-col space-y-1 font-semibold text-lg'>
                    {navigation.map(({ display, href }: INavigation, i: number) => {
                      if (display === 'Wishlist') {
                        return (
                          <Link
                            href={href}
                            key={i}
                            className={`${
                              router.pathname === href
                                ? 'rounded-full text-opacity-100 bg-black bg-opacity-30'
                                : 'text-opacity-40'
                            }  py-2 text-pink-500 transition duration-200 hover:text-opacity-100 text-center`}>
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
                          }  hover:bg-gray-600 hover:rounded-full rounded-full py-2 text-white transition duration-200  hover:text-opacity-100 text-center`}>
                          {display}
                        </Link>
                      );
                    })}
                    {user ? (
                      <button
                        type='button'
                        className='bg-red-500 px-3 py-1 rounded-full hover:rounded-full hover:bg-red-400 text-white'
                        onClick={() => {
                          logoutUser();
                          dispatch(clearUser({}));
                          router.push('/login');
                        }}>
                        Logout
                      </button>
                    ) : (
                      <Link
                        href={'/register'}
                        className={`${
                          router.pathname === '/register'
                            ? 'bg-indigo-700 rounded-full border-2 border-transparent'
                            : ''
                        }  hover:bg-indigo-600 hover:rounded-full py-1 border-indigo-600 border-2 rounded-full transition duration-200 text-white text-center whitespace-nowrap p-1`}>
                        Get Started
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default MobileNavbar;

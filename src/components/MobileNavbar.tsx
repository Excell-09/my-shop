import React, { useState } from 'react';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';
import Logo from './../assets/android-chrome-512x512.png';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface INavigation {
  display: string;
  href: string;
}

const navigation: INavigation[] = [
  { display: 'Home', href: '/' },
  { display: 'Wishlist', href: '/wishlist' },
  { display: 'Checkout', href: '/checkout' },
];
const MobileNavbar = () => {
  const router = useRouter();
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const variants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };
  return (
    <nav className='relative h-full sm:hidden'>
      <div className='bg-gray-800 p-3 absolute top-0 left-0 w-full'>
        <div className='flex justify-between items-center'>
          <div>
            <Image src={Logo} alt='logo' width={40} height={40} />
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
              <div className='bg-gray-800 p-3 min-h-screen space-y-5'>
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
                          }  py-3 px-5 text-pink-500 transition duration-200 hover:text-opacity-100`}>
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
                        }  hover:bg-gray-600 hover:rounded-full rounded-full   py-3 px-5 text-white transition duration-200  hover:text-opacity-100`}>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavbar;

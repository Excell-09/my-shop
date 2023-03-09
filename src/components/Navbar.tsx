import { ForwardRefExoticComponent, SVGProps } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../assets/android-chrome-512x512.png';
import { useRouter } from 'next/router';

interface INavigation {
  display: string;
  href: string;
}

const navigation: INavigation[] = [
  { display: 'Home', href: '/' },
  { display: 'Wishlist', href: '/wishlist' },
  { display: 'Checkout', href: '/checkout' },
  { display: 'Get Started', href: '/register' },
];

export default function Navbar() {
  const router = useRouter();
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div className='flex flex-shrink-0 items-center'>
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
                      if (display === 'Get Started') {
                        return (
                          <Link
                            href={href}
                            key={i}
                            className={`${
                              router.pathname === href
                                ? 'bg-indigo-700 rounded-full border-2 border-transparent'
                                : ''
                            }  hover:bg-indigo-600 hover:rounded-full px-3 py-1 border-indigo-600 border-2 rounded-full transition duration-200 text-white`}>
                            {display}
                          </Link>
                        );
                      }
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

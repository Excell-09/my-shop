import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '../assets/favicon-32x32.png';
import { useRouter } from 'next/router';

const Footer = () => {
  const dateNow = new Date().getFullYear();
  const router = useRouter();
  return (
    <footer className='bg-white mt-5 px-3 py-5 sm:p-6 text-sm md:text-base'>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-5 mb-7'>
        <div className='col-span-2'>
          <Image src={Logo} alt='logo' width={50} height={50} />
          <p className='text-gray-600 mt-2'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi eveniet quisquam id
            illum, recusandae nihil at provident nobis rerum labore?
          </p>
        </div>
        <div>
          <h3 className='text-pink-500 text-xl font-bold mb-3'>Pages</h3>
          <div className='flex flex-col gap-1'>
            <Link
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'
              href={'/'}>
              Home
            </Link>
            <Link
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'
              href={'/wishlist'}>
              Wishlist
            </Link>
            <Link
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'
              href={'/register'}>
              Register
            </Link>
            <Link
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'
              href={'/login'}>
              Login
            </Link>
            <Link
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'
              href={'/checkout'}>
              checkout
            </Link>
          </div>
        </div>
        <div>
          <h3 className='text-pink-500 text-xl font-bold mb-3'>Quick Started</h3>
          <div className='flex flex-col gap-1'>
            <button
              onClick={() => {
                router.push('/register');
                router.reload();
              }}
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'>
              Register
            </button>
            <button
              onClick={() => {
                router.push('/login');
                router.reload();
              }}
              className='hover:text-indigo-500 transition duration-100 text-gray-600 font-semibold'>
              Login
            </button>
          </div>
        </div>
      </div>
      <hr className=' border-t-2 border-indigo-500 my-3' />
      <p className='text-gray-700 text-center'>
        &#169; {dateNow} Jun Choi, inc. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;

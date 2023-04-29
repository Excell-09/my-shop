import logo from '../assets/android-chrome-192x192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useUserState } from '../atom/userAtom';
import {logoutUser} from '../authProvider/AuthProvider'

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUserState();
  const NAV_LINK = [
    { label: 'home', to: '/' },
    { label: 'wishlist', to: '/wishlist' },
    { label: 'Get Started', to: '/register' },
  ];

  return (
    <header className='p-3 bg-white z-50 fixed top-0 left-0 w-full'>
      <div className='flex items-center justify-between max-w-[1200px] mx-auto w-full cursor-pointer'>
        <div className='flex items-end gap-1' onClick={() => navigate('/')}>
          <div className='max-w-[48px]'>
            <img src={logo} alt='logo' />
          </div>
          <h3 className='text-2xl font-semibold'>y Shop</h3>
        </div>
        <nav className='hidden sm:flex sm:gap-3 sm:items-center'>
          {NAV_LINK.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) => (isActive ? 'underline link' : 'link')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className='flex items-center gap-3'>
          <div className='relative cursor-pointer' onClick={() => navigate('/checkout')}>
            <ShoppingCartIcon className='w-8' />
            {user !== null && (
              <small className='absolute -top-1 -right-1 bg-violet-500 text-violet-50 w-5 h-5 flex items-center justify-center rounded-full font-bold'>
                0
              </small>
            )}
          </div>
          <div className='w-10 h-10'>
            {user === null ? (
              <UserIcon className='w-full cursor-pointer' onClick={() => navigate('/login')} />
            ) : (
              <div className='w-full h-full bg-indigo-500 text-xl font-semibold text-white uppercase flex justify-center items-center rounded-full' onClick={()=> logoutUser()}>
                {user?.name?.slice(0, 1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

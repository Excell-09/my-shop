import logo from '../assets/android-chrome-192x192.png';
import { NavLink, useNavigate } from 'react-router-dom';

export default function HeaderRegisterLogin() {
  const navigate = useNavigate();

  return (
    <header className='fixed top-0 left-0 w-full flex items-center justify-between p-3 shadow-md bg-white'>
      <div className=' max-w-[46px]' onClick={() => navigate('/')}>
        <img src={logo} className='w-full h-full cursor-pointer' />
      </div>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? 'underline link mr-3' : 'mr-3 link')}
          to='/register'>
          REGISTER
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'underline link' : 'link')} to='/login'>
          LOGIN
        </NavLink>
      </nav>
    </header>
  );
}

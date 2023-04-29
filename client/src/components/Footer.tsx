import { Link } from 'react-router-dom';
import logo from '../assets/android-chrome-192x192.png';
export default function Footer() {
  const getCurrentYear = new Date(Date.now()).getFullYear();
  const LINK_PAGE = [
    { label: 'home', to: '/' },
    { label: 'wishlist', to: '/wishlist' },
    { label: 'checkout', to: '/checkout' },
    { label: 'login', to: '/login' },
    { label: 'register', to: '/register' },
  ];
  return (
    <footer className='bg-white mt-5 grid grid-cols-2 p-7 gap-5 border-t-4 border-indigo-500'>
      <header className='col-span-full sm:col-span-1'>
        <div className='max-w-[45px] mb-3'>
          <img src={logo} alt='' />
        </div>
        <p className='text-gray-500 text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum officiis dolore cum
          praesentium necessitatibus, eos magnam repellendus! Voluptatibus, asperiores quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, eligendi?
        </p>
      </header>
      <section className='col-span-full sm:col-span-1 grid grid-cols-2'>
        <div>
          <h3 className='text-xl text-violet-500 font-bold mb-2'>Pages</h3>
          <div className='flex flex-col gap-1 items-start'>
            {LINK_PAGE.map((item, i) => (
              <Link key={i} to={item.to} className='link text-sm'>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className='text-xl text-violet-500 font-bold mb-2 whitespace-nowrap'>Quick Started</h3>
          <div className='flex flex-col gap-1 items-start'>
            {LINK_PAGE.slice(3).map((item, i) => (
              <Link key={i} to={item.to} className='link text-sm'>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className='col-span-full border-t-2'>
        <p className='text-center mt-4'>Jun Choi {getCurrentYear}</p>
      </div>
    </footer>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import HeaderRegisterLogin from '../components/HeaderRegisterLogin';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Alert from '../components/Alert';
import axiosCreate from '../utils/axiosCreate';
import { useErrorState } from '../atom/ErrorAtom';
import { useLoadingState } from '../atom/loadingAtom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AuthUser } from '../../typing';
import { useSetRecoilState } from 'recoil';
import userState from '../atom/userAtom';

export default function Login() {
  const setUser = useSetRecoilState(userState);

  const { error, setError } = useErrorState();
  const { isLoading, setLoading } = useLoadingState();
  const { control, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const setTokenToCookie = (token: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    let cookieValue = `token=${token};${expires};path=/;SameSite=Lax;`;
    if (window.location.protocol === 'https:') {
      cookieValue += `domain=${import.meta.env.VITE_BACKEND_URL};Secure`;
    }
    document.cookie = cookieValue;
  };

  const handleRegister: SubmitHandler<FieldValues> = async (value) => {
    if (isLoading) return;
    setLoading(true);
    setError({ message: '' });
    if (value.email === undefined || value.password === undefined) {
      setError({ message: 'Field Your Input' });
      setLoading(false);
      return;
    }

    const data = { email: value.email, password: value.password };

    try {
      const response = await axiosCreate.post<AuthUser>('/auth/login', data);
      setTokenToCookie(response.data.token);
      setUser(response.data.user);
      control._reset();
      setError({ message: 'Login Succeed...', type: 'success' });
      //eslint-disable-next-line
    } catch (error: any) {
      setError({ message: error.response.data.msg, type: 'error' });
      setLoading(false);
      return;
    }
    setLoading(false);
    setTimeout(() => {
      navigate('/');
      setError({ message: '' });
    }, 2000);
  };
  return (
    <>
      <HeaderRegisterLogin />
      <main className='container-center-screen'>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className='bg-white px-4 py-8 border-t-4 border-t-indigo-500 max-w-md w-full text-center shadow-md'>
          <h1 className='text-2xl text-center font-semibold text-indigo-500 mb-3'>Login</h1>
          <Alert message={error.message} type={error?.type} />
          <input
            {...register('email')}
            type='email'
            required
            placeholder='Enter Your Email'
            className='input bg-gray-100 rounded-sm'
          />
          <div className='relative'>
            <input
              {...register('password')}
              type={`${isPasswordShow ? 'text' : 'password'}`}
              required
              placeholder='Password'
              className='input bg-gray-100 rounded-sm'
            />
            {isPasswordShow ? (
              <EyeIcon
                className='absolute w-5 top-3 right-3 cursor-pointer'
                onClick={() => setIsPasswordShow(false)}
              />
            ) : (
              <EyeSlashIcon
                className='absolute w-5 top-3 right-3 cursor-pointer'
                onClick={() => setIsPasswordShow(true)}
              />
            )}
          </div>
          <button type='submit' className='btn-full btn-color mb-3' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <small className='text-gray-500 text-sm'>
            Do Not Have An Account?{' '}
            <Link
              className='text-violet-500 hover:underline transition-all duration-100 font-semibold'
              to={'/register'}>
              Register
            </Link>
          </small>
        </form>
      </main>
    </>
  );
}

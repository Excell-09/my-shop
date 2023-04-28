import { Link, useNavigate } from 'react-router-dom';
import HeaderRegisterLogin from '../components/HeaderRegisterLogin';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Alert from '../components/Alert';
import axiosCreate from '../utils/axiosCreate';
import { useErrorState } from '../atom/ErrorAtom';
import { useLoadingState } from '../atom/loadingAtom';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const { error, setError } = useErrorState();
  const { isLoading, setLoading } = useLoadingState();
  const { control, register, handleSubmit } = useForm();
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister: SubmitHandler<FieldValues> = async (value) => {
    if (isLoading) return;
    setLoading(true);
    setError({ message: '' });
    if (
      value.username === undefined ||
      value.email === undefined ||
      value.password === undefined ||
      value.confirmPassword === undefined
    ) {
      setError({ message: 'Field Your Input' });
      setLoading(false);
      return;
    }
    if (value.password !== value.confirmPassword) {
      setError({ message: 'Confirm Password Wrong!' });
      setLoading(false);
      return;
    }

    const data = { name: value.username, email: value.email, password: value.password };

    try {
      await axiosCreate.post('/auth/register', data);
      control._reset();
      setError({ message: 'Account Created', type: 'success' });
    } catch (error: any) {
      setError({ message: error.response.data.msg, type: 'error' });
      setLoading(false);
      return;
    }
    setLoading(false);
    setTimeout(() => {
      navigate('/login');
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
          <h1 className='text-2xl text-center font-semibold text-indigo-500 mb-3'>Register</h1>
          <Alert message={error.message} type={error?.type} />
          <input
            {...register('username')}
            type='text'
            required
            placeholder='Username'
            className='input bg-gray-100 rounded-sm mt-3'
          />
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
          <div className='relative'>
            <input
              {...register('confirmPassword')}
              type={`${isConfirmPasswordShow ? 'text' : 'password'}`}
              required
              placeholder='Confirm Password'
              className='input bg-gray-100 rounded-sm'
            />

            {isConfirmPasswordShow ? (
              <EyeIcon
                className='absolute w-5 top-3 right-3 cursor-pointer'
                onClick={() => setIsConfirmPasswordShow(false)}
              />
            ) : (
              <EyeSlashIcon
                className='absolute w-5 top-3 right-3 cursor-pointer'
                onClick={() => setIsConfirmPasswordShow(true)}
              />
            )}
          </div>

          <button type='submit' className='btn-full btn-color mb-3' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
          <small className='text-gray-500 text-sm'>
            Already Have An Account?{' '}
            <Link
              className='text-violet-500 hover:underline transition-all duration-100 font-semibold'
              to={'/login'}>
              Login
            </Link>
          </small>
        </form>
      </main>
    </>
  );
}

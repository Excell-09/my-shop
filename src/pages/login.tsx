import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Alert from '@/components/Alert';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { clearAlert, setAlert } from '@/slice/alertSlice';
import { setLoading } from '@/slice/loadingSlice';
import axiosPost from '@/utils/axiosPost';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Login } from '../../typings';

const initialValue: Login = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState<Login>(initialValue);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading.loading);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setValues({ ...initialValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearAlert({}));
    dispatch(setLoading({ loading: false }));

    const { email, password }: Login = values;
    if (!email || !password) {
      dispatch(setAlert({ text: 'Please Provide All Input', status: 'error' }));
      return;
    }

    try {
      dispatch(setLoading({ loading: true }));
      await axiosPost<Login>('/auth/login', values);
      dispatch(setAlert({ text: 'Login Success, Redirect...', status: 'sucess' }));
      handleClear();
    } catch (error: any) {
      if (error.response.status === 429) {
        dispatch(setAlert({ text: (error.response.statusText + '!') as string, status: 'error' }));
      } else {
        dispatch(setAlert({ text: error.response.data.msg as string, status: 'error' }));
      }
    }
    dispatch(setLoading({ loading: false }));
  };

  return (
    <Layout>
      <section className='min-h-screen flex justify-center items-center px-2'>
        <div className=' bg-white p-5 rounded-md basis-[400px]'>
          <h2 className='font-bold text-2xl text-pink-500 text-center'>Login</h2>
          <div className='my-3'>
            <Alert />
          </div>
          <form autoComplete='off' autoCorrect='off' onSubmit={handleSubmit} className='w-full'>
            <Input
              label='Email'
              type='email'
              id='email'
              placeholder='example@gmail.com'
              name='email'
              value={values.email}
              clickEvent={handleInput}
            />
            <Input
              label='Password'
              type='password'
              id='password'
              placeholder='password'
              name='password'
              value={values.password}
              clickEvent={handleInput}
            />
            <button
              disabled={loading}
              className='w-full bg-pink-500 py-2 text-white font-semibold hover:bg-pink-600 mt-5 disabled:opacity-60 disabled:cursor-progress'>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <p className='text-center mt-3'>
            Do Not Have Account??{' '}
            <Link href={'/register'} className='underline italic text-indigo-500 font-bold'>
              Get Started
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;

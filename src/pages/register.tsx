import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Alert from '@/components/Alert';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { clearAlert, setAlert } from '@/slice/alertSlice';
import { setLoading } from '@/slice/loadingSlice';
import axiosPost from '@/utils/axiosPost';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Register } from '../../typings';

const initialValue: Register = {
  email: '',
  password: '',
  name: '',
};

const Register = () => {
  const [values, setValues] = useState<Register>(initialValue);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading.loading);
  const router = useRouter();

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

    const { name, email, password }: Register = values;
    if (!name || !email || !password) {
      dispatch(setAlert({ text: 'Please Provide All Input', status: 'error' }));
      return;
    }

    try {
      dispatch(setLoading({ loading: true }));
      const response = await axiosPost<Register>('/auth/register', values);
      dispatch(setAlert({ text: 'User Created', status: 'sucess' }));
      handleClear();
      setTimeout(() => {
        router.push('/login');
        dispatch(clearAlert({}));
      }, 1000 as number);
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
      <section className='min-h-screen flex justify-center items-center px-2 -mt-16'>
        <div className=' bg-white p-5 rounded-md basis-[400px]'>
          <h2 className='font-bold text-2xl text-pink-500 text-center'>Get Started</h2>
          <div className='my-3'>
            <Alert />
          </div>
          <form autoComplete='off' autoCorrect='off' onSubmit={handleSubmit} className='w-full'>
            <Input
              label='Username'
              type='text'
              id='name'
              placeholder='username'
              name='name'
              value={values.name}
              clickEvent={handleInput}
            />
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
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <p className='text-center mt-3'>
            Already Have Account?{' '}
            <Link href={'/login'} className='underline italic text-indigo-500 font-bold'>
              Login
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Register;

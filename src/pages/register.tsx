import Input from '@/components/Input';
import Layout from '@/components/Layout';
import axiosPost from '@/utils/axiosPost';
import Link from 'next/link';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { Register } from '../../typings';

const initialValue: Register = {
  email: '',
  password: '',
  name: '',
};

const Register = () => {
  const [values, setValues] = useState<Register>(initialValue);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password }: Register = values;
    try {
      const response = await axiosPost('/auth/register', {
        name,
        email,
        password,
      });
      console.log(response);
    } catch (error) {}
  };

  return (
    <Layout>
      <section className='min-h-screen flex justify-center items-center px-2'>
        <div className=' bg-white p-5 rounded-md'>
          <h2 className='font-bold text-2xl text-pink-500 text-center'>Login</h2>
          <form autoComplete='off' autoCorrect='off' onSubmit={handleSubmit}>
            <Input
              label='Username'
              type='text'
              id='name'
              placeholder='username'
              name='name'
              clickEvent={handleInput}
            />
            <Input
              label='Email'
              type='email'
              id='email'
              placeholder='example@gmail.com'
              name='email'
              clickEvent={handleInput}
            />
            <Input
              label='Password'
              type='password'
              id='password'
              placeholder='password'
              name='password'
              clickEvent={handleInput}
            />
            <button className='w-full bg-pink-500 py-2 text-white font-semibold hover:bg-pink-600 mt-5'>
              Register
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

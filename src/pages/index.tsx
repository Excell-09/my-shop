import axiosGet from '@/utils/axiosGet';
import { useState } from 'react';
import { IProduct } from '../../typings';
import Layout from '../components/Layout';

interface Props {
  data: IProduct[];
}

const Home = (props: Props) => {
  const [products] = useState<IProduct[]>(props.data);
  return (
    <Layout>
      <button>Senggol dong</button>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await axiosGet<IProduct[]>('/product/product');
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;

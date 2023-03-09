import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../../typings';
import connectMongo from '@/mongoDb';
import ProductModels from '../../../models/ProductModels';
import { createRouter } from 'next-connect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct | IProduct[]>
) {
  try {
    await connectMongo();
    const product = await ProductModels.find<IProduct>();
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
}

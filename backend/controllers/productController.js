import { StatusCodes } from 'http-status-codes';
import ProductModels from '../models/Product.js';

const getProducts = async (req, res) => {
  const result = await ProductModels.find();
  res.status(StatusCodes.ACCEPTED).json(result);
};

export { getProducts };

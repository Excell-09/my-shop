import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';
import ProductModels from '../models/Product.js';
import User from '../models/User.js';

const getProducts = async (req, res) => {
  const result = await ProductModels.find();
  res.status(StatusCodes.OK).json(result);
};

const setProductsWishlist = async (req, res) => {
  const userId = req.params.id;
  const { id: productId } = req.body;

  if (userId === 'undefined') {
    throw new NotFoundError('you need to login');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new UnAuthenticatedError('Invalid User');
  }

  const product = await ProductModels.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError('Product Not Found!');
  }

  const isProductWishlist = await user.wishlistProduct.includes(productId);

  if (isProductWishlist) {
    const index = await user.wishlistProduct.indexOf(productId);
    user.wishlistProduct.splice(index, 1);
  } else {
    user.wishlistProduct.unshift(product._id);
  }

  await user.save();
  res.status(StatusCodes.CREATED).json('Wishlist updated!');
};

export { getProducts, setProductsWishlist };

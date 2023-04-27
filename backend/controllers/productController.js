import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';
import ProductModels from '../models/Product.js';
import User from '../models/User.js';

const getProducts = async (req, res) => {
  const result = await ProductModels.find();
  res.status(StatusCodes.OK).json(result);
};

const getProductsWishlist = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    throw new UnAuthenticatedError('Invalid User');
  }

  const productsId = user.wishlistProduct.map((product) => product);

  if (productsId.length === 0) {
    res.status(StatusCodes.OK).json("You Don't have any product in your wishlist");
    return;
  }

  const products = await ProductModels.find({ _id: { $in: productsId } });
  res.status(StatusCodes.OK).json(products);
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

export { getProducts, getProductsWishlist, setProductsWishlist };

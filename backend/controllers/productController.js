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
    throw new NotFoundError('Product Already in List!');
  }

  user.wishlistProduct.unshift(product._id);
  await user.save();
  res.status(StatusCodes.CREATED).json('Wistlist!');
};

export { getProducts, getProductsWishlist, setProductsWishlist };

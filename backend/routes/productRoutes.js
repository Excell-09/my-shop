import express from 'express';
import { payment } from '../controllers/paymentController.js';
import {
  getProducts,
  getProductsWishlist,
  setProductsWishlist,
} from '../controllers/productController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/wishlist/:id').get(getProductsWishlist).post(setProductsWishlist);
router.route('/invoice').post(authenticateUser, payment);

export default router;

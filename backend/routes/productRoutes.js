import express from 'express';
import { payment } from '../controllers/paymentController.js';
import { getProducts, setProductsWishlist } from '../controllers/productController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/wishlist/:id').post(setProductsWishlist);
router.route('/invoice').post(authenticateUser, payment);

export default router;

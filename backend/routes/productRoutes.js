import express from 'express';
import {
  getProducts,
  getProductsWishlist,
  setProductsWishlist,
  deleteProductWishlist,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router
  .route('/wishlist/:id')
  .get(getProductsWishlist)
  .post(setProductsWishlist)
  .delete(deleteProductWishlist);

export default router;

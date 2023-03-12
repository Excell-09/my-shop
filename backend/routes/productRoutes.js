import express from 'express';
import { getProducts } from '../controllers/productController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts);

export default router;

import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests, please try again after 15 minutes',
});

import { register, login, getCurrentUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);

router.route('/getCurrentUser').post(authenticateUser, getCurrentUser);

export default router;

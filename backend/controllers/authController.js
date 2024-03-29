import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create({ name, email, password });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new NotFoundError('User Not Found, Register Instead!');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new NotFoundError('User Not Found, Register Instead!');
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export { register, login, getCurrentUser };

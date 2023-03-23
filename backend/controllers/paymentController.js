import { StatusCodes } from 'http-status-codes';
import Xendit from 'xendit-node';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

const xendit = new Xendit({
  secretKey: process.env.SECRET_KEY_XENDIT,
});

const payment = async (req, res) => {
  const { amount } = req.body;
  const { userId } = req.user;
  const { email } = await User.findById(userId);
  const { Invoice } = xendit;
  const retailOutletSpecificOptions = {};
  const invoice = new Invoice(retailOutletSpecificOptions);

  if (!amount) {
    throw new BadRequestError('Please Provide your input!');
  }

  if (!email || !userId) {
    throw new UnAuthenticatedError('Please Provide your input!');
  }

  const { id } = await invoice.createInvoice({
    externalID: userId,
    payerEmail: email,
    description: 'test payment description',
    amount: amount,
    shouldSendEmail: true,
    successRedirectURL: process.env.CLIENT_URL + '/payment/success',
    failureRedirectURL: process.env.CLIENT_URL + '/payment/fail',
  });
  const invoiceURL = await invoice.getInvoice({
    invoiceID: id,
  });

  res.status(StatusCodes.OK).json({ invoiceURL: invoiceURL.invoice_url });
};

export { payment };

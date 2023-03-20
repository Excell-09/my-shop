import { StatusCodes } from 'http-status-codes';
import Xendit from 'xendit-node';
import { BadRequestError } from '../errors/index.js';
import dotenv from 'dotenv';
dotenv.config();

const xendit = new Xendit({
  secretKey: process.env.SECRET_KEY_XENDIT,
});

const payment = async (req, res) => {
  const { amount, email, userID } = req.body;
  const { Invoice } = xendit;
  const retailOutletSpecificOptions = {};
  const invoice = new Invoice(retailOutletSpecificOptions);

  if (!amount || !email || !userID) {
    throw new BadRequestError('Please Provide your input!');
  }

  const { id } = await invoice.createInvoice({
    externalID: userID,
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

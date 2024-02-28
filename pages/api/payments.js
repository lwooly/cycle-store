// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';
import { addOrderToDB } from '@/lib/api-functions/server/orders/queries';
import { getSession } from '@auth0/nextjs-auth0';
import {
  emptyBasketInDB,
  getUserBasketFromDB,
} from '@/lib/api-functions/server/baskets/queries';

const { SENDGRID_API_KEY, ADMIN_EMAIL, STRIPE_SECRET_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// configure stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  // ensure post calls only
  console.log(req.method)
  console.log(JSON.stringify(req, null, 2), 'request obj')
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Wrong Method. Post only' });
  }

  const { name, email, token, amount } = req.body;

  // validate form inputs
  let rejectionMessage = '';
  if (!name) {
    rejectionMessage = 'Name not provided';
  } else if (!email) {
    rejectionMessage =
      'Maintainer Issue: Email not provided. Please contact us directly';
  } else if (!token) {
    rejectionMessage =
      'Maintainer Issue: Token not provided. Please contact us directly';
  } else if (!amount) {
    rejectionMessage =
      'Maintainer Issue: Amount not provided. Please contact us directly';
  }

  if (rejectionMessage) {
    return res.status(400).json({
      message: rejectionMessage,
    });
  }

  let charge = {};

  // create customer in stripe

  try {
    const customer = await stripe.customers.create({
      email,
      source: token,
    });
    console.log(customer.id, 'customer_id');
    console.log(amount, 'amount');

    // create a charge in string

    charge = await stripe.charges.create({
      amount,
      currency: 'GBP',
      customer: customer.id,
    });
    console.log(charge);
  } catch (err) {
    console.log('Stripe error:', err);
    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
    });
  }

  // Get user from Auth0 session
  try {
    const session = await getSession(req, res);
    req.user = session.user;
  } catch (err) {
    console.log('User not found', err);
  }

  // Get users basket from db
  let basket = { items: [] };
  try {
    basket = await getUserBasketFromDB(req.user.sub);
    console.log(basket);

    // reduce quantity of product in stock by one
    // eslint-disable-next-line no-restricted-syntax
    for (const item of basket.items) {
      item.quantity -= 1;
      // eslint-disable-next-line no-await-in-loop
      await item.save();
    }
  } catch (err) {
    console.log(`Could not decrement item quantities`);
  }

  // Add order to db
  try {
    addOrderToDB({
      owner: req.user.sub,
      items: basket.items,
      receiptURL: charge.receipt_url,
    });
  } catch (err) {
    console.log(`order not saved`, err);
  }

  // empty users basket
  try {
    await emptyBasketInDB(req.user.sub);
  } catch (err) {
    console.log(`could not empty basket`, err);
  }

  // send email

  const msg = {
    to: email,
    cc: ADMIN_EMAIL,
    from: ADMIN_EMAIL,
    subject: `Order confirmation`,
    text: `Thanks ${name} for your order. \n\n You can see your receipt here: ${charge.receipt_url}`,
    html: `<p>Thanks ${name} for your order. \n\n You can see your receipt <a href=${charge.receipt_url} target="_blank">here</a></p>`,
  };

  console.log(msg);

  try {
    await sgMail.send(msg);
    console.log('confirmation email sent');
    return res.status(200).json({
      message: 'Purchase successful',
      // eslint-disable-next-line camelcase
      receiptURL: charge.receipt_url,
    });
  } catch (err) {
    console.log('Confirmation email send error', err);

    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
    });
  }
};

export default handler;

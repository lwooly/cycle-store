import StripeCheckout from 'react-stripe-checkout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import { Button } from '@/components/mui';
import axios from 'axios';
import { useRouter } from 'next/router';

function StripeButton() {
  const { user, isLoading, error } = useUser();
  const { data: basket } = useUserBasket();
  const router = useRouter();

  // calculate basket total
  const basketTotal = basket.items.reduce(
    (total, item) => total + item.price * 100,
    0,
  );

  console.log('Basket Total', basketTotal);

  // token callback

  const onToken = async (token) => {
    console.log(`token`, token);
    const {
      email,
      card: { name },
      id: tk,
    } = token;

    try {
      const result = await axios.post('/api/payments', {
        name,
        email,
        token: tk,
        amount: basketTotal,
      });
      console.log(result);
      router.push({
        pathname: '/thankyou',
        query: {
          receiptURL: result.data.receiptURL,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading || error) return null;
  return (
    <StripeCheckout
      name="Bike Shop Co." // the pop-in header title
      description="Cycling goodness.." // the pop-in header subtitle
      image="https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // the pop-in header image (default none)
      ComponentClass="div"
      amount={basketTotal} // pennies
      currency="GBP"
      stripeKey={process.env.STRIPE_PUBLIC_KEY}
      locale="en"
      email={user.email}
      // Note: Enabling either address option will give the user the ability to
      // fill out both. Addresses are sent as a second parameter in the token callback.
      shippingAddress
      billingAddress={false}
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
      zipCode={false}
      token={onToken} // submit callback
    >
      <Button variant="contained">Pay with Stripe</Button>
    </StripeCheckout>
  );
}

export default StripeButton;

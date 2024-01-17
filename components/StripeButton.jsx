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
      name="Coffee Co." // the pop-in header title
      description="Coffee goodness.." // the pop-in header subtitle
      image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
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

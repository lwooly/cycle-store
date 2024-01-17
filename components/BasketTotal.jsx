import Link from 'next/link';
import { dinero, add, toDecimal } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import React from 'react';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/mui';
import Paragraph from './Paragraph';

function BasketTotal() {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );
  const basketLength = basket.items.length;
  // console.log(basket);

  return (
    // fragment is required to  return a JavaScript conditional expression at the top level of a component's return statement.
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {basketLength ? (
        <>
          <Button component={Link} href="/checkout" variant="contained">
            Checkout
          </Button>
          <Paragraph>Total: {formatPrice(toDecimal(basketTotal))}</Paragraph>
        </>
      ) : null}
    </>
  );
}

export default BasketTotal;

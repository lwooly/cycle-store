// eslint-disable-next-line import/no-extraneous-dependencies
import { dinero, add, toDecimal } from 'dinero.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GBP } from '@dinero.js/currencies';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import React from 'react';
import { formatPrice } from '@/lib/utils/formatters';
import Paragraph from './Paragraph';

function BasketTotal() {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce(
    (total, item) =>
      add(total, dinero({ amount: item.price * 100, currency: GBP })),
    dinero({ amount: 0, currency: GBP }),
  );

  return <Paragraph>Total: {formatPrice(toDecimal(basketTotal))}</Paragraph>;
}

export default BasketTotal;

import { nanoid } from 'nanoid';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { List, ListItem } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
// import Basket from '@/components/Basket';
import Product from '@/components/Product';

function BasketList({ basket, removeHandler = () => {} }) {
  if (!basket.items.length) return <Paragraph>No items in basket</Paragraph>;

  return (
    <List
      component="ol"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {basket.items.map((product) => (
        <ListItem key={nanoid()} component="li">
          <ErrorBoundary>
            <Product
              values={product}
              // linkToBasketPage
              headingLevel="h5"
              removeHandler={removeHandler}
              inBasket
            />
          </ErrorBoundary>
        </ListItem>
      ))}
    </List>
  );
}

export default BasketList;

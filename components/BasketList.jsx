import { nanoid } from 'nanoid';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import { CircularProgress, List, ListItem } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
// import Basket from '@/components/Basket';
import Product from '@/components/Product';

function BasketList({basket, removeHandler = () => {} }) {
  // const { isLoading, isError, error, data: basket } = useUserBasket();
  console.log(basket.items);

  // // console.log(Baskets)
  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (isError) {
  //   return <Paragraph>{error.message}</Paragraph>;
  // }

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

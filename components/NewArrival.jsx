import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { Box, Button, CircularProgress, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Product from '@/components/Product';
import Image from 'next/image';
import Heading from './Heading';
import { formatPrice } from '@/lib/utils/formatters';
import { toDecimal } from 'dinero.js';
import { dinero } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useAddToBasket } from '@/lib/tq/baskets/mutations';

function NewArrival({ removeHandler = () => {}, userProductPermissions = {} }) {
  const { isLoading, isError, error, data: products } = useProducts();

  // console.log(products)

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  if (!products.length) return <Paragraph>No products available</Paragraph>;

  console.log(userProductPermissions);

  const product = products[0];

  const { _id, title, description, price, quantity, image, favorites } =
    product;

  // Add product to basket
  const addToBasketMutate = useAddToBasket();

  const addToBasketHandler = (productId) => {
    addToBasketMutate.mutate(productId);
  };
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Image
        src={product.image}
        alt={product.name}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ zIndex: 0 }}
      />
      <Box sx={{ zIndex: 1, position: 'relative' }}>
        <Typography component="h2" variant="h3" sx={{ zIndex: 1 }}>
          Newly Launched
        </Typography>
        <ErrorBoundary>
          <Heading component="h4" variant="h4">
            {title}
          </Heading>
          <Paragraph>About: {description}</Paragraph>
          <Paragraph>
            Price:{' '}
            {formatPrice(
              toDecimal(dinero({ amount: price * 100, currency: GBP })),
            )}
          </Paragraph>
          <Button variant="contained" onClick={() => addToBasketHandler(_id)}>
            Buy Now
          </Button>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default NewArrival;

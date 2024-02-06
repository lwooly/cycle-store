import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { Box, Button, CircularProgress, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/formatters';
import { toDecimal, dinero } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useAddToBasket } from '@/lib/tq/baskets/mutations';
import { useTheme } from '@emotion/react';
import Heading from './Heading';

function ProductLaunch() {
  const { isLoading, isError, error, data: products } = useProducts();
  const theme = useTheme();

  // console.log(products)

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  if (!products.length) return <Paragraph>No products available</Paragraph>;

  const product = products[0];

  const { _id, title, description, price } = product; // quantity, image, favorites

  // Add product to basket
  const addToBasketMutate = useAddToBasket();

  const addToBasketHandler = (productId) => {
    addToBasketMutate.mutate(productId);
  };
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        width: '100%',
        '&::before': {
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          content: '""',
          position: 'absolute',
          backgroundColor: 'transparent',
          backgroundImage: `linear-gradient(90deg, ${theme.palette.secondary.main} 50%,${theme.palette.primary.main} 50%)`,
          opacity: 0.67,
          zIndex: 1,
        },
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="100vw"
        style={{
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '100vh', // noted
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* title */}
        <Box
          sx={{
            p: 4,
            zIndex: 1,
            position: 'relative',
            gap: '0.5rem',
            color: 'white',
            maxWidth: '60%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ zIndex: 1 }}>
            Newly Launched
          </Typography>
          <ErrorBoundary>
            <Heading component="h1" variant="h1">
              {title}
            </Heading>
            <Typography component="h5" variant="h5" sx={{ zIndex: 1 }}>
              Specification
            </Typography>
            <Paragraph> {description}</Paragraph>
            <Paragraph>
              Price:{' '}
              {formatPrice(
                toDecimal(dinero({ amount: price * 100, currency: GBP })),
              )}
            </Paragraph>
            <Button
              variant="contained"
              sx={{ marginRight: 'auto', color: 'white' }}
              onClick={() => addToBasketHandler(_id)}
            >
              Buy Now
            </Button>
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductLaunch;

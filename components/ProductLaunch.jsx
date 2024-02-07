import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useProducts } from '@/lib/tq/products/queries';
import { Box, Button, CircularProgress, Typography } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/formatters';
import { toDecimal, dinero } from 'dinero.js';
import { GBP } from '@dinero.js/currencies';
import { useAddToBasket } from '@/lib/tq/baskets/mutations';
import { useTheme } from '@emotion/react';
import {
  addToBasketHandler,
  getNumberInBasket,
} from '@/lib/api-functions/client/basket';
import { useUserOrTempBasket } from '@/lib/tq/baskets/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import Heading from './Heading';
import { UIContext } from './contexts/UI.context';

function ProductLaunch() {
  const { isLoading, isError, error, data: products } = useProducts();
  const theme = useTheme();
  const user = useUser();
  const { data: basket } = useUserOrTempBasket({ user });
  console.log(basket);
  const queryClient = useQueryClient();
  const { showMessage } = useContext(UIContext);

  // console.log(products)

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  if (!products.length) return <Paragraph>No products available</Paragraph>;

  const product = products[0];

  const { _id, title, description, price, quantity: quantityInStock } = product; // quantity, image, favorites

  const productBasketQuantity = getNumberInBasket({ basket, _id });

  // Add product to basket
  const addToBasketMutate = useAddToBasket();

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
            maxWidth: { sm: '60%' },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
              sx={{
                marginRight: 'auto',
                color: 'white',
                '&.Mui-disabled': {
                  background: '#eaeaea',
                  color: '#c0c0c0',
                },
              }}
              onClick={() => {
                addToBasketHandler({
                  productId: _id,
                  user: user.user,
                  addToBasketMutateFn: addToBasketMutate,
                  queryClient,
                });
                showMessage({
                  type: 'success',
                  string: 'Product added to cart!',
                });
              }}
              disabled={quantityInStock <= productBasketQuantity}
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

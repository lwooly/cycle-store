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
import { useTheme } from '@emotion/react';
import QueryBoundary from './QueryBoundary';
import ProductList from './ProductList';

function NewArrivals() {
  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* title */}
        <Box>
          <Typography component="h2" variant="h2" textAlign="center">
            New Arrivals
          </Typography>
          <QueryBoundary>
            <ProductList />
          </QueryBoundary>
        </Box>
      </Box>
    </Box>
  );
}

export default NewArrivals;

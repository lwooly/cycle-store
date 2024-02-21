import { Box, Typography } from '@mui/material';
import QueryBoundaries from './QueryBoundary';
import ProductList from './ProductList';

function NewArrivals() {
  return (
    <Box
      component="section"
      sx={{
        px: 4,
        py: 8,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography component="h2" variant="h2" marginBottom="2rem">
          New Arrivals
        </Typography>
        <QueryBoundaries>
          <ProductList maxNumber={4} />
        </QueryBoundaries>
      </Box>
    </Box>
  );
}

export default NewArrivals;

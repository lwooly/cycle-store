import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { CircularProgress, List, ListItem } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Product from '@/components/Product';
import { useMemo } from 'react';

function ProductList({
  removeHandler = () => {},
  userProductPermissions = {},
  sortBy,
  maxNumber,
}) {
  const { data: productList } = useProducts();

  // sort products
  const sortedAndLimitedProducts = useMemo(() => {
    const sortedProducts = [...productList]; // Create a shallow copy to avoid mutating the original array

    // Sorting
    if (sortBy === 'pricelowhigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'pricehighlow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'stock') {
      sortedProducts.sort((a, b) => a.stock - b.stock);
    }

    // Limiting
    return maxNumber ? sortedProducts.slice(0, maxNumber) : sortedProducts;
  }, [productList, sortBy, maxNumber]);

  console.log(sortedAndLimitedProducts);

  return (
    <List
      component="ol"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr 1fr',
        },
        gap: '0.5rem',
      }}
    >
      {sortedAndLimitedProducts.map((product) => (
        // eslint-disable-next-line no-underscore-dangle
        <ListItem key={product._id} component="li" sx={{ padding: '0' }}>
          <ErrorBoundary>
            <Product
              values={product}
              linkToProductPage
              headingLevel="h5"
              removeHandler={removeHandler}
              userProductPermissions={userProductPermissions}
              summary
            />
          </ErrorBoundary>
        </ListItem>
      ))}
    </List>
  );
}

export default ProductList;

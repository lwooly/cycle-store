import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { List, ListItem, Typography } from '@/components/mui';
import Product from '@/components/Product';
import { useMemo } from 'react';

function ProductList({
  removeHandler = () => {},
  userProductPermissions = {},
  sortBy,
  filterBy,
  maxNumber,
}) {
  const { data: productList } = useProducts();

  // sort products
  const filterSortAndLimitProducts = useMemo(() => {
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

    // Filtering by category
    const filteredAndSortedProducts =
      !filterBy || filterBy === 'all'
        ? sortedProducts
        : sortedProducts.filter((product) => filterBy === product.category);

    // Limiting
    return maxNumber
      ? filteredAndSortedProducts.slice(0, maxNumber)
      : filteredAndSortedProducts;
  }, [productList, sortBy, filterBy, maxNumber]);

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
      {!filterSortAndLimitProducts.length && (
        <Typography variant="h6" component="p">
          No products to display
        </Typography>
      )}
      {filterSortAndLimitProducts.map((product) => (
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

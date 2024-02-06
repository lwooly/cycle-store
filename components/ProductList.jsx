import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { CircularProgress, List, ListItem } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';

function ProductList({
  removeHandler = () => {},
  userProductPermissions = {},
}) {
  const [products, setProducts] = useState([]);

  const { isLoading, isError, error, data: productList } = useProducts();

  useEffect(() => {
    if (productList) {
      setProducts(productList);
    }
  }, [productList]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  if (!products.length) return <Paragraph>No products available</Paragraph>;

  console.log(userProductPermissions);

  return (
    <List
      component="ol"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '0.5rem',
      }}
    >
      {products.map((product) => (
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

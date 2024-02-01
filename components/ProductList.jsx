import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useProducts } from '@/lib/tq/products/queries';
import { CircularProgress, List, ListItem } from '@/components/mui';
import Paragraph from '@/components/Paragraph';
import Product from '@/components/Product';

function ProductList({
  removeHandler = () => {},
  userProductPermissions = {},
}) {
  //   const products = [
  //     {
  //       _id: "1",
  //       title: "Premium Espresso Machine",
  //       description:
  //         "High-quality espresso machine with advanced frothing system",
  //       price: 800,
  //       quantity: 4,
  //       image:
  //         "https://images.unsplash.com/photo-1587202372775-b24f450a2d36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVzcHJlc3NvJTIwbWFjaGluZXxlbnwwfHwwfHw%3D",
  //     },
  //     {
  //       _id: "2",
  //       title: "Ceramic Coffee Mug",
  //       description: "Elegant ceramic mug for your daily coffee",
  //       price: 15,
  //       quantity: 20,
  //       image:
  //         "https://images.unsplash.com/photo-1585149193844-a07dd29df026?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZSUyMG11Z3xlbnwwfHwwfHw%3D",
  //     },
  //     {
  //       _id: "3",
  //       title: "Organic Coffee Beans",
  //       description: "Freshly roasted organic coffee beans with a rich aroma",
  //       price: 30,
  //       quantity: 50,
  //       image:
  //         "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8",
  //     },
  //     {
  //       _id: "4",
  //       title: "Coffee Grinder",
  //       description: "Stainless steel coffee grinder for the perfect grind size",
  //       price: 60,
  //       quantity: 15,
  //       image:
  //         "https://images.unsplash.com/photo-1580915411954-4b1e1e1d4c02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwZ3JpbmRlcnxlbnwwfHwwfHw%3D",
  //     },
  //     {
  //       _id: "5",
  //       title: "French Press Coffee Maker",
  //       description: "Easy-to-use French press for a delicious brew",
  //       price: 25,
  //       quantity: 30,
  //       image:
  //         "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlbmNoJTIwcHJlc3N8ZW58MHx8MHx8",
  //     },
  //   ];

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

  return (
    <List
      component="ol"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '0.3rem',
      }}
    >
      {products.map((product) => (
        // eslint-disable-next-line no-underscore-dangle
        <ListItem key={product._id} component="li">
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

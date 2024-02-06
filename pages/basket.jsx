import Head from 'next/head';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from '@/components/QueryBoundary';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import BasketList from '@/components/BasketList';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getUserBasketFromDB } from '@/lib/api-functions/server/baskets/queries';
import { USER_OWN_BASKET_STORAGE_KEY } from '@/lib/tq/baskets/settings';
import BasketTotal from '@/components/BasketTotal';
import { useUserBasket } from '@/lib/tq/baskets/queries';
import { Box, CircularProgress, Stack } from '@mui/material';
import Paragraph from '@/components/Paragraph';
import { useEffect, useState } from 'react';
import { useProducts } from '@/lib/tq/products/queries';
import { useUser } from '@auth0/nextjs-auth0/client';
import { set } from 'mongoose';
import CheckoutSummaryTable from '@/components/CheckoutSummary';
import CartSummaryTable from '@/components/CartSummary';

export default function BasketPage(ssd) {
  // set basket state
  const [basket, setBasket] = useState(null);
  // flag for rerender
  const [localBasket, setLocalBasket] = useState(true);

  //set error and loading states
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(null);

  // set user state
  const [user, setUser] = useState(ssd.user);

  // check if user is logged in
  const userClient = useUser();

  // if user is logged in set user state to userClient
  useEffect(() => {
    if (userClient.user) {
      setUser(userClient.user);
    }
  }, [userClient]);

  // if user is logged in get user basket from the database

  const runQuery = !!user;
  const {
    data: userBasket,
    isLoading: basketLoading,
    isError: isBasketError,
    error: basketError,
  } = useUserBasket({ runQuery });
  const {
    data: products,
    isLoading: productLoading,
    isError: isproductError,
    error: productError,
  } = useProducts();

  // set loading and error states
  useEffect(() => {
    if (user) {
      setLoading(basketLoading);
      setError(basketError);
      setIsError(isBasketError);
    } else {
      setLoading(productLoading);
      setError(productError);
      setIsError(isproductError);
    }
  }, [
    user,
    basketLoading,
    isBasketError,
    basketError,
    productLoading,
    isproductError,
    productError,
  ]);

  useEffect(() => {
    if (!user) {
      // Get user basket from local storage
      const tempProductIds =
        JSON.parse(localStorage.getItem('temporaryBasket')) || [];
      let tempProducts = [];

      // find products from product ids - TODO performance increase by creating a new tq hook rather than querying all
      if (products) {
        tempProducts = tempProductIds.map((id) =>
          // eslint-disable-next-line no-underscore-dangle
          products.find((product) => product._id === id),
        );
      }

      setBasket({ items: tempProducts });

      // need to handle loading and error states
    } else {
      // set basket to user basket
      setBasket(userBasket);
    }
  }, [user, products, userBasket, localBasket]);

  // manage local storage to state updates

  useEffect(() => {
    const handleStorage = (event) => {
      const basket = JSON.parse(localStorage.getItem('temporaryBasket')) || {
        items: [],
      };
      setLocalBasket(basket);
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box
          sx={{
            backgroundColor: 'lightgrey',
            minHeight: '100vh',
            width: '100%',
            padding: '8rem 4rem',
          }}
        >
          <Stack
            gap={2}
            sx={{ backgroundColor: 'white', padding: '3.31rem 2.5rem' }}
          >
            <Heading component="h1" variant={'h4'}>
              Cart
            </Heading>
            {loading && <CircularProgress />}
            {isError && <Paragraph>{error.message}</Paragraph>}
            {!loading && !isError && basket && (
              <Box>
                <CartSummaryTable basket={basket} />
                {/* <BasketTotal basket={basket} /> */}
              </Box>
            )}
          </Stack>
        </Box>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  // get user data from auth0
  const session = await getSession(context.req, context.res);

  // console.log(session?.user, 'user');

  let userBasket = null;
  if (session?.user) {
    userBasket = await getUserBasketFromDB(session.user.sub, true);
  }

  const queryClient = new QueryClient();

  if (userBasket) {
    await queryClient.setQueryData(
      [USER_OWN_BASKET_STORAGE_KEY],
      JSON.parse(JSON.stringify(userBasket)),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      user: session?.user || null,
    },
  };
};

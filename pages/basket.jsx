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

export default function BasketPage({ssd}) {

  const {user} = ssd;

  console.log(user, 'user')


  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Basket</Heading>
        <QueryBoundaries>
          <BasketTotal />
        </QueryBoundaries>
        <QueryBoundaries>
          {/* <BasketList /> */}
        </QueryBoundaries>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  // get user data from auth0
  const session = await getSession(context.req, context.res);

  console.log(session?.user, 'user');

  let userBasket = null;
  if (session?.user) {
    userBasket = await getUserBasketFromDB(session.user.sub, true);
  }

  const queryClient = new QueryClient();

  if (userBasket) {
    await queryClient.setQueryData([USER_OWN_BASKET_STORAGE_KEY], userBasket);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      user: session?.user || null,
    },
  };
};

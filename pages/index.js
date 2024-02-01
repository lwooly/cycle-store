import Head from 'next/head';
import { useContext } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Box, Button } from '@/components/mui';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from '@/components/QueryBoundary';
import ProductList from '@/components/ProductList';
import { getProductsFromDB } from '@/lib/api-functions/server/products/queries';
import { STORAGE_KEY } from '@/lib/tq/products/settings';
import { UIContext } from '@/components/contexts/UI.context';
import { Query } from 'mongoose';
import ProductLaunch from '@/components/ProductLaunch';
import { NewReleases } from '@mui/icons-material';
import NewArrivals from '@/components/NewArrivals';
import HomePageContent from '@/components/HomePageContent';

export default function Home() {
  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <QueryBoundaries>
          <ProductLaunch />
        </QueryBoundaries>
        <NewArrivals />
        <Box
          component="section"
          sx={{ position: 'relative', height: '100vh', width: '100%',  margin: '0', padding:0}}
        >
          <HomePageContent
            title="Mountain Bikes"
            description="Discover the thrill of off-road biking with our premium selection of mountain bikes. From rugged trails to mountainous terrains, our MTBs are designed for adventure seekers of all levels. Explore our range!"
            imageSrc="https://images.unsplash.com/photo-1589100984317-79246528923c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            exploreLink="/products"
          />
        </Box>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const products = await getProductsFromDB().catch((err) => console.log(err));
  const queryClient = new QueryClient();

  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products)),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

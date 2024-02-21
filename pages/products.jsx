import Head from 'next/head';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Box } from '@/components/mui';
import Layout from '@/components/Layout';
import QueryBoundaries from '@/components/QueryBoundary';
import { getProductsFromDB } from '@/lib/api-functions/server/products/queries';
import { STORAGE_KEY } from '@/lib/tq/products/settings';
import ProductLaunch from '@/components/ProductLaunch';
import NewArrivals from '@/components/NewArrivals';
import ExploreArticle from '@/components/ExploreArticle';
import WhyChooseSection from '@/components/WhyChooseSection';
import NewBikeSection from '@/components/NewBikeSection';
import ProductList from '@/components/ProductList';
import PageImageHeader from '@/components/PageImageHeader';
import { Select } from '@mui/material';
import BasicSelect from '@/components/Select';
import { useState } from 'react';

export default function ProductsPage() {
  const [productFilter, setProductFilter] = useState('');

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageImageHeader
          title="Explore our stock!"
          imageSrc="https://images.unsplash.com/photo-1601067095185-b8b73ad7db10?q=80&w=3026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <BasicSelect setFn={setProductFilter} />
        <QueryBoundaries>
          <ProductList sortBy={productFilter} />
        </QueryBoundaries>
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
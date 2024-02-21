import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React from 'react';
import Head from 'next/head';
import Product from '@/components/Product';
import {
  getProductFromDB,
  getProductsFromDB,
} from '@/lib/api-functions/server/products/queries';
import Layout from '@/components/Layout';
import { Box } from '@mui/material';

const hyphenate = (str) => str.replaceAll(' ', '-');
const slugify = (str, id) => `${hyphenate(str).toLowerCase()}-${id}`;

function SingleProduct({ ssd }) {
  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* <Heading component={"h2"}></Heading> */}
        <Box component="section">
          <ErrorBoundary>
            <Product values={ssd} headingLevel="h1" inBasket />
          </ErrorBoundary>
        </Box>
      </Layout>
    </>
  );
}

export default SingleProduct;

export const getStaticPaths = async () => {
  const products = await getProductsFromDB().catch((err) =>
    console.log(`this error`, err),
  );
  // get paths from products
  const paths = products.map((product) => ({
    params: {
      slug: slugify(product.title, product.id),
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  console.log('slug', slug);
  const id = slug.split('-').at(-1);
  const product = await getProductFromDB(id).catch((err) => {
    console.log(err);
  });
  return {
    props: {
      ssd: JSON.parse(JSON.stringify(product)),
    },
  };
};

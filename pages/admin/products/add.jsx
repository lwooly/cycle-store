import Head from 'next/head';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import { HOST, addProductMutateFn } from '@/lib/tq/products/api';

import ProductForm from '@/components/forms/ProductForm';
import { useAddProduct } from '@/lib/tq/products/mutations';

export default function AddProduct() {
  const addMutate = useAddProduct();
  const router = useRouter();

  const addHandler = (data) => {
    console.log('called')
    addMutate.mutate(data);
    router.push('/admin/products/');
  };

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h1">Add Product</Heading>
        <ProductForm submitHandler={addHandler} />
      </Layout>
    </>
  );
}

// render page at build time on server
export const getStaticProps = async () => ({
  props: {},
});

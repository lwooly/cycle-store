import Head from "next/head";
import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import { HOST, addOrderMutateFn } from "@/lib/tq/orders/api";

// import OrderForm from '@/components/forms/OrderForm'
import { useAddOrder } from "@/lib/tq/orders/mutations";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function AddOrder() {
  const addMutate = useAddOrder()
  const router = useRouter()

  const addHandler = (data) => {
    addMutate.mutate(data)
    router.push('/admin/orders/')
  }

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component={"h1"}>Add Order</Heading>
        {/* <OrderForm submitHandler={addHandler} /> */}
      </Layout>
    </>
  );
}

// render page at build time on server
export const getStaticProps = async () => {
  return {
    props: {},
  };
};

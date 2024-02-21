import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import PageImageHeader from '@/components/PageImageHeader';
import { Box } from '@mui/material';

export default function ThankYouPage() {
  const router = useRouter();
  const {
    query: { receiptURL },
  } = router;
  return (
    <>
      <Head>
        <title>Order Confirmation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageImageHeader
          title="Success!"
          imageSrc="https://images.unsplash.com/photo-1592614558340-8095660384f6?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box sx={{ width: { sm: '100%', md: '75%' }, margin: 'auto' }}>
          <Heading component="h2">Thank you for your order!</Heading>
          <Paragraph>
            You can view a copy of your receipt <a href={receiptURL}>here</a>
          </Paragraph>
        </Box>
      </Layout>
    </>
  );
}

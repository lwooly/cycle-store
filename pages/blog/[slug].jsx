import Head from 'next/head';
import Image from 'next/image';
import Markdown from 'marked-react';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import { AllPosts, SinglePost } from '@/lib/hygraph/queries';
import { Card, CardContent, CardMedia } from '@/components/mui';

const { HYGRAPH_ENDPOINT, HYGRAPH_TOKEN } = process.env;



export default function BlogPost({ ssd = {} }) {
  const {
    title,
    body,
    heroImage: { url },
  } = ssd;

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading />
        <Card component="article" sx={{ width: '100%' }}>
          <CardMedia sx={{ display: 'grid', placeContent: 'center' }}>
            <Image alt={title} src={url} width={400} height={300} />
          </CardMedia>
          <CardContent>
            <Heading component="h2">{title}</Heading>
            <Markdown>{body}</Markdown>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
}

export const getStaticPaths = async () => {
  // make call to hygraph to get blog posts
  const allPosts = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset="UTF8"',
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: AllPosts,
    }),
  })
    .then((res) => res.json())
    .then(
      (res) =>
        // console.log(res.data.blogPosts)
        res.data.blogPosts,
    )
    .catch((err) => console.log(`API ERROR:`, err));

  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log(`PATHS`, paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  // make call to hygraph to get blog posts

  const post = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset="UTF8"',
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: params.slug },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data.blogPost)
    .catch((err) => console.log(`API ERROR:`, err));

  return {
    props: {
      ssd: post,
    },
  };
};

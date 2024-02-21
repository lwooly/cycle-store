import Head from 'next/head';
import Layout from '@/components/Layout';

import { AllPosts } from '@/lib/hygraph/queries';
import { Box, List, ListItem } from '@/components/mui';
import PageImageHeader from '@/components/PageImageHeader';
import BlogPost from '@/components/BlogPost';

const { HYGRAPH_ENDPOINT, HYGRAPH_TOKEN } = process.env;

export default function Blog({ ssd = [] }) {
  return (
    <>
      <Head>
        <title>{ssd.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box component="section">
          <PageImageHeader
            title="Blog"
            imageSrc="https://images.unsplash.com/photo-1633707167344-503c1c751027?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <List
            component="ol"
            sx={{
              listStyle: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              width: '75vw',
              margin: 'auto',
            }}
          >
            {ssd.map((blogPost) => (
              <ListItem
                key={blogPost.id}
                sx={{
                  width: '50%',
                  minHeight: '100%',
                  flexShrink: 0,
                  flexGrow: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <BlogPost blogPost={blogPost} isSummary />
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
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
    .catch((err) => console.log(`API ERROR:`, err));

  const posts = allPosts.data.blogPosts;

  return {
    props: {
      ssd: posts,
    },
  };
};

export const AllPosts = `
query AllPosts {
    blogPosts(orderBy: publishedAt_DESC) {
      body
      createdAt
      id
      title
      updatedAt
      slug
      heroImage {
        url
        width
        height
      }
    }
  }
`;

export const SinglePost = `
query SinglePost($slug: String = "") {
    blogPost(where: {slug: $slug}) {
      body
      title
      slug
      heroImage {
        height
        url
        width
        createdAt
      }
    }
  }
`;

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
`

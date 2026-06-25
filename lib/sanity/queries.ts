import { defineQuery } from 'next-sanity'

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "date": publishedAt,
    category,
    readTime,
    author,
    "image": heroImage,
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "date": publishedAt,
    category,
    readTime,
    author,
    "image": heroImage,
    "content": body,
  }
`)

export const ALL_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`)

import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
  readTime: string
  author: string
  image: string
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(
    ALL_POSTS_QUERY,
    {},
    { next: { tags: ['post'] } }
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-[#F8F6F3] to-[#F5F1E8]">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Kerry&apos;s Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Faith, life, real estate, and everything in between. Real thoughts from a real person figuring it all out.
          </p>
        </div>
      </div>

      {/* Post grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No posts yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
              >
                {/* Image */}
                <div
                  className="h-48 bg-cover bg-center bg-gray-200"
                  style={post.image ? { backgroundImage: `url('${post.image}')` } : {}}
                />

                {/* Content */}
                <div className="p-6">
                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-3 capitalize">
                      {post.category}
                    </span>
                  )}
                  <h2 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {post.readTime && <span>{post.readTime} read</span>}
                    {post.date && (
                      <>
                        <span>•</span>
                        <time>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

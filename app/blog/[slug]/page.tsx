import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from '@/components/blog/blog-detail'

import { client } from '@/sanity/lib/client'
import { POSTS_QUERY, POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!article) return { title: 'Artículo no encontrado | Aerolíneas Santander' }

  const pageUrl = `${BASE_URL}/blog/${slug}`
  const title = article.title?.es || article.title || 'Blog'
  const description = article.excerpt?.es || article.excerpt || ''

  return {
    title: `${title} | Blog Aerolíneas Santander`,
    description,
    keywords: [
      article.category,
      'aviación privada',
      'jets ejecutivos',
      'vuelos privados',
      title,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      publishedTime: article.date,
      section: article.category,
      authors: ['Aerolíneas Santander'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!article) {
    notFound()
  }

  const pageUrl = `${BASE_URL}/blog/${slug}`
  const title = article.title?.es || article.title || ''
  const description = article.excerpt?.es || article.excerpt || ''

  return (
    <>
      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description,
            datePublished: article.date,
            author: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            url: pageUrl,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageUrl,
            },
            articleSection: article.category,
            keywords: ['aviación privada', 'jets ejecutivos', article.category],
          }),
        }}
      />
      <BlogDetail article={article} />
    </>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_QUERY)
  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}

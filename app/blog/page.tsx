import { Metadata } from 'next'
import { translations } from '@/lib/translations'

import { BlogContent } from '@/components/blog/blog-content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return {
    title: dict['blog.meta.title'],
    description: dict['blog.meta.desc'],
    alternates: {
      canonical: `${BASE_URL}/blog`,
      languages: {
        'es': `${BASE_URL}/blog`,
        'en': `${BASE_URL}/blog?lang=en`,
        'fr': `${BASE_URL}/blog?lang=fr`,
      }
    },
    openGraph: {
      title: dict['blog.meta.title'],
      description: dict['blog.meta.desc'],
      url: `${BASE_URL}/blog`,
      type: 'website',
    },
  }
}

import { client } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'


export default async function BlogPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const posts = await client.fetch(POSTS_QUERY)
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return (
    <>
      {/* JSON-LD: Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            url: `${BASE_URL}/blog`,
            name: dict['blog.meta.title'],
            description: dict['blog.meta.desc'],
            publisher: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
          }),
        }}
      />
      <BlogContent initialPosts={posts} />
    </>
  )
}

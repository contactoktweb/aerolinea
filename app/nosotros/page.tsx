import { Metadata } from 'next'
import { translations } from '@/lib/translations'
import { AboutContent } from '@/components/about/about-content'
import { client } from '@/sanity/lib/client'
import { ABOUT_QUERY } from '@/sanity/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return {
    title: dict['about.meta.title'],
    description: dict['about.meta.desc'],
    alternates: {
      canonical: `${BASE_URL}/nosotros`,
      languages: {
        'es': `${BASE_URL}/nosotros`,
        'en': `${BASE_URL}/nosotros?lang=en`,
        'fr': `${BASE_URL}/nosotros?lang=fr`,
      }
    },
    openGraph: {
      title: dict['about.meta.title'],
      description: dict['about.meta.desc'],
      url: `${BASE_URL}/nosotros`,
      type: 'website',
    },
  }
}

export default async function NosotrosPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const aboutData = await client.fetch(ABOUT_QUERY)
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return (
    <>
      {/* JSON-LD: About page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: `${BASE_URL}/nosotros`,
            name: dict['about.meta.title'],
            description: dict['about.meta.desc'],
            mainEntity: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
              foundingDate: '2006',
              description: dict['about.meta.desc'],
            },
          }),
        }}
      />
      <AboutContent data={aboutData} />
    </>
  )
}

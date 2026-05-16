import { Metadata } from 'next'
import { translations } from '@/lib/translations'

import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { ClientsCarousel } from '@/components/home/clients-carousel'
import { ReviewsSection } from '@/components/home/reviews-section'
import { client } from '@/sanity/lib/client'
import { HOME_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es
  const settings = await client.fetch(SETTINGS_QUERY)
  const ogImage = settings?.favicon ? urlFor(settings.favicon).width(1200).height(630).url() : null

  return {
    title: dict['home.meta.title'],
    description: dict['home.meta.desc'],
    alternates: {
      canonical: BASE_URL,
      languages: {
        'es': BASE_URL,
        'en': `${BASE_URL}?lang=en`,
        'fr': `${BASE_URL}?lang=fr`,
      }
    },
    openGraph: {
      type: 'website',
      url: BASE_URL,
      title: dict['home.meta.title'],
      description: dict['home.meta.desc'],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: 'Aerolíneas Santander' }] : [],
    },
  }
}



export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const homeData = await client.fetch(HOME_QUERY)
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return (
    <>
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: BASE_URL,
            name: 'Aerolíneas Santander',
            description: dict['home.meta.desc'],
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/reserva`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <Hero data={homeData} />
      <ClientsCarousel data={homeData?.clientLogos} />
      <ServicesGrid data={homeData?.services} />
      <ReviewsSection data={homeData?.testimonials} />
    </>
  )
}

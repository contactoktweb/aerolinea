import { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { ClientsCarousel } from '@/components/home/clients-carousel'
import { ReviewsSection } from '@/components/home/reviews-section'
import { client } from '@/sanity/lib/client'
import { HOME_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SETTINGS_QUERY)
  const ogImage = settings?.favicon ? urlFor(settings.favicon).width(1200).height(630).url() : null

  return {
    title: 'Aerolíneas Santander | Jets Privados y Aviación Ejecutiva de Lujo',
    description:
      'Aerolíneas Santander: vuelos privados, jets de lujo y aviación ejecutiva en Latinoamérica. Ambulancias aéreas, vuelos corporativos y transporte VIP con la más alta seguridad y confort. Reserve ahora.',
    keywords: [
      'vuelos privados Latinoamerica',
      'jets privados de lujo',
      'aviación ejecutiva Peru',
      'charter aéreo',
      'ambulancia aérea',
      'transporte VIP aéreo',
      'Aerolíneas Santander',
      'vuelo privado corporativo',
    ],
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      type: 'website',
      url: BASE_URL,
      title: 'Aerolíneas Santander | Jets Privados y Aviación Ejecutiva',
      description:
        'Vuelos privados de lujo, ambulancias aéreas y aviación ejecutiva en Latinoamérica. Flota de jets de última generación con servicio VIP inigualable.',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: 'Aerolíneas Santander - Jets Privados' }] : [],
    },
  }
}

export default async function HomePage() {
  const homeData = await client.fetch(HOME_QUERY)

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
            description: 'Vuelos privados y aviación ejecutiva de lujo en Latinoamérica',
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
      <Hero data={homeData?.hero} />
      <ClientsCarousel data={homeData?.clientLogos} />
      <ServicesGrid data={homeData?.services} />
      <ReviewsSection data={homeData?.testimonials} />
    </>
  )
}

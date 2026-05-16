import { Metadata } from 'next'
import { translations } from '@/lib/translations'

import { ReservationForm } from '@/components/reservation/reservation-form'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return {
    title: dict['reserva.meta.title'],
    description: dict['reserva.meta.desc'],
    alternates: {
      canonical: `${BASE_URL}/reserva`,
      languages: {
        'es': `${BASE_URL}/reserva`,
        'en': `${BASE_URL}/reserva?lang=en`,
        'fr': `${BASE_URL}/reserva?lang=fr`,
      }
    },
    openGraph: {
      title: dict['reserva.meta.title'],
      description: dict['reserva.meta.desc'],
      url: `${BASE_URL}/reserva`,
      type: 'website',
    },
  }
}


export default async function ReservaPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: dict['reserva.meta.title'],
            provider: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            description: dict['reserva.meta.desc'],
            areaServed: {
              '@type': 'GeoCircle',
              name: 'Mundial',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Servicios de Aviación Ejecutiva',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vuelo Ejecutivo Privado' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ambulancia Aérea' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vuelo Corporativo' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vuelo Humanitario' } },
              ],
            },
          }),
        }}
      />
      <ReservationForm />
    </>
  )
}

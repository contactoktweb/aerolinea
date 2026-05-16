import { Metadata } from 'next'
import { translations } from '@/lib/translations'

import { FleetGallery } from '@/components/fleet/fleet-gallery'
import { client } from '@/sanity/lib/client'
import { FLEET_QUERY } from '@/sanity/lib/queries'


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return {
    title: dict['fleet.meta.title'],
    description: dict['fleet.meta.desc'],
    alternates: {
      canonical: `${BASE_URL}/flota`,
      languages: {
        'es': `${BASE_URL}/flota`,
        'en': `${BASE_URL}/flota?lang=en`,
        'fr': `${BASE_URL}/flota?lang=fr`,
      }
    },
    openGraph: {
      title: dict['fleet.meta.title'],
      description: dict['fleet.meta.desc'],
      url: `${BASE_URL}/flota`,
      type: 'website',
    },
  }
}

export default async function FlotaPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const fleetData = await client.fetch(FLEET_QUERY)
  const { lang: langParam } = await searchParams
  const lang = (langParam || 'es') as 'es' | 'en' | 'fr'
  const dict = translations[lang] || translations.es

  return (
    <>
      {/* JSON-LD: ItemList of aircraft */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: dict['fleet.meta.title'],
            description: dict['fleet.meta.desc'],
            url: `${BASE_URL}/flota`,
            numberOfItems: fleetData?.length || 7,
          }),
        }}
      />
      <FleetGallery initialData={fleetData} />
    </>
  )
}

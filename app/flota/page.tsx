import { Metadata } from 'next'
import { FleetGallery } from '@/components/fleet/fleet-gallery'
import { client } from '@/sanity/lib/client'
import { FLEET_QUERY } from '@/sanity/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export const metadata: Metadata = {
  title: 'Nuestra Flota de Jets Privados | Aerolíneas Santander',
  description:
    'Conozca nuestra flota de jets privados de lujo: ligeros, medianos, super medianos y ultra largo alcance. Cessna Citation X, Gulfstream G650, Bombardier Challenger 350 y más. Reserve su aeronave ideal.',
  keywords: [
    'flota de jets privados',
    'Cessna Citation X',
    'Gulfstream G650',
    'Bombardier Challenger 350',
    'Embraer Phenom 300E',
    'Dassault Falcon 8X',
    'jets de lujo Latinoamerica',
    'aeronaves ejecutivas charter',
    'jet ligero privado',
    'ultra largo alcance aviación',
  ],
  alternates: {
    canonical: `${BASE_URL}/flota`,
  },
  openGraph: {
    title: 'Nuestra Flota de Jets Privados | Aerolíneas Santander',
    description:
      'Explore nuestra exclusiva flota de aeronaves privadas. Desde jets ligeros hasta ultra largo alcance, la aeronave perfecta para cada destino.',
    url: `${BASE_URL}/flota`,
    type: 'website',
  },
}

export default async function FlotaPage() {
  const fleetData = await client.fetch(FLEET_QUERY)

  return (
    <>
      {/* JSON-LD: ItemList of aircraft */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Flota de Jets Privados - Aerolíneas Santander',
            description: 'Flota completa de aeronaves ejecutivas privadas disponibles para charter',
            url: `${BASE_URL}/flota`,
            numberOfItems: fleetData?.length || 7,
          }),
        }}
      />
      <FleetGallery initialData={fleetData} />
    </>
  )
}

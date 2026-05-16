import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { aircraftData, getAircraftBySlug, Aircraft } from '@/lib/aircraft-data'
import { AircraftDetail } from '@/components/fleet/aircraft-detail'
import { client } from '@/sanity/lib/client'
import { AIRCRAFT_BY_SLUG_QUERY, FLEET_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const fleetData = await client.fetch(FLEET_QUERY)
    if (fleetData?.length > 0) {
      return fleetData.map((a: any) => ({ slug: a.slug }))
    }
  } catch {}
  return aircraftData.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sanityAircraft = await client.fetch(AIRCRAFT_BY_SLUG_QUERY, { slug })
  const aircraft = sanityAircraft || getAircraftBySlug(slug)

  if (!aircraft) {
    return { title: 'Aeronave no encontrada' }
  }

  const imageUrl = sanityAircraft?.image
    ? urlFor(sanityAircraft.image).width(1200).height(630).url()
    : null

  const title = `${aircraft.name} - ${aircraft.model || ''} | Aerolíneas Santander`
  const description = `${aircraft.tagline || ''}. ${aircraft.description?.substring(0, 150) || ''}... Hasta ${aircraft.specs?.passengers} pasajeros. Alcance: ${aircraft.specs?.range}. Reserve su vuelo privado en ${aircraft.name} hoy.`

  return {
    title,
    description,
    keywords: [
      aircraft.name,
      aircraft.model || '',
      'jet privado charter',
      'vuelo privado ejecutivo',
      `alquilar ${aircraft.name}`,
      `reservar ${aircraft.name}`,
      'aviación ejecutiva lujo',
    ].filter(Boolean),
    alternates: {
      canonical: `${BASE_URL}/flota/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/flota/${slug}`,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${aircraft.name} - Jet Privado | Aerolíneas Santander`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function AircraftPage({ params }: PageProps) {
  const { slug } = await params
  const sanityAircraft = await client.fetch(AIRCRAFT_BY_SLUG_QUERY, { slug })

  let aircraft: Aircraft | undefined

  if (sanityAircraft) {
    aircraft = {
      id: sanityAircraft._id,
      slug: sanityAircraft.slug,
      name: sanityAircraft.name,
      model: sanityAircraft.model,
      category: sanityAircraft.category,
      tagline: sanityAircraft.tagline,
      description: sanityAircraft.description,
      specs: sanityAircraft.specs,
      features: sanityAircraft.features,
      image: sanityAircraft.image
        ? urlFor(sanityAircraft.image).width(1920).height(1080).url()
        : '/images/aircraft/placeholder.jpg',
      interiorImage: sanityAircraft.interiorImage
        ? urlFor(sanityAircraft.interiorImage).width(1200).height(900).url()
        : '/images/aircraft/placeholder-interior.jpg',
      gallery: sanityAircraft.gallery,
    }
  } else {
    aircraft = getAircraftBySlug(slug)
  }

  if (!aircraft) {
    notFound()
  }

  return (
    <>
      {/* JSON-LD: Product (Aircraft) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: aircraft.name,
            description: aircraft.description,
            brand: {
              '@type': 'Brand',
              name: 'Aerolíneas Santander',
            },
            image: aircraft.image,
            offers: {
              '@type': 'Offer',
              url: `${BASE_URL}/flota/${slug}`,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Aerolíneas Santander',
              },
            },
            additionalProperty: [
              { '@type': 'PropertyValue', name: 'Pasajeros', value: aircraft.specs?.passengers },
              { '@type': 'PropertyValue', name: 'Alcance', value: aircraft.specs?.range },
              { '@type': 'PropertyValue', name: 'Velocidad', value: aircraft.specs?.speed },
              { '@type': 'PropertyValue', name: 'Altitud', value: aircraft.specs?.altitude },
            ],
          }),
        }}
      />
      <AircraftDetail aircraft={aircraft} />
    </>
  )
}

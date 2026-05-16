import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReservationForm } from '@/components/reservation/reservation-form'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

// All supported country slugs for static generation
const COUNTRY_PAGES = [
  { slug: 'peru', name: 'Perú', nameEs: 'Perú', countryCode: 'PE' },
  { slug: 'colombia', name: 'Colombia', nameEs: 'Colombia', countryCode: 'CO' },
  { slug: 'chile', name: 'Chile', nameEs: 'Chile', countryCode: 'CL' },
  { slug: 'argentina', name: 'Argentina', nameEs: 'Argentina', countryCode: 'AR' },
  { slug: 'mexico', name: 'México', nameEs: 'México', countryCode: 'MX' },
  { slug: 'brasil', name: 'Brasil', nameEs: 'Brasil', countryCode: 'BR' },
  { slug: 'ecuador', name: 'Ecuador', nameEs: 'Ecuador', countryCode: 'EC' },
  { slug: 'venezuela', name: 'Venezuela', nameEs: 'Venezuela', countryCode: 'VE' },
  { slug: 'bolivia', name: 'Bolivia', nameEs: 'Bolivia', countryCode: 'BO' },
  { slug: 'panama', name: 'Panamá', nameEs: 'Panamá', countryCode: 'PA' },
  { slug: 'costa-rica', name: 'Costa Rica', nameEs: 'Costa Rica', countryCode: 'CR' },
  { slug: 'guatemala', name: 'Guatemala', nameEs: 'Guatemala', countryCode: 'GT' },
  { slug: 'paraguay', name: 'Paraguay', nameEs: 'Paraguay', countryCode: 'PY' },
  { slug: 'uruguay', name: 'Uruguay', nameEs: 'Uruguay', countryCode: 'UY' },
  { slug: 'honduras', name: 'Honduras', nameEs: 'Honduras', countryCode: 'HN' },
  { slug: 'el-salvador', name: 'El Salvador', nameEs: 'El Salvador', countryCode: 'SV' },
  { slug: 'republica-dominicana', name: 'República Dominicana', nameEs: 'República Dominicana', countryCode: 'DO' },
  { slug: 'estados-unidos', name: 'Estados Unidos', nameEs: 'Estados Unidos', countryCode: 'US' },
  { slug: 'espana', name: 'España', nameEs: 'España', countryCode: 'ES' },
  { slug: 'canada', name: 'Canadá', nameEs: 'Canadá', countryCode: 'CA' },
]

interface PageProps {
  params: Promise<{ country: string }>
}

function getCountryData(slug: string) {
  // Remove the trailing '-reserva-de-vuelo-privado' suffix if present
  const cleanSlug = slug.replace(/-reserva-de-vuelo-privado$/, '')
  return COUNTRY_PAGES.find((c) => c.slug === cleanSlug)
}

export async function generateStaticParams() {
  return COUNTRY_PAGES.map((c) => ({
    country: `${c.slug}-reserva-de-vuelo-privado`,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countryParam } = await params
  const countryData = getCountryData(countryParam)

  if (!countryData) {
    return { title: 'Reservar Vuelo Privado | Aerolíneas Santander' }
  }

  const { name } = countryData
  const pageUrl = `${BASE_URL}/reserva/${countryParam}`

  return {
    title: `Vuelo Privado en ${name} | Cotización Inmediata | Aerolíneas Santander`,
    description: `Reserve su vuelo privado en ${name} con Aerolíneas Santander. Jets ejecutivos, ambulancias aéreas y charters para cualquier destino desde ${name}. Cotización personalizada en menos de 1 hora.`,
    keywords: [
      `vuelo privado ${name}`,
      `jet privado ${name}`,
      `charter aéreo ${name}`,
      `aviación ejecutiva ${name}`,
      `reservar vuelo privado ${name}`,
      `ambulancia aérea ${name}`,
      `cotizar vuelo privado ${name}`,
      `transporte VIP ${name}`,
      `vuelo ejecutivo ${name}`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `Vuelo Privado en ${name} | Aerolíneas Santander`,
      description: `Jet privado en ${name}: vuelos ejecutivos, charters y ambulancias aéreas. Reserve ahora y reciba cotización en 1 hora.`,
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Vuelo Privado en ${name} | Aerolíneas Santander`,
      description: `Reserve su jet privado en ${name}. Cotización inmediata. Aerolíneas Santander.`,
    },
  }
}

export default async function CountryReservationPage({ params }: PageProps) {
  const { country: countryParam } = await params
  const countryData = getCountryData(countryParam)

  if (!countryData) {
    notFound()
  }

  const { name } = countryData
  const pageUrl = `${BASE_URL}/reserva/${countryParam}`

  return (
    <>
      {/* JSON-LD: Local Service per country */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Vuelo Privado en ${name}`,
            provider: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            description: `Servicios de vuelos privados ejecutivos en ${name}. Jets de lujo, ambulancias aéreas y charters para cualquier destino.`,
            areaServed: {
              '@type': 'Country',
              name,
            },
            url: pageUrl,
            offers: {
              '@type': 'Offer',
              description: `Cotización de vuelo privado en ${name}`,
              url: pageUrl,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
      {/* Visually render the same reservation form */}
      <ReservationForm initialCountry={name} />
    </>
  )
}

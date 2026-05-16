import { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'
import { client } from '@/sanity/lib/client'
import { ABOUT_QUERY } from '@/sanity/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Historia y Valores de Aerolíneas Santander',
  description:
    'Casi dos décadas de excelencia en aviación ejecutiva privada. Conozca la historia, misión, valores y el equipo detrás de Aerolíneas Santander, líderes en vuelos privados de lujo en Latinoamérica.',
  keywords: [
    'historia Aerolíneas Santander',
    'empresa aviación ejecutiva',
    'quiénes somos aviación privada',
    'trayectoria vuelos privados',
    'misión visión aerolínea',
    'empresa vuelos charter Latinoamerica',
  ],
  alternates: {
    canonical: `${BASE_URL}/nosotros`,
  },
  openGraph: {
    title: 'Sobre Nosotros | Aerolíneas Santander',
    description:
      'Casi dos décadas conectando Latinoamérica con el mundo a través de la aviación ejecutiva de lujo. Conoce nuestra historia.',
    url: `${BASE_URL}/nosotros`,
    type: 'website',
  },
}

export default async function NosotrosPage() {
  const aboutData = await client.fetch(ABOUT_QUERY)

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
            name: 'Sobre Aerolíneas Santander',
            description:
              'Historia, misión y valores de Aerolíneas Santander, líderes en aviación ejecutiva privada en Latinoamérica.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
              foundingDate: '2006',
              description:
                'Empresa líder en aviación ejecutiva y vuelos privados en Latinoamérica.',
            },
          }),
        }}
      />
      <AboutContent data={aboutData} />
    </>
  )
}

import { Metadata } from 'next'
import { BlogContent } from '@/components/blog/blog-content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export const metadata: Metadata = {
  title: 'Blog de Aviación Ejecutiva | Noticias y Tendencias | Aerolíneas Santander',
  description:
    'Artículos especializados sobre aviación privada, jets ejecutivos, tendencias en vuelos de lujo, sostenibilidad aérea y destinos exclusivos. El blog de referencia en aviación ejecutiva latinoamericana.',
  keywords: [
    'blog aviación privada',
    'noticias jets privados',
    'tendencias aviación ejecutiva',
    'destinos exclusivos avión privado',
    'ambulancia aérea noticias',
    'vuelos corporativos latinoamerica',
    'aviación sostenible',
    'lujo en el cielo',
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog de Aviación Ejecutiva | Aerolíneas Santander',
    description:
      'Noticias, tendencias y artículos especializados en aviación ejecutiva y vuelos privados de lujo.',
    url: `${BASE_URL}/blog`,
    type: 'website',
  },
}

export default function BlogPage() {
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
            name: 'Blog de Aviación Ejecutiva | Aerolíneas Santander',
            description:
              'Artículos sobre aviación privada, jets ejecutivos, tendencias y destinos exclusivos.',
            publisher: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
          }),
        }}
      />
      <BlogContent />
    </>
  )
}

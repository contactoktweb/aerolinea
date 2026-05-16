import { Metadata } from 'next'
import { ReservationForm } from '@/components/reservation/reservation-form'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

export const metadata: Metadata = {
  title: 'Reservar Vuelo Privado | Cotización Inmediata | Aerolíneas Santander',
  description:
    'Reserve su vuelo privado con Aerolíneas Santander. Complete nuestro formulario en 5 pasos y reciba cotización personalizada en menos de 1 hora. Disponible para cualquier país del mundo.',
  keywords: [
    'reservar vuelo privado',
    'cotizar jet privado',
    'cotización vuelo charter',
    'reserva aviación ejecutiva',
    'contratar vuelo privado',
    'precio jet privado',
    'vuelo privado internacional',
    'charter aéreo cotización',
  ],
  alternates: {
    canonical: `${BASE_URL}/reserva`,
  },
  openGraph: {
    title: 'Reserve su Vuelo Privado | Cotización en 5 Pasos',
    description:
      'Reserve su jet privado en 5 pasos. Atención VIP garantizada y respuesta en menos de 1 hora. Vuelos a cualquier destino del mundo.',
    url: `${BASE_URL}/reserva`,
    type: 'website',
  },
}

export default function ReservaPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Reserva de Vuelo Privado',
            provider: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            description:
              'Servicio de reserva de vuelos privados ejecutivos. Cotización personalizada para cualquier destino del mundo.',
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

import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function seedLocalizedServices() {
  console.log('Seeding localized services...')

  const services = [
    {
      _id: 'service-0',
      _type: 'service',
      title: {
        es: 'Vuelos Chárter Ejecutivos',
        en: 'Executive Charter Flights',
        fr: 'Vols Charter Exécutifs'
      },
      description: {
        es: 'Vuelos privados a medida para ejecutivos y delegaciones empresariales.',
        en: 'Tailored private flights for executives and business delegations.',
        fr: 'Vols privés sur mesure pour les cadres et les délégations d\'affaires.'
      },
      order: 1,
      iconType: 'ph:airplane-light'
    },
    {
      _id: 'service-1',
      _type: 'service',
      title: {
        es: 'Ambulancia Aérea',
        en: 'Air Ambulance',
        fr: 'Ambulance Aérienne'
      },
      description: {
        es: 'Traslados médicos de emergencia con equipamiento de cuidados intensivos.',
        en: 'Emergency medical transfers with intensive care equipment.',
        fr: 'Transferts médicaux d\'urgence avec équipement de soins intensifs.'
      },
      order: 2,
      iconType: 'ph:heart-light'
    },
    {
      _id: 'service-2',
      _type: 'service',
      title: {
        es: 'Transporte de Carga Especializada',
        en: 'Specialized Cargo Transport',
        fr: 'Transport de Fret Spécialisé'
      },
      description: {
        es: 'Logística aérea para mercancías de alto valor y envíos críticos.',
        en: 'Air logistics for high-value goods and critical shipments.',
        fr: 'Logistique aérienne pour les marchandises de haute valeur et les expéditions critiques.'
      },
      order: 3,
      iconType: 'ph:package-light'
    }
  ]

  for (const service of services) {
    try {
      // Use patch to preserve images if they exist, or createOrReplace if not
      // For simplicity in seeding, we'll use createOrReplace but we might lose images if not careful.
      // Better to fetch existing image first.
      const existing = await client.getDocument(service._id)
      await client.createOrReplace({
        ...service,
        image: existing?.image
      })
      console.log(`Service ${service._id} updated with translations.`)
    } catch (err) {
      console.error(`Error updating service ${service._id}:`, err)
    }
  }

  console.log('Localized services seeded successfully!')
}

seedLocalizedServices()

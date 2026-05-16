import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
  projectId: "v1k0g8ox",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "sk6xgM64G178ddYsUw1UmnhF8Dy40f0UYyuV2WpsZbG83YSyTrbmFuNrzOf4Ux2Svvh2snWKW8JM06ZpJJIBsPADZGsSSrJnpyDpfQyUIuWTojlqEeYdw8JMZmcJuS4nmZU55RR9IraHj1ToSjO7TPSPJNNOshKTFYoebG9jceKaPQKlCEbb",
  useCdn: false,
})

async function uploadImage(filePath: string) {
  try {
    const file = readFileSync(filePath)
    const asset = await client.assets.upload('image', file, {
      filename: filePath.split('/').pop(),
    })
    return asset
  } catch (err) {
    console.error(`Error uploading ${filePath}:`, err)
    return null
  }
}

async function seed() {
  console.log('Uploading About images...')
  const heroAsset = await uploadImage(join(process.cwd(), 'public/images/about-hero.jpg'))
  const legacyAsset = await uploadImage(join(process.cwd(), 'public/images/about-legacy.jpg'))
  const ceoAsset = await uploadImage(join(process.cwd(), 'public/images/team/ceo.jpg'))
  const operationsAsset = await uploadImage(join(process.cwd(), 'public/images/team/operations.jpg'))
  const pilotAsset = await uploadImage(join(process.cwd(), 'public/images/team/chief-pilot.jpg'))

  const about = {
    _id: 'about',
    _type: 'about',
    hero: {
      title: '100% VIP',
      subtitle: 'Nuestra Historia',
      description: 'Desde 2008, Aerolíneas Santander ha sido sinónimo de excelencia en aviación privada. Fundada con la visión de ofrecer servicios de vuelo que superen todas las expectativas.',
      image: heroAsset ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroAsset._id }
      } : undefined,
    },
    stats: [
      { _key: 's1', value: 18, suffix: '+', label: 'Años de Experiencia' },
      { _key: 's2', value: 15000, suffix: '+', label: 'Vuelos Realizados' },
      { _key: 's3', value: 50, suffix: '+', label: 'Destinos Globales' },
      { _key: 's4', value: 98, suffix: '%', label: 'Satisfacción' },
    ],
    legacy: {
      title: 'Tradición de Excelencia en el Cielo',
      subtitle: 'Nuestro Legado',
      description: 'Fundada por Carlos Santander Sr., piloto con más de 30 años de experiencia en aviación comercial y militar, Aerolíneas Santander nació con el compromiso de ofrecer servicios de aviación privada sin igual en Latinoamérica.\n\nA lo largo de casi dos décadas, hemos transportado a líderes empresariales, celebridades internacionales y familias distinguidas, siempre manteniendo nuestro compromiso con la seguridad, discreción y el servicio excepcional.',
      image: legacyAsset ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: legacyAsset._id }
      } : undefined,
    },
    values: [
      { _key: 'v1', icon: 'ph:shield-check-light', title: 'Seguridad', description: 'La seguridad de nuestros pasajeros es nuestra máxima prioridad. Cumplimos con los más altos estándares internacionales.' },
      { _key: 'v2', icon: 'ph:medal-light', title: 'Excelencia', description: 'Cada detalle de nuestro servicio está diseñado para superar las expectativas más exigentes de nuestros clientes VIP.' },
      { _key: 'v3', icon: 'ph:users-light', title: 'Servicio Personal', description: 'Un equipo dedicado de profesionales disponible 24/7 para atender cada necesidad de manera personalizada.' },
      { _key: 'v4', icon: 'ph:airplane-light', title: 'Flota Premium', description: 'Aeronaves de última generación con mantenimiento riguroso y amenidades de lujo.' },
    ],
    team: [
      { _key: 't1', name: 'Carlos Santander', role: 'Director General', image: ceoAsset ? { _type: 'image', asset: { _type: 'reference', _ref: ceoAsset._id } } : undefined },
      { _key: 't2', name: 'María Elena Vásquez', role: 'Directora de Operaciones', image: operationsAsset ? { _type: 'image', asset: { _type: 'reference', _ref: operationsAsset._id } } : undefined },
      { _key: 't3', name: 'Roberto Mendoza', role: 'Jefe de Pilotos', image: pilotAsset ? { _type: 'image', asset: { _type: 'reference', _ref: pilotAsset._id } } : undefined },
    ],
  }

  try {
    await client.createOrReplace(about)
    console.log('About page seeded successfully')
  } catch (err) {
    console.error('Error seeding About page:', err)
  }
}

seed()

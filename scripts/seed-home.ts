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
  console.log('Uploading Home images...')
  const heroAsset = await uploadImage(join(process.cwd(), 'public/images/aircraft/gulfstream-g650.jpg'))

  const home = {
    _id: 'home',
    _type: 'home',
    hero: {
      description: 'Elevando la experiencia de vuelo a través del diseño y la distinción.',
      image: heroAsset ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroAsset._id }
      } : undefined,
      ctaPrimary: { text: 'Solicitar Vuelo', link: '/reserva' },
      ctaSecondary: { text: 'Nuestra Flota', link: '/flota' },
    },
    essence: {
      title: 'Nuestra Esencia',
      description: 'Elevamos el estándar de la aviación privada mediante exclusividad, seguridad y eficiencia absoluta en cada misión. Diseñamos el tiempo de nuestros clientes para que su única preocupación sea el destino.',
    },
    history: {
      title: 'Desde 2008',
      description: 'Líderes en aviación ejecutiva con presencia global. Casi dos décadas operando bajo los más altos protocolos de seguridad y puntualidad en cada despegue.',
    },
  }

  try {
    await client.createOrReplace(home)
    console.log('Home page seeded successfully')
  } catch (err) {
    console.error('Error seeding Home page:', err)
  }
}

seed()

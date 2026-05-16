import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
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

async function seedHome() {
  console.log('Seeding home document with localized content...')

  const bgAsset = await uploadImage(join(process.cwd(), 'public/images/aircraft/gulfstream-g650.jpg'))

  const homeDocument = {
    _id: 'home',
    _type: 'home',
    hero: {
      description: {
        es: "Elevando la experiencia de vuelo a través del diseño y la distinción.",
        en: "Elevating the flight experience through design and distinction.",
        fr: "Élever l'expérience de vol grâce au design et à la distinction."
      },
      image: bgAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: bgAsset._id
        }
      } : undefined,
      ctaPrimary: {
        text: {
          es: "Solicitar Vuelo",
          en: "Request Flight",
          fr: "Demander un vol"
        },
        link: "/reserva"
      },
      ctaSecondary: {
        text: {
          es: "Nuestra Flota",
          en: "Our Fleet",
          fr: "Notre Flotte"
        },
        link: "/flota"
      }
    },
    essence: {
      title: {
        es: "Nuestra Esencia",
        en: "Our Essence",
        fr: "Notre Essence"
      },
      description: {
        es: "Elevamos el estándar de la aviación privada mediante exclusividad, seguridad y eficiencia absoluta en cada misión.",
        en: "We elevate the standard of private aviation through exclusivity, safety, and absolute efficiency in every mission.",
        fr: "Nous élevons le standard de l'aviation privée grâce à l'exclusivité, la sécurité et l'efficacité absolue dans chaque mission."
      }
    },
    history: {
      title: {
        es: "Desde 2008",
        en: "Since 2008",
        fr: "Depuis 2008"
      },
      description: {
        es: "Líderes en aviación ejecutiva con presencia global. Casi dos décadas operando bajo los más altos protocolos de seguridad.",
        en: "Leaders in executive aviation with a global presence. Nearly two decades operating under the highest security protocols.",
        fr: "Leaders de l'aviation d'affaires avec une présence mondiale. Près de deux décennies d'exploitation selon les protocoles de sécurité les plus élevés."
      }
    }
  }

  try {
    await client.createOrReplace(homeDocument)
    console.log('Home document seeded successfully!')
  } catch (err) {
    console.error('Error seeding home document:', err)
  }
}

seedHome()

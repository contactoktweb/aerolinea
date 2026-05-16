import { createClient } from 'next-sanity'
import { aircraftData } from '../lib/aircraft-data'
import { readFileSync } from 'fs'
import { join, basename } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-05-16',
})

async function uploadImage(imagePath: string) {
  try {
    // Convert web path to local path
    const localPath = join(process.cwd(), 'public', imagePath)
    const fileBuffer = readFileSync(localPath)
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: basename(localPath),
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error)
    return null
  }
}

async function seedFleet() {
  console.log('🚀 Iniciando carga de inventario de flota...')

  for (const aircraft of aircraftData) {
    console.log(`✈️ Procesando: ${aircraft.name}...`)

    const imageAsset = await uploadImage(aircraft.image)
    const interiorAsset = await uploadImage(aircraft.interiorImage)

    const doc = {
      _type: 'aircraft',
      _id: `aircraft-${aircraft.slug}`,
      name: aircraft.name,
      slug: { _type: 'slug', current: aircraft.slug },
      model: aircraft.model,
      category: aircraft.category,
      tagline: aircraft.tagline,
      description: aircraft.description,
      specs: {
        passengers: aircraft.specs.passengers,
        range: aircraft.specs.range,
        speed: aircraft.specs.speed,
        altitude: aircraft.specs.altitude,
        baggage: aircraft.specs.baggage,
      },
      features: aircraft.features,
      image: imageAsset,
      interiorImage: interiorAsset,
      order: parseInt(aircraft.id),
    }

    await client.createOrReplace(doc)
    console.log(`✅ ${aircraft.name} cargado correctamente.`)
  }

  console.log('✨ Carga de flota completada!')
}

seedFleet().catch(console.error)

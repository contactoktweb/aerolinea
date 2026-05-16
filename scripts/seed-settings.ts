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
  console.log('Uploading images...')
  const logoAsset = await uploadImage(join(process.cwd(), 'public/logo.png'))
  const faviconAsset = await uploadImage(join(process.cwd(), 'public/favicon.png'))

  const settings = {
    _id: 'settings',
    _type: 'settings',
    title: 'Aerolíneas Santander',
    email: 'vip@aerolineasantander.com',
    phone: '+51 1 444 5555',
    address: 'Aeropuerto Jorge Chavez, Terminal de Aviacion Ejecutiva',
    notificationEmail: 'vip@aerolineasantander.com',
    logo: logoAsset ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: logoAsset._id }
    } : undefined,
    logoFooter: logoAsset ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: logoAsset._id }
    } : undefined,
    favicon: faviconAsset ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: faviconAsset._id }
    } : undefined,
    socialLinks: [
      { _key: 'fb', platform: 'Facebook', url: 'https://facebook.com', icon: 'ph:facebook-logo-light' },
      { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com', icon: 'ph:instagram-logo-light' },
      { _key: 'li', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'ph:linkedin-logo-light' },
    ],
  }

  try {
    await client.createOrReplace(settings)
    console.log('Settings seeded successfully with images')
  } catch (err) {
    console.error('Error seeding settings:', err)
  }
}

seed()

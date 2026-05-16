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
  console.log('Seeding modular home sections...')

  // 1. Services
  const serviceImages = [
    join(process.cwd(), 'public/images/aircraft/gulfstream-g650.jpg'),
    join(process.cwd(), 'public/images/blog/air-ambulance.jpg'),
    join(process.cwd(), 'public/images/aircraft/falcon-8x.jpg'),
  ]

  const services = [
    { title: 'Vuelos Chárter Ejecutivos', description: 'Vuelos privados a medida para ejecutivos y delegaciones empresariales.', order: 1 },
    { title: 'Ambulancia Aérea', description: 'Traslados médicos de emergencia con equipamiento de cuidados intensivos.', order: 2 },
    { title: 'Transporte de Carga Especializada', description: 'Logística aérea para mercancías de alto valor y envíos críticos.', order: 3 },
  ]

  for (let i = 0; i < services.length; i++) {
    const asset = await uploadImage(serviceImages[i])
    await client.createOrReplace({
      _id: `service-${i}`,
      _type: 'service',
      ...services[i],
      image: asset ? { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } : undefined,
    })
  }

  // 2. Testimonials
  const testimonials = [
    { name: 'Alejandro Montalvo', role: 'CEO TechCorp', content: 'La puntualidad y el servicio a bordo son impecables. Aerolíneas Santander es nuestro socio estratégico para viajes regionales.', rating: 5 },
    { name: 'Dra. Elena Rivas', role: 'Fundación Vida', content: 'Su servicio de ambulancia aérea salvó la vida de uno de nuestros pacientes. Profesionalismo total en momentos críticos.', rating: 5 },
    { name: 'Marco Aurelio', role: 'Logística Internacional', content: 'La mejor opción para transporte de carga crítica. Siempre cumplen con los tiempos de entrega más exigentes.', rating: 5 },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    await client.createOrReplace({
      _id: `testimonial-${i}`,
      _type: 'testimonial',
      ...testimonials[i],
    })
  }

  console.log('Modular sections seeded successfully')
}

seed()

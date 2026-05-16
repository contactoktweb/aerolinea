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

async function seedBlogs() {
  console.log('Seeding localized blogs...')

  const blogs = [
    {
      _id: 'post-1',
      slug: 'tendencias-aviacion-privada-2024',
      title: {
        es: 'Tendencias en Aviación Privada para 2024',
        en: 'Trends in Private Aviation for 2024',
        fr: 'Tendances de l\'aviation privée pour 2024'
      },
      excerpt: {
        es: 'Descubra las últimas innovaciones y tendencias que están transformando la industria de los jets privados este año.',
        en: 'Discover the latest innovations and trends transforming the private jet industry this year.',
        fr: 'Découvrez les dernières innovations et tendances qui transforment l\'industrie des jets privés cette année.'
      },
      category: 'Industria',
      date: '2024-01-15',
      readTime: '5 min',
      imageFile: 'trends-2024.jpg',
      featured: true,
    },
    {
      _id: 'post-2',
      slug: 'nueva-aeronave-gulfstream',
      title: {
        es: 'Gulfstream G650ER Se Une a Nuestra Flota',
        en: 'Gulfstream G650ER Joins Our Fleet',
        fr: 'Le Gulfstream G650ER rejoint notre flotte'
      },
      excerpt: {
        es: 'Anunciamos la incorporación del Gulfstream G650ER, expandiendo nuestras capacidades de vuelo ultra largo alcance.',
        en: 'We announce the addition of the Gulfstream G650ER, expanding our ultra-long-range flight capabilities.',
        fr: 'Nous annonçons l\'ajout du Gulfstream G650ER, étendant nos capacités de vol à ultra longue portée.'
      },
      category: 'Flota',
      date: '2024-01-10',
      readTime: '3 min',
      imageFile: 'new-aircraft.jpg',
      featured: false,
    },
    {
      _id: 'post-3',
      slug: 'destinos-exclusivos-peru',
      title: {
        es: '5 Destinos Exclusivos Accesibles Solo por Jet Privado',
        en: '5 Exclusive Destinations Accessible Only by Private Jet',
        fr: '5 destinations exclusives accessibles uniquement par jet privé'
      },
      excerpt: {
        es: 'Desde la selva amazónica hasta playas vírgenes, explore destinos únicos que solo son accesibles con nuestra flota.',
        en: 'From the Amazon rainforest to pristine beaches, explore unique destinations accessible only with our fleet.',
        fr: 'De la forêt amazonienne aux plages vierges, explorez des destinations uniques accessibles uniquement avec notre flotte.'
      },
      category: 'Destinos',
      date: '2024-01-05',
      readTime: '7 min',
      imageFile: 'destinations.jpg',
      featured: false,
    },
    {
      _id: 'post-4',
      slug: 'servicio-ambulancia-aerea',
      title: {
        es: 'La Importancia de la Ambulancia Aérea en Emergencias',
        en: 'The Importance of Air Ambulance in Emergencies',
        fr: 'L\'importance de l\'ambulance aérienne dans les urgences'
      },
      excerpt: {
        es: 'Cómo nuestro servicio de ambulancia aérea ha salvado vidas con traslados médicos de emergencia en tiempo récord.',
        en: 'How our air ambulance service has saved lives with record-time emergency medical transfers.',
        fr: 'Comment notre service d\'ambulance aérienne a sauvé des vies grâce à des transferts médicaux d\'urgence en un temps record.'
      },
      category: 'Servicios',
      date: '2023-12-28',
      readTime: '4 min',
      imageFile: 'air-ambulance.jpg',
      featured: false,
    },
    {
      _id: 'post-5',
      slug: 'sostenibilidad-aviacion',
      title: {
        es: 'Nuestro Compromiso con la Sostenibilidad',
        en: 'Our Commitment to Sustainability',
        fr: 'Notre engagement envers la durabilité'
      },
      excerpt: {
        es: 'Iniciativas de carbono neutral y combustibles sostenibles que estamos implementando para un futuro más verde.',
        en: 'Carbon-neutral initiatives and sustainable fuels we are implementing for a greener future.',
        fr: 'Initiatives de neutralité carbone et carburants durables que nous mettons en œuvre pour un avenir plus vert.'
      },
      category: 'Sostenibilidad',
      date: '2023-12-20',
      readTime: '6 min',
      imageFile: 'sustainability.jpg',
      featured: false,
    },
    {
      _id: 'post-6',
      slug: 'eventos-corporativos-aereos',
      title: {
        es: 'Eventos Corporativos en el Aire: La Nueva Tendencia',
        en: 'Corporate Events in the Air: The New Trend',
        fr: 'Événements d\'entreprise dans les airs : la nouvelle tendance'
      },
      excerpt: {
        es: 'Reuniones de negocios, celebraciones y lanzamientos de productos a 40,000 pies de altura.',
        en: 'Business meetings, celebrations, and product launches at 40,000 feet.',
        fr: 'Réunions d\'affaires, célébrations et lancements de produits à 40 000 pieds.'
      },
      category: 'Empresas',
      date: '2023-12-15',
      readTime: '5 min',
      imageFile: 'corporate.jpg',
      featured: false,
    }
  ]

  for (const blog of blogs) {
    const asset = await uploadImage(join(process.cwd(), 'public/images/blog/', blog.imageFile))
    
    const doc = {
      _id: blog._id,
      _type: 'post',
      title: blog.title,
      slug: { _type: 'slug', current: blog.slug },
      excerpt: blog.excerpt,
      category: blog.category,
      date: blog.date,
      readTime: blog.readTime,
      featured: blog.featured,
      image: asset ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id }
      } : undefined,
      body: {
        es: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: `Este es el contenido de ${blog.title.es}.` }],
            markDefs: [],
            style: 'normal'
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: `This is the content of ${blog.title.en}.` }],
            markDefs: [],
            style: 'normal'
          }
        ],
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: `C'est le contenu de ${blog.title.fr}.` }],
            markDefs: [],
            style: 'normal'
          }
        ]
      }
    }

    try {
      await client.createOrReplace(doc)
      console.log(`Blog ${blog.slug} seeded successfully!`)
    } catch (err) {
      console.error(`Error seeding blog ${blog.slug}:`, err)
    }
  }

  console.log('All blogs seeded successfully!')
}

seedBlogs()

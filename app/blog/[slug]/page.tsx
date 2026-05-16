import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from '@/components/blog/blog-detail'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

// This would normally come from a CMS or API
const articles = [
  {
    id: '1',
    slug: 'tendencias-aviacion-privada-2024',
    title: 'Tendencias en Aviación Privada para 2024',
    excerpt: 'Descubra las últimas innovaciones y tendencias que están transformando la industria de los jets privados este año.',
    category: 'Industria',
    date: '15 Ene 2024',
    readTime: '5 min',
    image: '/images/blog/trends-2024.jpg',
    featured: true,
    content: `
      <p>La industria de la aviación privada está experimentando una transformación sin precedentes en 2024. Desde la adopción de tecnologías más sostenibles hasta la personalización extrema de la experiencia del cliente, el panorama está cambiando para satisfacer a una nueva generación de viajeros.</p>
      
      <h2>Sostenibilidad como Prioridad</h2>
      <p>El uso de Combustible de Aviación Sostenible (SAF) ya no es opcional. Las principales aerolíneas privadas están integrando programas de compensación de carbono y optimizando sus rutas mediante IA para reducir el impacto ambiental.</p>
      
      <blockquote>"El lujo del futuro será inherentemente sostenible, o no será lujo."</blockquote>
      
      <h2>Digitalización y Reserva Instantánea</h2>
      <p>La facilidad de reservar un jet privado a través de una aplicación móvil está democratizando el acceso a servicios que antes requerían múltiples llamadas y gestiones complejas.</p>
      
      <h2>Experiencias Hiper-Personalizadas</h2>
      <p>Desde menús diseñados por chefs con estrellas Michelin hasta configuraciones de cabina que se adaptan al propósito del viaje (negocios, descanso o entretenimiento), la personalización es la clave del éxito en 2024.</p>
    `
  },
  {
    id: '2',
    slug: 'nueva-aeronave-gulfstream',
    title: 'Gulfstream G650ER Se Une a Nuestra Flota',
    excerpt: 'Anunciamos la incorporación del Gulfstream G650ER, expandiendo nuestras capacidades de vuelo ultra largo alcance.',
    category: 'Flota',
    date: '10 Ene 2024',
    readTime: '3 min',
    image: '/images/blog/new-aircraft.jpg',
    featured: false,
    content: `
      <p>Estamos orgullosos de anunciar la última incorporación a nuestra flota exclusiva: el Gulfstream G650ER. Esta aeronave representa la cúspide de la ingeniería aeronáutica y el confort ejecutivo.</p>
      
      <h2>Alcance Ultra Largo</h2>
      <p>Con un alcance de 7,500 millas náuticas (13,890 km), el G650ER permite volar sin escalas entre ciudades como Lima y Madrid, o Lima y Los Ángeles, con una eficiencia inigualable.</p>
      
      <h2>Confort Interior</h2>
      <p>La cabina cuenta con 16 ventanas panorámicas icónicas de Gulfstream, permitiendo una abundancia de luz natural. El sistema de aire 100% fresco se renueva cada dos minutos, garantizando que los pasajeros lleguen descansados a su destino.</p>
    `
  },
  {
    id: '3',
    slug: 'destinos-exclusivos-peru',
    title: '5 Destinos Exclusivos Accesibles Solo por Jet Privado',
    excerpt: 'Desde la selva amazónica hasta playas vírgenes, explore destinos únicos que solo son accesibles con nuestra flota.',
    category: 'Destinos',
    date: '05 Ene 2024',
    readTime: '7 min',
    image: '/images/blog/destinations.jpg',
    featured: false,
    content: `
      <p>Perú es un país de contrastes geográficos asombrosos. Muchos de sus tesoros más exclusivos se encuentran en ubicaciones remotas donde la aviación comercial simplemente no llega.</p>
      
      <h2>1. El Callejón de Huaylas</h2>
      <p>Aterrizar en aeródromos privados cerca de la Cordillera Blanca permite un acceso inmediato a los glaciares y lagunas más espectaculares de los Andes.</p>
      
      <h2>2. Playas Vírgenes de Piura</h2>
      <p>Evite las multitudes de los aeropuertos comerciales y vuele directamente a pistas privadas cerca de los resorts más exclusivos del norte peruano.</p>
      
      <h2>3. Reservas Privadas en la Amazonía</h2>
      <p>Llegue al corazón de la selva en jets especializados capaces de operar en pistas cortas, garantizando una inmersión total en la naturaleza sin escalas innecesarias.</p>
    `
  },
  {
    id: '4',
    slug: 'servicio-ambulancia-aerea',
    title: 'La Importancia de la Ambulancia Aérea en Emergencias',
    excerpt: 'Cómo nuestro servicio de ambulancia aérea ha salvado vidas con traslados médicos de emergencia en tiempo récord.',
    category: 'Servicios',
    date: '28 Dic 2023',
    readTime: '4 min',
    image: '/images/blog/air-ambulance.jpg',
    featured: false,
    content: `
      <p>En situaciones críticas, el tiempo es el factor más determinante. Nuestro servicio de ambulancia aérea está diseñado para ofrecer una respuesta inmediata y cuidados de alta complejidad durante el traslado.</p>
      
      <h2>Equipamiento de Cuidados Intensivos</h2>
      <p>Nuestras aeronaves están configuradas como unidades de cuidados intensivos volantes, con monitores multiparámetros, ventiladores mecánicos y desfibriladores de última generación.</p>
      
      <h2>Personal Médico Especializado</h2>
      <p>Cada vuelo de ambulancia cuenta con un equipo de médicos intensivistas y enfermeros especializados en transporte aeromédico, garantizando la estabilidad del paciente durante todo el trayecto.</p>
    `
  },
  {
    id: '5',
    slug: 'sostenibilidad-aviacion',
    title: 'Nuestro Compromiso con la Sostenibilidad',
    excerpt: 'Iniciativas de carbono neutral y combustibles sostenibles que estamos implementando para un futuro más verde.',
    category: 'Sostenibilidad',
    date: '20 Dic 2023',
    readTime: '6 min',
    image: '/images/blog/sustainability.jpg',
    featured: false,
    content: `
      <p>En Aerolíneas Santander, entendemos que el futuro de la aviación debe ser sostenible. Por ello, hemos lanzado nuestro programa "Cielos Verdes", una iniciativa integral para reducir nuestra huella ambiental.</p>
      
      <h2>Inversión en SAF</h2>
      <p>Estamos incrementando gradualmente el uso de Sustainable Aviation Fuel (SAF) en todas nuestras operaciones, lo que puede reducir las emisiones de ciclo de vida hasta en un 80%.</p>
      
      <h2>Compensación de Carbono</h2>
      <p>Ofrecemos a nuestros clientes la posibilidad de compensar el 100% de las emisiones de sus vuelos a través de proyectos de reforestación certificados en la Amazonía peruana.</p>
    `
  },
  {
    id: '6',
    slug: 'eventos-corporativos-aereos',
    title: 'Eventos Corporativos en el Aire: La Nueva Tendencia',
    excerpt: 'Reuniones de negocios, celebraciones y lanzamientos de productos a 40,000 pies de altura.',
    category: 'Empresas',
    date: '15 Dic 2023',
    readTime: '5 min',
    image: '/images/blog/corporate.jpg',
    featured: false,
    content: `
      <p>¿Por qué conformarse con una sala de juntas convencional cuando puede llevar sus negocios al siguiente nivel? Los eventos corporativos a bordo de jets privados son la nueva frontera del networking ejecutivo.</p>
      
      <h2>Productividad sin Interrupciones</h2>
      <p>Con conectividad satelital de alta velocidad y ambientes diseñados para la concentración, los jets privados permiten aprovechar cada minuto del trayecto para cerrar acuerdos importantes.</p>
      
      <h2>Lanzamientos de Productos Exclusivos</h2>
      <p>Sorprenda a sus socios y clientes con experiencias memorables que comienzan desde el momento del despegue, creando un entorno de exclusividad inigualable.</p>
    `
  }
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) return { title: 'Artículo no encontrado | Aerolíneas Santander' }

  const pageUrl = `${BASE_URL}/blog/${slug}`

  return {
    title: `${article.title} | Blog Aerolíneas Santander`,
    description: article.excerpt,
    keywords: [
      article.category,
      'aviación privada',
      'jets ejecutivos',
      'vuelos privados',
      article.title,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: pageUrl,
      type: 'article',
      publishedTime: article.date,
      section: article.category,
      authors: ['Aerolíneas Santander'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const pageUrl = `${BASE_URL}/blog/${slug}`

  return (
    <>
      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article!.title,
            description: article!.excerpt,
            datePublished: article!.date,
            author: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Aerolíneas Santander',
              url: BASE_URL,
            },
            url: pageUrl,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageUrl,
            },
            articleSection: article!.category,
            keywords: ['aviación privada', 'jets ejecutivos', article!.category],
          }),
        }}
      />
      <BlogDetail article={article!} />
    </>
  )
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

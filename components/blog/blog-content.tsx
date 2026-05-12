'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SectionTitle } from '@/components/ui/section-title'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const articles = [
  {
    id: '1',
    slug: 'tendencias-aviacion-privada-2024',
    title: 'Tendencias en Aviación Privada para 2024',
    excerpt:
      'Descubra las últimas innovaciones y tendencias que están transformando la industria de los jets privados este año.',
    category: 'Industria',
    date: '15 Ene 2024',
    readTime: '5 min',
    image: '/images/blog/trends-2024.jpg',
    featured: true,
  },
  {
    id: '2',
    slug: 'nueva-aeronave-gulfstream',
    title: 'Gulfstream G650ER Se Une a Nuestra Flota',
    excerpt:
      'Anunciamos la incorporación del Gulfstream G650ER, expandiendo nuestras capacidades de vuelo ultra largo alcance.',
    category: 'Flota',
    date: '10 Ene 2024',
    readTime: '3 min',
    image: '/images/blog/new-aircraft.jpg',
    featured: false,
  },
  {
    id: '3',
    slug: 'destinos-exclusivos-peru',
    title: '5 Destinos Exclusivos Accesibles Solo por Jet Privado',
    excerpt:
      'Desde la selva amazónica hasta playas vírgenes, explore destinos únicos que solo son accesibles con nuestra flota.',
    category: 'Destinos',
    date: '05 Ene 2024',
    readTime: '7 min',
    image: '/images/blog/destinations.jpg',
    featured: false,
  },
  {
    id: '4',
    slug: 'servicio-ambulancia-aerea',
    title: 'La Importancia de la Ambulancia Aérea en Emergencias',
    excerpt:
      'Cómo nuestro servicio de ambulancia aérea ha salvado vidas con traslados médicos de emergencia en tiempo récord.',
    category: 'Servicios',
    date: '28 Dic 2023',
    readTime: '4 min',
    image: '/images/blog/air-ambulance.jpg',
    featured: false,
  },
  {
    id: '5',
    slug: 'sostenibilidad-aviacion',
    title: 'Nuestro Compromiso con la Sostenibilidad',
    excerpt:
      'Iniciativas de carbono neutral y combustibles sostenibles que estamos implementando para un futuro más verde.',
    category: 'Sostenibilidad',
    date: '20 Dic 2023',
    readTime: '6 min',
    image: '/images/blog/sustainability.jpg',
    featured: false,
  },
  {
    id: '6',
    slug: 'eventos-corporativos-aereos',
    title: 'Eventos Corporativos en el Aire: La Nueva Tendencia',
    excerpt:
      'Reuniones de negocios, celebraciones y lanzamientos de productos a 40,000 pies de altura.',
    category: 'Empresas',
    date: '15 Dic 2023',
    readTime: '5 min',
    image: '/images/blog/corporate.jpg',
    featured: false,
  },
]

export function BlogContent() {
  const featuredArticle = articles.find((a) => a.featured)
  const regularArticles = articles.filter((a) => !a.featured)

  return (
    <article className="pt-48 lg:pt-56 pb-24 lg:pb-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="Blog"
          title="Noticias y Novedades"
          description="Manténgase informado sobre las últimas tendencias en aviación privada, novedades de nuestra flota y consejos de viaje exclusivos."
          theme="light"
        />

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <Link href={`/blog/${featuredArticle.slug}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden border border-burgundy/5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] hover:shadow-[0_30px_70px_rgba(74,14,14,0.12)] transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-champagne text-background">
                        Destacado
                      </span>
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy/5 text-burgundy/70">
                        {featuredArticle.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-champagne mb-4 group-hover:text-champagne/80 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-burgundy/70 font-medium leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-burgundy/50 font-bold">
                      <span className="flex items-center gap-2">
                        <Icon icon="ph:calendar-blank-light" className="w-4 h-4" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon icon="ph:clock-light" className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>
            </div>
            </Link>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {regularArticles.map((article, index) => (
            <motion.div key={article.id} variants={fadeInUp}>
              <Link href={`/blog/${article.slug}`} className="block h-full group">
                <div className="h-full flex flex-col bg-white rounded-2xl p-8 border border-burgundy/5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] hover:shadow-[0_30px_70px_rgba(74,14,14,0.12)] transition-all duration-500">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 -mx-6 -mt-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-champagne text-background shadow-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-champagne mb-3 group-hover:text-champagne/80 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-burgundy/60 text-sm font-medium leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
                    <div className="flex items-center gap-4 text-xs text-burgundy/50 font-bold">
                      <span className="flex items-center gap-1">
                        <Icon icon="ph:calendar-blank-light" className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="ph:clock-light" className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <Icon icon="ph:arrow-right-light" className="w-4 h-4 text-burgundy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </article>
  )
}

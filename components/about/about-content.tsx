'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { urlFor } from '@/sanity/lib/image'
import { fadeInUp, staggerContainer, slideInFromLeft, slideInFromRight } from '@/lib/animations'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionTitle } from '@/components/ui/section-title'
import { AnimatedCounter } from '@/components/about/animated-counter'

// Default fallback data
const stats = [
  { value: 15, suffix: '+', label: 'Años de Experiencia' },
  { value: 50, suffix: '+', label: 'Destinos Globales' },
  { value: 10, suffix: 'k+', label: 'Vuelos Completados' },
  { value: 100, suffix: '%', label: 'Compromiso VIP' },
]

const values = [
  { title: 'Seguridad', description: 'Nuestra prioridad absoluta con los más altos estándares internacionales.' },
  { title: 'Excelencia', description: 'Atención al detalle en cada aspecto de su experiencia de vuelo.' },
  { title: 'Servicio Personal', description: 'Vuelos diseñados específicamente para sus necesidades.' },
  { title: 'Flota Premium', description: 'Aeronaves de última generación mantenidas a la perfección.' },
]

const team = [
  { name: 'Carlos Santander', role: 'Fundador & CEO', image_local: '/images/team/ceo.jpg' },
  { name: 'Dra. Elena Ruiz', role: 'Directora de Operaciones', image_local: '/images/team/ops.jpg' },
  { name: 'Capt. Luis Mendez', role: 'Jefe de Pilotos', image_local: '/images/team/pilot.jpg' },
]

const valueIcons: Record<string, string> = {
  'Seguridad': 'ph:shield-check-light',
  'Excelencia': 'ph:medal-light',
  'Servicio Personal': 'ph:users-light',
  'Flota Premium': 'ph:airplane-light',
}

export function AboutContent({ data }: { data?: any }) {
  const displayStats = data?.stats || stats
  const displayValues = data?.values || values
  const displayTeam = data?.team || team

  const heroImage = data?.hero?.image ? urlFor(data.hero.image).url() : "/images/about-hero.jpg"
  const legacyImage = data?.legacy?.image ? urlFor(data.legacy.image).url() : "/images/about-legacy.jpg"

  return (
    <article>
      {/* Hero Section */}
      <section className="relative pt-48 lg:pt-56 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={data?.hero?.title || "Historia de Aerolíneas Santander"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4"
            >
              {data?.hero?.subtitle || "Nuestra Historia"}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl mb-6"
            >
              {data?.hero?.title || "100% VIP"}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-pearl/80 leading-relaxed"
            >
              {data?.hero?.description || "Desde 2008, Aerolíneas Santander ha sido sinónimo de excelencia en aviación privada."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-28 bg-white border-y border-burgundy/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {displayStats.map((stat: any, index: number) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={2 + index * 0.3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                {data?.legacy?.subtitle || "Nuestro Legado"}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-background mb-6">
                {data?.legacy?.title || "Tradición de Excelencia en el Cielo"}
              </h2>
              <div className="space-y-4 text-background/70 font-medium leading-relaxed whitespace-pre-line">
                {data?.legacy?.description || `Fundada por Carlos Santander Sr., piloto con más de 30 años de experiencia...`}
              </div>
              <div className="mt-8">
                <GoldButton href="/reserva">Experimente la Diferencia</GoldButton>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={legacyImage}
                  alt={data?.legacy?.title || "Legado de Aerolíneas Santander"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-champagne/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-white text-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle="Nuestros Valores"
            title="Lo Que Nos Define"
            description="Cada vuelo es una oportunidad de demostrar nuestro compromiso con la excelencia y el servicio personalizado."
            theme="light"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {displayValues.map((value: any) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <div className="h-full rounded-2xl p-8 bg-burgundy/5 border border-burgundy/10 hover:border-burgundy/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
                      <Icon 
                        icon={valueIcons[value.title] || 'ph:star-light'} 
                        className="w-6 h-6 text-background" 
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-background font-bold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-background/80 font-medium leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle="Nuestro Equipo"
            title="Profesionales de Élite"
            description="Un equipo altamente calificado y dedicado a hacer realidad cada viaje con la máxima excelencia."
            theme="light"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {displayTeam.map((member: any) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <GlassCard className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image ? urlFor(member.image).url() : member.image_local || "/images/team/ceo.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-background mb-1">
                    {member.name}
                  </h3>
                  <p className="text-burgundy text-sm">{member.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-burgundy/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-background mb-6">
              ¿Listo para Volar con Nosotros?
            </h2>
            <p className="text-background/70 font-medium mb-8">
              Descubra por qué las personas más exigentes de Latinoamérica
              confían en Aerolíneas Santander para sus viajes privados.
            </p>
            <GoldButton href="/reserva" size="lg">
              Solicitar Cotización
            </GoldButton>
          </motion.div>
        </div>
      </section>
    </article>
  )
}

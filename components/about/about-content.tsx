'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { AnimatedCounter } from './animated-counter'
import { GlassCard } from '@/components/ui/glass-card'
import { GoldButton } from '@/components/ui/gold-button'
import { SectionTitle } from '@/components/ui/section-title'
import {
  fadeInUp,
  staggerContainer,
  slideInFromLeft,
  slideInFromRight,
} from '@/lib/animations'

const stats = [
  { value: 25, suffix: '+', label: 'Años de Experiencia' },
  { value: 15000, suffix: '+', label: 'Vuelos Realizados' },
  { value: 50, suffix: '+', label: 'Destinos Globales' },
  { value: 98, suffix: '%', label: 'Satisfacción' },
]

const values = [
  {
    icon: 'ph:shield-check-light',
    title: 'Seguridad',
    description:
      'La seguridad de nuestros pasajeros es nuestra máxima prioridad. Cumplimos con los más altos estándares internacionales de aviación.',
  },
  {
    icon: 'ph:award-light',
    title: 'Excelencia',
    description:
      'Cada detalle de nuestro servicio está diseñado para superar las expectativas más exigentes de nuestros clientes VIP.',
  },
  {
    icon: 'ph:users-light',
    title: 'Servicio Personal',
    description:
      'Un equipo dedicado de profesionales disponible 24/7 para atender cada necesidad de manera personalizada.',
  },
  {
    icon: 'ph:airplane-light',
    title: 'Flota Premium',
    description:
      'Aeronaves de última generación con mantenimiento riguroso y amenidades de lujo para garantizar vuelos excepcionales.',
  },
]

const team = [
  {
    name: 'Carlos Santander',
    role: 'Director General',
    image: '/images/team/ceo.jpg',
  },
  {
    name: 'María Elena Vásquez',
    role: 'Directora de Operaciones',
    image: '/images/team/operations.jpg',
  },
  {
    name: 'Roberto Mendoza',
    role: 'Jefe de Pilotos',
    image: '/images/team/chief-pilot.jpg',
  },
]

export function AboutContent() {
  return (
    <article>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Historia de Aerolínea Santander"
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
              Nuestra Historia
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl mb-6"
            >
              100% VIP
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-pearl/80 leading-relaxed"
            >
              Desde 1998, Aerolínea Santander ha sido sinónimo de excelencia en
              aviación privada. Fundada con la visión de ofrecer servicios de
              vuelo que superen todas las expectativas.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-28 border-y border-pearl/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
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
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                Nuestro Legado
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
                Tradición de Excelencia en el Cielo
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fundada por Carlos Santander Sr., piloto con más de 30 años de
                  experiencia en aviación comercial y militar, Aerolínea
                  Santander nació con el compromiso de ofrecer servicios de
                  aviación privada sin igual en Latinoamérica.
                </p>
                <p>
                  A lo largo de más de dos décadas, hemos transportado a líderes
                  empresariales, celebridades internacionales y familias
                  distinguidas, siempre manteniendo nuestro compromiso con la
                  seguridad, discreción y el servicio excepcional.
                </p>
                <p>
                  Hoy, bajo la dirección de la segunda generación de la familia
                  Santander, continuamos innovando y expandiendo nuestras
                  operaciones, siempre fieles a los valores que nos fundaron.
                </p>
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
                  src="/images/about-legacy.jpg"
                  alt="Legado de Aerolínea Santander"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-champagne/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle="Nuestros Valores"
            title="Lo Que Nos Define"
            description="Cada vuelo es una oportunidad de demostrar nuestro compromiso con la excelencia y el servicio personalizado."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-champagne/10 flex items-center justify-center shrink-0">
                      <Icon icon={value.icon} className="w-6 h-6 text-champagne" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-pearl mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle="Nuestro Equipo"
            title="Profesionales de Élite"
            description="Un equipo altamente calificado y dedicado a hacer realidad cada viaje con la máxima excelencia."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <GlassCard className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-pearl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-champagne text-sm">{member.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 border-t border-pearl/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
              ¿Listo para Volar con Nosotros?
            </h2>
            <p className="text-muted-foreground mb-8">
              Descubra por qué las personas más exigentes de Latinoamérica
              confían en Aerolínea Santander para sus viajes privados.
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

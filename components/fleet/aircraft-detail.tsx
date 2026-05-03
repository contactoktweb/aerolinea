'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer, slideInFromLeft, slideInFromRight } from '@/lib/animations'

interface AircraftDetailProps {
  aircraft: Aircraft
}

const specIcons = {
  passengers: 'ph:users-light',
  range: 'ph:navigation-arrow-light',
  speed: 'ph:gauge-light',
  altitude: 'ph:mountains-light',
  baggage: 'ph:briefcase-light',
}

const specLabels: Record<string, string> = {
  passengers: 'Pasajeros',
  range: 'Alcance',
  speed: 'Velocidad Máx.',
  altitude: 'Altitud Máx.',
  baggage: 'Equipaje',
}

export function AircraftDetail({ aircraft }: AircraftDetailProps) {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={aircraft.image}
          alt={aircraft.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Back Link */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/flota"
              className="inline-flex items-center gap-2 text-pearl/80 hover:text-champagne transition-colors"
            >
              <Icon icon="ph:arrow-left-light" className="w-4 h-4" />
              <span className="text-sm">Volver a la Flota</span>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-champagne/90 text-background mb-4"
              >
                {categoryLabels[aircraft.category]}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl mb-4"
              >
                {aircraft.name}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-champagne font-light"
              >
                {aircraft.tagline}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-16 lg:py-24 border-b border-pearl/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {Object.entries(aircraft.specs).map(([key, value]) => {
              const iconName = specIcons[key as keyof typeof specIcons]
              return (
                <motion.div key={key} variants={fadeInUp}>
                  <GlassCard hover={false} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-champagne/10 flex items-center justify-center">
                      <Icon icon={iconName} className="w-5 h-5 text-champagne" />
                    </div>
                    <p className="font-mono text-2xl text-pearl mb-1">{value}</p>
                    <p className="text-sm text-muted-foreground">
                      {specLabels[key]}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                Acerca de
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
                Excelencia en Cada Detalle
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {aircraft.description}
              </p>
              <GoldButton href="/reserva" size="lg">
                Reservar Este Jet
              </GoldButton>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={aircraft.interiorImage}
                alt={`Interior del ${aircraft.name}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Características
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-pearl">
              Equipamiento Premium
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aircraft.features.map((feature, index) => (
              <motion.div key={feature} variants={fadeInUp}>
                <GlassCard hover={false} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-champagne/10 flex items-center justify-center shrink-0">
                    <Icon icon="ph:check-light" className="w-4 h-4 text-champagne" />
                  </div>
                  <p className="text-pearl">{feature}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
              ¿Listo para Volar?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contáctenos para reservar el {aircraft.name} o solicitar una
              cotización personalizada para su próximo viaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GoldButton href="/reserva" size="lg">
                Solicitar Reserva
              </GoldButton>
              <GoldButton href="/flota" variant="outline" size="lg">
                Ver Más Aeronaves
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  )
}

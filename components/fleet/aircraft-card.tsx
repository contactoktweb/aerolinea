'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { GoldButton } from '@/components/ui/gold-button'

interface AircraftCardProps {
  aircraft: Aircraft
  index: number
}

export function AircraftCard({ aircraft, index }: AircraftCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/flota/${aircraft.slug}`} className="block">
        <div className="relative glass-card rounded-2xl overflow-hidden">
          {/* Image Section */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={aircraft.image}
              alt={aircraft.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-champagne/90 text-background">
                {categoryLabels[aircraft.category]}
              </span>
            </div>

            {/* Interactive Hotspots */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-champagne/80 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <div className="mb-4">
              <h3 className="font-serif text-2xl text-pearl group-hover:text-champagne transition-colors">
                {aircraft.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {aircraft.tagline}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon icon="ph:users-light" className="w-4 h-4 text-champagne" />
                </div>
                <p className="font-mono text-lg text-pearl">{aircraft.specs.passengers}</p>
                <p className="text-xs text-muted-foreground">Pasajeros</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon icon="ph:navigation-arrow-light" className="w-4 h-4 text-champagne" />
                </div>
                <p className="font-mono text-lg text-pearl">{aircraft.specs.range}</p>
                <p className="text-xs text-muted-foreground">Alcance</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon icon="ph:gauge-light" className="w-4 h-4 text-champagne" />
                </div>
                <p className="font-mono text-lg text-pearl">{aircraft.specs.speed}</p>
                <p className="text-xs text-muted-foreground">Velocidad</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-pearl/10">
              <span className="text-sm text-muted-foreground">
                Ver especificaciones completas
              </span>
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center group-hover:bg-champagne transition-colors">
                <Icon icon="ph:arrow-right-light" className="w-4 h-4 text-champagne group-hover:text-background transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

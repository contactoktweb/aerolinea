'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { GoldButton } from '@/components/ui/gold-button'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/locale-utils'

interface AircraftCardProps {
  aircraft: Aircraft
  index: number
}

export function AircraftCard({ aircraft, index }: AircraftCardProps) {
  const { language, t } = useLanguage()

  const categoryLabelMap = {
    light: t('fleet.light'),
    midsize: t('fleet.midsize'),
    'super-midsize': t('fleet.super_midsize'),
    heavy: t('fleet.heavy'),
    'ultra-long-range': t('fleet.ultra_long_range'),
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/flota/${aircraft.slug}`} className="block">
        <div className="relative bg-white rounded-2xl overflow-hidden border border-burgundy/5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] hover:shadow-[0_30px_70px_rgba(74,14,14,0.12)] transition-all duration-500">
          {/* Image Section */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={aircraft.image}
              alt={aircraft.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-champagne text-background shadow-lg">
                {(categoryLabelMap as any)[aircraft.category] || categoryLabels[aircraft.category]}
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
              <h3 className="font-serif text-2xl text-champagne group-hover:text-champagne/80 transition-colors">
                {getLocaleString(aircraft.name, language)}
              </h3>
              <p className="text-sm text-burgundy/60 font-medium mt-1">
                {getLocaleString(aircraft.tagline, language)}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-burgundy/5 flex items-center justify-center">
                  <Icon icon="ph:users-light" className="w-4 h-4 text-burgundy" />
                </div>
                <p className="font-mono text-lg text-burgundy">{aircraft.specs.passengers}</p>
                <p className="text-xs text-burgundy/50 font-bold uppercase tracking-wider">{t('fleet.specs.passengers')}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-burgundy/5 flex items-center justify-center">
                  <Icon icon="ph:navigation-arrow-light" className="w-4 h-4 text-burgundy" />
                </div>
                <p className="font-mono text-lg text-burgundy">{aircraft.specs.range}</p>
                <p className="text-xs text-burgundy/50 font-bold uppercase tracking-wider">{t('fleet.specs.range')}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-burgundy/5 flex items-center justify-center">
                  <Icon icon="ph:gauge-light" className="w-4 h-4 text-burgundy" />
                </div>
                <p className="font-mono text-lg text-burgundy">{aircraft.specs.speed}</p>
                <p className="text-xs text-burgundy/50 font-bold uppercase tracking-wider">{t('fleet.specs.speed')}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
              <span className="text-sm text-burgundy/50 font-medium">
                {t('fleet.view_specs')}
              </span>
              <div className="w-10 h-10 rounded-full bg-burgundy/5 flex items-center justify-center group-hover:bg-burgundy transition-colors">
                <Icon icon="ph:arrow-right-light" className="w-4 h-4 text-burgundy group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { aircraftData, Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { AircraftCard } from './aircraft-card'
import { SectionTitle } from '@/components/ui/section-title'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/locale-utils'

const categories: Array<Aircraft['category'] | 'all'> = [
  'all',
  'light',
  'midsize',
  'super-midsize',
  'heavy',
  'ultra-long-range',
]

const getCategoryLabelMap = (t: any) => ({
  all: t('fleet.all'),
  light: t('fleet.light'),
  midsize: t('fleet.midsize'),
  'super-midsize': t('fleet.super_midsize'),
  heavy: t('fleet.heavy'),
  'ultra-long-range': t('fleet.ultra_long_range'),
})

export function FleetGallery({ initialData }: { initialData?: any[] }) {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Aircraft['category'] | 'all'>('all')

  const categoryLabelMap = getCategoryLabelMap(t)

  const processedData: any[] = initialData && initialData.length > 0 
    ? initialData.map(a => ({
        id: a._id,
        slug: a.slug,
        name: a.name,
        model: a.model,
        category: a.category,
        tagline: a.tagline,
        description: a.description,
        specs: a.specs,
        features: a.features,
        image: a.image ? (typeof a.image === 'string' ? a.image : urlFor(a.image).url()) : "/images/aircraft/placeholder.jpg",
        interiorImage: a.interiorImage ? (typeof a.interiorImage === 'string' ? a.interiorImage : urlFor(a.interiorImage).url()) : "/images/aircraft/placeholder-interior.jpg",
      }))
    : aircraftData

  const filteredAircraft =
    activeCategory === 'all'
      ? processedData
      : processedData.filter((a) => a.category === activeCategory)

  return (
    <section className="pt-48 lg:pt-56 pb-24 lg:pb-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <SectionTitle
          subtitle={t('fleet.subtitle')}
          title={t('fleet.title')}
          description={t('fleet.description')}
          theme="light"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === category
                  ? 'bg-burgundy text-white shadow-lg shadow-burgundy/10'
                  : 'bg-burgundy/5 text-burgundy/70 hover:text-burgundy hover:bg-burgundy/10 border border-burgundy/10'
              )}
            >
              {(categoryLabelMap as any)[category]}
            </button>
          ))}
        </motion.div>

        {/* Aircraft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAircraft.map((aircraft, index) => (
            <AircraftCard key={aircraft.id} aircraft={aircraft} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAircraft.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-background/60 font-medium">
              {t('fleet.empty')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

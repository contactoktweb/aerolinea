'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { aircraftData, Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { AircraftCard } from './aircraft-card'
import { SectionTitle } from '@/components/ui/section-title'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'

const categories: Array<Aircraft['category'] | 'all'> = [
  'all',
  'light',
  'midsize',
  'super-midsize',
  'heavy',
  'ultra-long-range',
]

const categoryLabelMap: Record<Aircraft['category'] | 'all', string> = {
  all: 'Todos',
  ...categoryLabels,
}

export function FleetGallery({ initialData }: { initialData?: any[] }) {
  const [activeCategory, setActiveCategory] = useState<Aircraft['category'] | 'all'>('all')

  const processedData: Aircraft[] = initialData && initialData.length > 0 
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
        image: a.image ? urlFor(a.image).url() : "/images/aircraft/placeholder.jpg",
        interiorImage: a.interiorImage ? urlFor(a.interiorImage).url() : "/images/aircraft/placeholder-interior.jpg",
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
          subtitle="Nuestra Flota"
          title="Aeronaves de Clase Mundial"
          description="Cada aeronave de nuestra flota ha sido seleccionada por su excelencia en rendimiento, confort y seguridad. Descubra la perfección en aviación privada."
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
              {categoryLabelMap[category]}
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
              No hay aeronaves disponibles en esta categoría.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

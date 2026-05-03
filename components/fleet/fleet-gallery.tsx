'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { aircraftData, Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { AircraftCard } from './aircraft-card'
import { SectionTitle } from '@/components/ui/section-title'
import { cn } from '@/lib/utils'

const categories: Array<Aircraft['category'] | 'all'> = [
  'all',
  'light',
  'midsize',
  'super-midsize',
  'ultra-long-range',
]

const categoryLabelMap: Record<Aircraft['category'] | 'all', string> = {
  all: 'Todos',
  ...categoryLabels,
}

export function FleetGallery() {
  const [activeCategory, setActiveCategory] = useState<Aircraft['category'] | 'all'>('all')

  const filteredAircraft =
    activeCategory === 'all'
      ? aircraftData
      : aircraftData.filter((a) => a.category === activeCategory)

  return (
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <SectionTitle
          subtitle="Nuestra Flota"
          title="Aeronaves de Clase Mundial"
          description="Cada aeronave de nuestra flota ha sido seleccionada por su excelencia en rendimiento, confort y seguridad. Descubra la perfección en aviación privada."
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
                  ? 'bg-champagne text-background'
                  : 'glass-card text-pearl/70 hover:text-pearl hover:bg-card/60'
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
            <p className="text-muted-foreground">
              No hay aeronaves disponibles en esta categoría.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

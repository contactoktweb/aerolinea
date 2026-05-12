'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'

interface StepDestinationProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
}

const popularCities = [
  { code: 'LIM', name: 'Lima', country: 'Perú' },
  { code: 'MIA', name: 'Miami', country: 'EE.UU.' },
  { code: 'NYC', name: 'Nueva York', country: 'EE.UU.' },
  { code: 'BOG', name: 'Bogotá', country: 'Colombia' },
  { code: 'SCL', name: 'Santiago', country: 'Chile' },
  { code: 'MEX', name: 'Ciudad de México', country: 'México' },
  { code: 'MAD', name: 'Madrid', country: 'España' },
  { code: 'SAO', name: 'São Paulo', country: 'Brasil' },
]

export function StepDestination({
  data,
  updateData,
  onNext,
}: StepDestinationProps) {
  const [originSearch, setOriginSearch] = useState(data.origin)
  const [destSearch, setDestSearch] = useState(data.destination)
  const [showOriginDropdown, setShowOriginDropdown] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)

  const filteredOriginCities = popularCities.filter(
    (city) =>
      city.name.toLowerCase().includes(originSearch.toLowerCase()) ||
      city.code.toLowerCase().includes(originSearch.toLowerCase())
  )

  const filteredDestCities = popularCities.filter(
    (city) =>
      city.name.toLowerCase().includes(destSearch.toLowerCase()) ||
      city.code.toLowerCase().includes(destSearch.toLowerCase())
  )

  const isValid = data.origin && data.destination

  const swapLocations = () => {
    const temp = data.origin
    updateData({ origin: data.destination, destination: temp })
    setOriginSearch(data.destination)
    setDestSearch(temp)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase">
          Paso 1 de 4
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-champagne mt-2 mb-4">
          ¿A Dónde Desea Volar?
        </h1>
        <p className="text-burgundy font-medium max-w-lg mx-auto">
          Seleccione su ciudad de origen y destino. Operamos vuelos a más de 50
          destinos en América y Europa.
        </p>
      </div>

      {/* Trip Type */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateData({ tripType: 'one-way' })}
          className={cn(
            'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
            data.tripType === 'one-way'
              ? 'bg-burgundy text-white shadow-[0_0_15px_rgba(74,14,14,0.3)]'
              : 'bg-burgundy/5 text-burgundy/70 hover:text-burgundy border border-burgundy/10'
          )}
        >
          Solo Ida
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateData({ tripType: 'round-trip' })}
          className={cn(
            'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
            data.tripType === 'round-trip'
              ? 'bg-burgundy text-white shadow-[0_0_15px_rgba(74,14,14,0.3)]'
              : 'bg-burgundy/5 text-burgundy/70 hover:text-burgundy border border-burgundy/10'
          )}
        >
          Ida y Vuelta
        </motion.button>
      </div>

      {/* Location Inputs */}
      <GlassCard hover={false} className="p-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Origin */}
          <div className="flex-1 w-full relative">
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              Origen
            </label>
            <div className="relative">
              <Icon icon="ph:map-pin-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={originSearch}
                onChange={(e) => {
                  setOriginSearch(e.target.value)
                  setShowOriginDropdown(true)
                }}
                onFocus={() => setShowOriginDropdown(true)}
                onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                placeholder="Ciudad de origen"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
              {showOriginDropdown && filteredOriginCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden">
                  {filteredOriginCities.map((city) => (
                    <button
                      key={city.code}
                      onClick={() => {
                        updateData({ origin: `${city.name} (${city.code})` })
                        setOriginSearch(`${city.name} (${city.code})`)
                        setShowOriginDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-burgundy/10 transition-colors flex items-center justify-between"
                    >
                      <span className="text-background font-medium">{city.name}</span>
                      <span className="text-sm text-background/50">
                        {city.code} - {city.country}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={swapLocations}
            className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center hover:bg-burgundy/20 transition-colors mt-6 lg:mt-0"
          >
            <Icon icon="ph:arrows-left-right-light" className="w-5 h-5 text-burgundy" />
          </button>

          {/* Destination */}
          <div className="flex-1 w-full relative">
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              Destino
            </label>
            <div className="relative">
              <Icon icon="ph:airplane-takeoff-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={destSearch}
                onChange={(e) => {
                  setDestSearch(e.target.value)
                  setShowDestDropdown(true)
                }}
                onFocus={() => setShowDestDropdown(true)}
                onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                placeholder="Ciudad de destino"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
              {showDestDropdown && filteredDestCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden">
                  {filteredDestCities.map((city) => (
                    <button
                      key={city.code}
                      onClick={() => {
                        updateData({ destination: `${city.name} (${city.code})` })
                        setDestSearch(`${city.name} (${city.code})`)
                        setShowDestDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-burgundy/10 transition-colors flex items-center justify-between"
                    >
                      <span className="text-background font-medium">{city.name}</span>
                      <span className="text-sm text-background/50">
                        {city.code} - {city.country}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation */}
      <div className="flex justify-end">
        <GoldButton onClick={onNext} disabled={!isValid} size="lg">
          Continuar
        </GoldButton>
      </div>
    </div>
  )
}

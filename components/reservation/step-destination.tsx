'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-context'

interface StepDestinationProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
  onBack: () => void
}

const popularCities = [
  { code: 'BOG', name: 'Bogotá', country: 'Colombia' },
  { code: 'MDE', name: 'Medellín', country: 'Colombia' },
  { code: 'CTG', name: 'Cartagena', country: 'Colombia' },
  { code: 'CLO', name: 'Cali', country: 'Colombia' },
  { code: 'LIM', name: 'Lima', country: 'Perú' },
  { code: 'CUZ', name: 'Cusco', country: 'Perú' },
  { code: 'MIA', name: 'Miami', country: 'Estados Unidos' },
  { code: 'NYC', name: 'Nueva York', country: 'Estados Unidos' },
  { code: 'LAX', name: 'Los Ángeles', country: 'Estados Unidos' },
  { code: 'SCL', name: 'Santiago', country: 'Chile' },
  { code: 'MEX', name: 'Ciudad de México', country: 'México' },
  { code: 'CUN', name: 'Cancún', country: 'México' },
  { code: 'MAD', name: 'Madrid', country: 'España' },
  { code: 'BCN', name: 'Barcelona', country: 'España' },
  { code: 'SAO', name: 'São Paulo', country: 'Brasil' },
  { code: 'RIO', name: 'Río de Janeiro', country: 'Brasil' },
  { code: 'EZE', name: 'Buenos Aires', country: 'Argentina' },
  { code: 'UIO', name: 'Quito', country: 'Ecuador' },
  { code: 'GYE', name: 'Guayaquil', country: 'Ecuador' },
  { code: 'PTY', name: 'Ciudad de Panamá', country: 'Panamá' },
  { code: 'LPB', name: 'La Paz', country: 'Bolivia' },
  { code: 'VVI', name: 'Santa Cruz', country: 'Bolivia' },
  { code: 'CCS', name: 'Caracas', country: 'Venezuela' },
  { code: 'SDQ', name: 'Santo Domingo', country: 'República Dominicana' },
  { code: 'SJO', name: 'San José', country: 'Costa Rica' },
  { code: 'GUA', name: 'Ciudad de Guatemala', country: 'Guatemala' },
  { code: 'SAL', name: 'San Salvador', country: 'El Salvador' },
  { code: 'MVD', name: 'Montevideo', country: 'Uruguay' },
  { code: 'ASU', name: 'Asunción', country: 'Paraguay' },
]

export function StepDestination({
  data,
  updateData,
  onNext,
  onBack,
}: StepDestinationProps) {
  const { language, t } = useLanguage()
  const [originSearch, setOriginSearch] = useState(data.origin)
  const [destSearch, setDestSearch] = useState(data.destination)
  const [showOriginDropdown, setShowOriginDropdown] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)

  const getFilteredOriginCities = (searchTerm: string) => {
    let cities = popularCities;
    
    // STRICT FILTER: Only show cities from selected country for Origin
    if (data.country) {
      cities = cities.filter(c => c.country === data.country);
    }

    if (searchTerm) {
      cities = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Dynamic fallback if no cities exist for this country
    if (cities.length === 0 && data.country && !searchTerm) {
       cities = [
         { code: 'VIP', name: `${t('booking.steps.destination.any_city')} ${data.country}`, country: data.country }
       ];
    }

    return cities;
  };

  const getFilteredDestCities = (searchTerm: string) => {
    let cities = popularCities;

    if (searchTerm) {
      cities = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return cities;
  };

  const filteredOriginCities = getFilteredOriginCities(originSearch);
  const filteredDestCities = getFilteredDestCities(destSearch);

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
        <span className="text-champagne text-sm font-bold tracking-[0.2em] uppercase">
          {t('booking.step')} 2 {t('booking.of')} 5
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-champagne mt-2 mb-4">
          {t('booking.steps.destination.question')}
        </h1>
        <p className="text-burgundy font-medium max-w-lg mx-auto">
          {t('booking.steps.destination.sub')}
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
          {t('booking.steps.destination.one_way')}
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
          {t('booking.steps.destination.round_trip')}
        </motion.button>
      </div>

      {/* Location Inputs */}
      <GlassCard variant="light" hover={false} className="p-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Origin */}
          <div className="flex-1 w-full relative">
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              {t('booking.steps.destination.origin_label')}
            </label>
            <div className="relative">
              <Icon icon="ph:map-pin-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={originSearch}
                onChange={(e) => {
                  setOriginSearch(e.target.value)
                  updateData({ origin: e.target.value })
                  setShowOriginDropdown(true)
                }}
                onFocus={() => setShowOriginDropdown(true)}
                onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                placeholder={t('booking.steps.destination.origin_placeholder')}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
              {showOriginDropdown && (filteredOriginCities.length > 0 || originSearch) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-burgundy/10 rounded-xl shadow-xl z-10 overflow-hidden max-h-60 overflow-y-auto">
                  {filteredOriginCities.map((city) => (
                    <button
                      key={city.code}
                      onClick={() => {
                        updateData({ origin: `${city.name} (${city.code})` })
                        setOriginSearch(`${city.name} (${city.code})`)
                        setShowOriginDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-burgundy/5 transition-colors flex items-center justify-between"
                    >
                      <span className="text-burgundy font-medium">{city.name}</span>
                      <span className="text-sm text-burgundy/60">
                        {city.code} - {city.country}
                      </span>
                    </button>
                  ))}
                  {originSearch && !filteredOriginCities.some(c => `${c.name} (${c.code})` === originSearch) && (
                    <button
                      onClick={() => {
                        updateData({ origin: originSearch })
                        setOriginSearch(originSearch)
                        setShowOriginDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left bg-burgundy/5 hover:bg-burgundy/10 transition-colors border-t border-burgundy/10 flex items-center gap-3"
                    >
                      <Icon icon="ph:map-pin-line-bold" className="w-5 h-5 text-burgundy" />
                      <div>
                        <span className="text-burgundy font-medium block">{t('booking.steps.destination.use_prefix')} "{originSearch}"</span>
                        <span className="text-[10px] text-burgundy/60 uppercase font-bold">{t('booking.steps.destination.custom_note')}</span>
                      </div>
                    </button>
                  )}
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
              {t('booking.steps.destination.dest_label')}
            </label>
            <div className="relative">
              <Icon icon="ph:airplane-takeoff-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={destSearch}
                onChange={(e) => {
                  setDestSearch(e.target.value)
                  updateData({ destination: e.target.value })
                  setShowDestDropdown(true)
                }}
                onFocus={() => setShowDestDropdown(true)}
                onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                placeholder={t('booking.steps.destination.dest_placeholder')}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
              {showDestDropdown && (filteredDestCities.length > 0 || destSearch) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-burgundy/10 rounded-xl shadow-xl z-10 overflow-hidden max-h-60 overflow-y-auto">
                  {filteredDestCities.map((city) => (
                    <button
                      key={city.code}
                      onClick={() => {
                        updateData({ destination: `${city.name} (${city.code})` })
                        setDestSearch(`${city.name} (${city.code})`)
                        setShowDestDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-burgundy/5 transition-colors flex items-center justify-between"
                    >
                      <span className="text-burgundy font-medium">{city.name}</span>
                      <span className="text-sm text-burgundy/60">
                        {city.code} - {city.country}
                      </span>
                    </button>
                  ))}
                  {destSearch && !filteredDestCities.some(c => `${c.name} (${c.code})` === destSearch) && (
                    <button
                      onClick={() => {
                        updateData({ destination: destSearch })
                        setDestSearch(destSearch)
                        setShowDestDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left bg-burgundy/5 hover:bg-burgundy/10 transition-colors border-t border-burgundy/10 flex items-center gap-3"
                    >
                      <Icon icon="ph:map-pin-line-bold" className="w-5 h-5 text-burgundy" />
                      <div>
                        <span className="text-burgundy font-medium block">{t('booking.steps.destination.use_prefix')} "{destSearch}"</span>
                        <span className="text-[10px] text-burgundy/60 uppercase font-bold">{t('booking.steps.destination.custom_note')}</span>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="text-burgundy/40 hover:text-burgundy text-sm uppercase tracking-[0.2em] font-bold transition-colors"
        >
          {t('booking.back')}
        </button>
        <GoldButton onClick={onNext} disabled={!isValid} size="lg">
          {t('booking.continue')}
        </GoldButton>
      </div>
    </div>
  )
}

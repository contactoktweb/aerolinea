'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-context'

interface StepServiceProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
  onBack: () => void
}

const getServices = (t: any) => [
  {
    id: 'private',
    icon: 'ph:airplane-light',
    title: t('booking.steps.service.types.private.title'),
    description: t('booking.steps.service.types.private.desc'),
    features: [
      t('booking.steps.service.types.private.features.1'),
      t('booking.steps.service.types.private.features.2'),
      t('booking.steps.service.types.private.features.3'),
    ],
  },
  {
    id: 'charter',
    icon: 'ph:clock-light',
    title: t('booking.steps.service.types.charter.title'),
    description: t('booking.steps.service.types.charter.desc'),
    features: [
      t('booking.steps.service.types.charter.features.1'),
      t('booking.steps.service.types.charter.features.2'),
      t('booking.steps.service.types.charter.features.3'),
    ],
  },
  {
    id: 'ambulance',
    icon: 'ph:heart-light',
    title: t('booking.steps.service.types.ambulance.title'),
    description: t('booking.steps.service.types.ambulance.desc'),
    features: [
      t('booking.steps.service.types.ambulance.features.1'),
      t('booking.steps.service.types.ambulance.features.2'),
      t('booking.steps.service.types.ambulance.features.3'),
    ],
  },
  {
    id: 'cargo',
    icon: 'ph:package-light',
    title: t('booking.steps.service.types.cargo.title'),
    description: t('booking.steps.service.types.cargo.desc'),
    features: [
      t('booking.steps.service.types.cargo.features.1'),
      t('booking.steps.service.types.cargo.features.2'),
      t('booking.steps.service.types.cargo.features.3'),
    ],
  },
]

const getAircraftOptions = (t: any) => [
  { id: 'any', name: t('booking.steps.service.aircraft.any.name'), description: t('booking.steps.service.aircraft.any.desc') },
  { id: 'light', name: t('booking.steps.service.aircraft.light.name'), description: 'Phenom 300E, Learjet 75' },
  { id: 'midsize', name: t('booking.steps.service.aircraft.midsize.name'), description: 'Hawker 800XP' },
  { id: 'super-midsize', name: t('booking.steps.service.aircraft.super_midsize.name'), description: 'Citation X, Challenger 350' },
  { id: 'ultra-long-range', name: t('booking.steps.service.aircraft.ultra_long_range.name'), description: 'G650, Falcon 8X' },
]

export function StepService({
  data,
  updateData,
  onNext,
  onBack,
}: StepServiceProps) {
  const { language, t } = useLanguage()
  const isValid = data.serviceType && data.aircraftPreference

  const services = getServices(t)
  const aircraftOptions = getAircraftOptions(t)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-champagne text-sm font-bold tracking-[0.2em] uppercase">
          {t('booking.step')} 4 {t('booking.of')} 5
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-champagne mt-2 mb-4">
          {t('booking.steps.service.title')}
        </h1>
        <p className="text-burgundy font-medium max-w-lg mx-auto">
          {t('booking.steps.service.sub')}
        </p>
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.button
            key={service.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateData({ serviceType: service.id })}
            className="text-left h-full"
          >
            <GlassCard
              variant="light"
              hover={false}
              className={cn(
                'h-full transition-all duration-300',
                data.serviceType === service.id
                  ? 'ring-2 ring-burgundy bg-burgundy/10 shadow-[0_0_20px_rgba(74,14,14,0.2)]'
                  : 'hover:bg-burgundy/5'
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
                    data.serviceType === service.id
                      ? 'bg-burgundy scale-110'
                      : 'bg-burgundy/10'
                  )}
                >
                  <Icon
                    icon={service.icon}
                    className={cn(
                      'w-5 h-5 transition-colors',
                      data.serviceType === service.id
                        ? 'text-white'
                        : 'text-burgundy'
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg text-champagne font-bold">
                      {service.title}
                    </h3>
                    {data.serviceType === service.id && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-burgundy flex items-center justify-center"
                      >
                        <Icon icon="ph:check-light" className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-burgundy/60 font-medium mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-colors",
                          data.serviceType === service.id
                            ? "bg-burgundy/20 text-burgundy"
                            : "bg-burgundy/5 text-burgundy/50"
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.button>
        ))}
      </div>

      {/* Aircraft Preference */}
      <GlassCard variant="light" hover={false} className="p-6">
        <h3 className="font-serif text-xl text-champagne mb-4">
          {t('booking.steps.service.aircraft_label')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {aircraftOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => updateData({ aircraftPreference: option.id })}
              className={cn(
                'p-4 rounded-xl text-left transition-all duration-300 shadow-lg',
                data.aircraftPreference === option.id
                  ? 'bg-burgundy text-white'
                  : 'bg-burgundy/5 hover:bg-burgundy/10'
              )}
            >
              <p
                className={cn(
                  'font-bold text-sm',
                  data.aircraftPreference === option.id
                    ? 'text-white'
                    : 'text-background'
                )}
              >
                {option.name}
              </p>
              <p
                className={cn(
                  'text-[11px] mt-1 leading-tight',
                  data.aircraftPreference === option.id
                    ? 'text-white/80'
                    : 'text-background/60'
                )}
              >
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Navigation */}
      <div className="flex justify-between">
        <GoldButton onClick={onBack} variant="outline" size="lg">
          {t('booking.back')}
        </GoldButton>
        <GoldButton onClick={onNext} disabled={!isValid} size="lg">
          {t('booking.continue')}
        </GoldButton>
      </div>
    </div>
  )
}

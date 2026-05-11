'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'

interface StepServiceProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
  onBack: () => void
}

const services = [
  {
    id: 'private',
    icon: 'ph:airplane-light',
    title: 'Vuelo Privado',
    description:
      'Vuelo ejecutivo con total privacidad y flexibilidad. Ideal para viajes de negocios o placer.',
    features: ['Máxima privacidad', 'Horarios flexibles', 'Servicio personalizado'],
  },
  {
    id: 'charter',
    icon: 'ph:clock-light',
    title: 'Vuelo Chárter',
    description:
      'Disponibilidad inmediata 24/7 para vuelos bajo demanda. Perfectos para viajes de última hora.',
    features: ['Disponible 24/7', 'Respuesta rápida', 'Sin reserva previa'],
  },
  {
    id: 'ambulance',
    icon: 'ph:heart-light',
    title: 'Ambulancia Aérea',
    description:
      'Traslados médicos de emergencia con equipamiento especializado y personal médico certificado.',
    features: ['Equipo médico a bordo', 'Personal certificado', 'Respuesta urgente'],
  },
  {
    id: 'cargo',
    icon: 'ph:package-light',
    title: 'Carga Aérea',
    description:
      'Transporte de carga sensible y valiosa con máxima seguridad y seguimiento en tiempo real.',
    features: ['Alta seguridad', 'Seguimiento GPS', 'Entrega garantizada'],
  },
]

const aircraftOptions = [
  { id: 'any', name: 'Sin preferencia', description: 'Le recomendaremos el mejor' },
  { id: 'light', name: 'Jet Ligero', description: 'Phenom 300E, Learjet 75' },
  { id: 'midsize', name: 'Jet Mediano', description: 'Hawker 800XP' },
  { id: 'super-midsize', name: 'Jet Super Mediano', description: 'Citation X, Challenger 350' },
  { id: 'ultra-long-range', name: 'Ultra Largo Alcance', description: 'G650, Falcon 8X' },
]

export function StepService({
  data,
  updateData,
  onNext,
  onBack,
}: StepServiceProps) {
  const isValid = data.serviceType && data.aircraftPreference

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase">
          Paso 3 de 4
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-pearl mt-2 mb-4">
          Tipo de Servicio
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Seleccione el tipo de servicio que mejor se adapte a sus necesidades.
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
              hover={false}
              className={cn(
                'h-full transition-all duration-300',
                data.serviceType === service.id
                  ? 'ring-2 ring-champagne bg-card/80 shadow-[0_0_20px_rgba(212,196,131,0.2)]'
                  : 'hover:bg-card/40'
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
                    data.serviceType === service.id
                      ? 'bg-champagne scale-110'
                      : 'bg-champagne/10'
                  )}
                >
                  <Icon
                    icon={service.icon}
                    className={cn(
                      'w-5 h-5 transition-colors',
                      data.serviceType === service.id
                        ? 'text-background'
                        : 'text-champagne'
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg text-pearl font-bold">
                      {service.title}
                    </h3>
                    {data.serviceType === service.id && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-champagne flex items-center justify-center"
                      >
                        <Icon icon="ph:check-light" className="w-4 h-4 text-background" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-colors",
                          data.serviceType === service.id
                            ? "bg-background/20 text-background"
                            : "bg-muted text-pearl/50"
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
      <GlassCard hover={false} className="p-6">
        <h3 className="font-serif text-xl text-pearl mb-4">
          Preferencia de Aeronave
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
                  ? 'bg-champagne text-background'
                  : 'bg-muted hover:bg-muted/80'
              )}
            >
              <p
                className={cn(
                  'font-bold text-sm',
                  data.aircraftPreference === option.id
                    ? 'text-background'
                    : 'text-pearl'
                )}
              >
                {option.name}
              </p>
              <p
                className={cn(
                  'text-[11px] mt-1 leading-tight',
                  data.aircraftPreference === option.id
                    ? 'text-background/80'
                    : 'text-muted-foreground'
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
          Atrás
        </GoldButton>
        <GoldButton onClick={onNext} disabled={!isValid} size="lg">
          Continuar
        </GoldButton>
      </div>
    </div>
  )
}

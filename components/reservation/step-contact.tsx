'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'

interface StepContactProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onSubmit: () => void
  onBack: () => void
}

export function StepContact({
  data,
  updateData,
  onSubmit,
  onBack,
}: StepContactProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^[\d\s+()-]{8,}$/.test(phone)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido'
    }

    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = 'Teléfono inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit()
    }
  }

  const isValid = data.fullName && data.email && data.phone

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase">
          Paso 4 de 4
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-champagne mt-2 mb-4">
          Información de Contacto
        </h1>
        <p className="text-burgundy font-medium max-w-lg mx-auto">
          Complete sus datos para que nuestro equipo VIP pueda contactarle con
          su cotización personalizada.
        </p>
      </div>

      {/* Contact Form */}
      <GlassCard hover={false} className="p-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              Nombre Completo *
            </label>
            <div className="relative">
              <Icon icon="ph:user-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => updateData({ fullName: e.target.value })}
                placeholder="Ingrese su nombre completo"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
            </div>
            {errors.fullName && (
              <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
                Email *
              </label>
              <div className="relative">
                <Icon icon="ph:envelope-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="su@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
                Teléfono *
              </label>
              <div className="relative">
                <Icon icon="ph:phone-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="+51 999 999 999"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              Empresa (Opcional)
            </label>
            <div className="relative">
              <Icon icon="ph:buildings-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateData({ company: e.target.value })}
                placeholder="Nombre de su empresa"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              Solicitudes Especiales (Opcional)
            </label>
            <div className="relative">
              <Icon icon="ph:chat-teardrop-dots-light" className="absolute left-4 top-4 w-5 h-5 text-burgundy" />
              <textarea
                value={data.specialRequests}
                onChange={(e) => updateData({ specialRequests: e.target.value })}
                placeholder="¿Tiene alguna solicitud especial? Catering, transporte terrestre, etc."
                rows={4}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50 resize-none"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Privacy Notice */}
      <p className="text-sm text-background/50 font-medium text-center">
        Al enviar este formulario, acepta nuestra{' '}
        <a href="#" className="text-burgundy hover:underline font-bold">
          Política de Privacidad
        </a>{' '}
        y{' '}
        <a href="#" className="text-burgundy hover:underline font-bold">
          Términos de Servicio
        </a>
        .
      </p>

      {/* Navigation */}
      <div className="flex justify-between">
        <GoldButton onClick={onBack} variant="outline" size="lg">
          Atrás
        </GoldButton>
        <GoldButton onClick={handleSubmit} disabled={!isValid} size="lg">
          Enviar Solicitud
        </GoldButton>
      </div>
    </div>
  )
}

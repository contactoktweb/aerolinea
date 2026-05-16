'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { useLanguage } from '@/context/language-context'

interface StepContactProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export function StepContact({
  data,
  updateData,
  onSubmit,
  onBack,
  isSubmitting = false,
}: StepContactProps) {
  const { language, t } = useLanguage()
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
      newErrors.fullName = t('booking.steps.contact.errors.name_required')
    }

    if (!data.email.trim()) {
      newErrors.email = t('booking.steps.contact.errors.email_required')
    } else if (!validateEmail(data.email)) {
      newErrors.email = t('booking.steps.contact.errors.email_invalid')
    }

    if (!data.phone.trim()) {
      newErrors.phone = t('booking.steps.contact.errors.phone_required')
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = t('booking.steps.contact.errors.phone_invalid')
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
        <span className="text-champagne text-sm font-bold tracking-[0.2em] uppercase">
          {t('booking.step')} 5 {t('booking.of')} 5
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-champagne mt-2 mb-4">
          {t('booking.steps.contact.title')}
        </h1>
        <p className="text-burgundy font-medium max-w-lg mx-auto">
          {t('booking.steps.contact.sub')}
        </p>
      </div>

      {/* Contact Form */}
      <GlassCard variant="light" hover={false} className="p-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              {t('booking.steps.contact.labels.name')} *
            </label>
            <div className="relative">
              <Icon icon="ph:user-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => updateData({ fullName: e.target.value })}
                placeholder={t('booking.steps.contact.placeholders.name')}
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
                {t('booking.steps.contact.labels.email')} *
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
                {t('booking.steps.contact.labels.phone')} *
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
              {t('booking.steps.contact.labels.company')}
            </label>
            <div className="relative">
              <Icon icon="ph:buildings-light" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burgundy" />
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateData({ company: e.target.value })}
                placeholder={t('booking.steps.contact.placeholders.company')}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm text-background/70 font-bold uppercase tracking-wider mb-2">
              {t('booking.steps.contact.labels.requests')}
            </label>
            <div className="relative">
              <Icon icon="ph:chat-teardrop-dots-light" className="absolute left-4 top-4 w-5 h-5 text-burgundy" />
              <textarea
                value={data.specialRequests}
                onChange={(e) => updateData({ specialRequests: e.target.value })}
                placeholder={t('booking.steps.contact.placeholders.requests')}
                rows={4}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-burgundy/5 border border-burgundy/10 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-burgundy/50 resize-none"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Privacy Notice */}
      <p className="text-sm text-background/50 font-medium text-center">
        {t('booking.steps.contact.privacy.text')}{' '}
        <a href="#" className="text-burgundy hover:underline font-bold">
          {t('booking.steps.contact.privacy.link_1')}
        </a>{' '}
        {t('booking.steps.contact.privacy.and')}{' '}
        <a href="#" className="text-burgundy hover:underline font-bold">
          {t('booking.steps.contact.privacy.link_2')}
        </a>
        .
      </p>

      {/* Navigation */}
      <div className="flex justify-between">
        <GoldButton onClick={onBack} variant="outline" size="lg" disabled={isSubmitting}>
          {t('booking.back')}
        </GoldButton>
        <GoldButton onClick={handleSubmit} disabled={!isValid || isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Icon icon="ph:circle-notch-bold" className="w-5 h-5 animate-spin mr-2" />
              {t('booking.steps.contact.submitting')}
            </>
          ) : (
            t('booking.steps.contact.submit')
          )}
        </GoldButton>
      </div>
    </div>
  )
}

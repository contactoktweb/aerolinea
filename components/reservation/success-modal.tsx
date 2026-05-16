'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { format } from 'date-fns'
import { es, enUS, fr } from 'date-fns/locale'
import { useLanguage } from '@/context/language-context'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  data: ReservationData
}

export function SuccessModal({ isOpen, onClose, data }: SuccessModalProps) {
  const { language, t } = useLanguage()

  const getDateLocale = () => {
    switch (language) {
      case 'en': return enUS
      case 'fr': return fr
      default: return es
    }
  }

  const dateLocale = getDateLocale()
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg glass-card rounded-2xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Icon icon="ph:x-light" className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Success Icon */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-champagne/20 flex items-center justify-center"
              >
                <Icon icon="ph:check-circle-light" className="w-10 h-10 text-champagne" />
              </motion.div>
              <h2 className="font-serif text-2xl lg:text-3xl text-champagne mb-2">
                {t('booking.success.title')}
              </h2>
              <p className="text-burgundy font-medium">
                {t('booking.success.sub')}
              </p>
            </div>

            {/* Reservation Summary */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6 space-y-4">
              <h3 className="font-medium text-champagne text-sm uppercase tracking-wider">
                {t('booking.success.summary_title')}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.route_label')}:</span>
                  <span className="text-pearl">
                    {data.origin} → {data.destination}
                  </span>
                </div>
                {data.departureDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('booking.success.date_label')}:</span>
                    <span className="text-pearl">
                      {format(data.departureDate, t('booking.steps.logistics.date_format'), {
                        locale: dateLocale,
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.passengers_label')}:</span>
                  <span className="text-pearl">{data.passengers}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-medium text-champagne text-sm uppercase tracking-wider">
                {t('booking.success.next_steps_title')}
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:clock-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-burgundy font-bold text-sm">{t('booking.success.steps.1.title')}</p>
                  <p className="text-burgundy/60 text-xs font-medium">
                    {t('booking.success.steps.1.desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:phone-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-burgundy font-bold text-sm">{t('booking.success.steps.2.title')}</p>
                  <p className="text-burgundy/60 text-xs font-medium">
                    {t('booking.success.steps.2.desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:envelope-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-burgundy font-bold text-sm">{t('booking.success.steps.3.title')}</p>
                  <p className="text-burgundy/60 text-xs font-medium">
                    {t('booking.success.steps.3.desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <GoldButton onClick={onClose} className="flex-1">
                {t('booking.success.cta_close')}
              </GoldButton>
              <GoldButton href="/" variant="outline" className="flex-1">
                {t('booking.success.cta_home')}
              </GoldButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

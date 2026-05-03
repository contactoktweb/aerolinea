'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  data: ReservationData
}

export function SuccessModal({ isOpen, onClose, data }: SuccessModalProps) {
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
              <h2 className="font-serif text-2xl lg:text-3xl text-pearl mb-2">
                ¡Solicitud Recibida!
              </h2>
              <p className="text-muted-foreground">
                Gracias por elegir Aerolínea Santander
              </p>
            </div>

            {/* Reservation Summary */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6 space-y-4">
              <h3 className="font-medium text-pearl text-sm uppercase tracking-wider">
                Resumen de su Solicitud
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ruta:</span>
                  <span className="text-pearl">
                    {data.origin} → {data.destination}
                  </span>
                </div>
                {data.departureDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="text-pearl">
                      {format(data.departureDate, "d 'de' MMMM, yyyy", {
                        locale: es,
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pasajeros:</span>
                  <span className="text-pearl">{data.passengers}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-medium text-pearl text-sm uppercase tracking-wider">
                Próximos Pasos
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:clock-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-pearl text-sm">Respuesta en menos de 1 hora</p>
                  <p className="text-muted-foreground text-xs">
                    Nuestro equipo VIP revisará su solicitud
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:phone-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-pearl text-sm">Llamada de confirmación</p>
                  <p className="text-muted-foreground text-xs">
                    Le contactaremos para confirmar detalles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:envelope-light" className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="text-pearl text-sm">Cotización personalizada</p>
                  <p className="text-muted-foreground text-xs">
                    Recibirá su propuesta por email
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <GoldButton onClick={onClose} className="flex-1">
                Entendido
              </GoldButton>
              <GoldButton href="/" variant="outline" className="flex-1">
                Volver al Inicio
              </GoldButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

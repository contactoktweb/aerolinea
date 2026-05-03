'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ReservationData } from './reservation-form'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
} from 'date-fns'
import { es } from 'date-fns/locale'

interface StepLogisticsProps {
  data: ReservationData
  updateData: (updates: Partial<ReservationData>) => void
  onNext: () => void
  onBack: () => void
}

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
]

export function StepLogistics({
  data,
  updateData,
  onNext,
  onBack,
}: StepLogisticsProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingReturn, setSelectingReturn] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const firstDayOfMonth = monthStart.getDay()
  const paddingDays = Array(firstDayOfMonth).fill(null)

  const handleDateClick = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return

    if (data.tripType === 'round-trip' && selectingReturn) {
      if (data.departureDate && isBefore(date, data.departureDate)) return
      updateData({ returnDate: date })
      setSelectingReturn(false)
    } else {
      updateData({ departureDate: date, returnDate: null })
      if (data.tripType === 'round-trip') {
        setSelectingReturn(true)
      }
    }
  }

  const isValid =
    data.departureDate &&
    data.departureTime &&
    data.passengers > 0 &&
    (data.tripType === 'one-way' || data.returnDate)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase">
          Paso 2 de 4
        </span>
        <h1 className="font-serif text-3xl lg:text-4xl text-pearl mt-2 mb-4">
          Detalles del Vuelo
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Seleccione la fecha, hora y número de pasajeros para su vuelo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon icon="ph:caret-left-light" className="w-5 h-5 text-pearl" />
            </button>
            <h3 className="font-serif text-lg text-pearl capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h3>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon icon="ph:caret-right-light" className="w-5 h-5 text-pearl" />
            </button>
          </div>

          {data.tripType === 'round-trip' && (
            <div className="mb-4 text-center text-sm text-muted-foreground">
              {selectingReturn
                ? 'Seleccione fecha de regreso'
                : 'Seleccione fecha de salida'}
            </div>
          )}

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {paddingDays.map((_, index) => (
              <div key={`pad-${index}`} />
            ))}
            {days.map((day) => {
              const isDisabled = isBefore(day, startOfDay(new Date()))
              const isDeparture = data.departureDate && isSameDay(day, data.departureDate)
              const isReturn = data.returnDate && isSameDay(day, data.returnDate)
              const isInRange =
                data.departureDate &&
                data.returnDate &&
                day > data.departureDate &&
                day < data.returnDate

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled}
                  className={cn(
                    'aspect-square rounded-lg text-sm transition-all',
                    isDisabled
                      ? 'text-muted-foreground/30 cursor-not-allowed'
                      : 'hover:bg-muted',
                    isToday(day) && 'ring-1 ring-champagne/50',
                    isDeparture && 'bg-champagne text-background font-medium',
                    isReturn && 'bg-champagne text-background font-medium',
                    isInRange && 'bg-champagne/20',
                    !isDeparture && !isReturn && !isDisabled && 'text-pearl'
                  )}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>

          {/* Selected Dates Display */}
          <div className="mt-6 pt-4 border-t border-pearl/10 space-y-2">
            {data.departureDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Salida:</span>
                <span className="text-pearl">
                  {format(data.departureDate, "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
            )}
            {data.returnDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Regreso:</span>
                <span className="text-pearl">
                  {format(data.returnDate, "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Time and Passengers */}
        <div className="space-y-6">
          {/* Time Selection */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center">
                <Icon icon="ph:clock-light" className="w-5 h-5 text-champagne" />
              </div>
              <div>
                <h3 className="font-medium text-pearl">Hora de Salida</h3>
                <p className="text-sm text-muted-foreground">
                  Seleccione su hora preferida
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => updateData({ departureTime: time })}
                  className={cn(
                    'py-2 rounded-lg text-sm transition-all',
                    data.departureTime === time
                      ? 'bg-champagne text-background font-medium'
                      : 'bg-muted text-pearl/70 hover:text-pearl hover:bg-muted/80'
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Passengers */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center">
                <Icon icon="ph:users-light" className="w-5 h-5 text-champagne" />
              </div>
              <div>
                <h3 className="font-medium text-pearl">Pasajeros</h3>
                <p className="text-sm text-muted-foreground">
                  Máximo 19 pasajeros
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  updateData({ passengers: Math.max(1, data.passengers - 1) })
                }
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-champagne/20 transition-colors"
              >
                <Icon icon="ph:minus-light" className="w-5 h-5 text-pearl" />
              </button>
              <span className="font-mono text-4xl text-champagne w-16 text-center">
                {data.passengers}
              </span>
              <button
                onClick={() =>
                  updateData({ passengers: Math.min(19, data.passengers + 1) })
                }
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-champagne/20 transition-colors"
              >
                <Icon icon="ph:plus-light" className="w-5 h-5 text-pearl" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

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

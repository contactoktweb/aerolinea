'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

interface Step {
  id: number
  title: string
  description: string
}

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: Step[]
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border-b border-burgundy/10">
      {/* Thin Progress Line */}
      <div className="h-1 bg-burgundy/5 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-burgundy"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'flex items-center gap-3',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                  currentStep > step.id
                    ? 'bg-burgundy shadow-[0_0_10px_rgba(74,14,14,0.3)]'
                    : currentStep === step.id
                    ? 'bg-burgundy/10 border-2 border-burgundy'
                    : 'bg-burgundy/5 border-2 border-burgundy/5'
                )}
              >
                {currentStep > step.id ? (
                  <Icon icon="ph:check-light" className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={cn(
                      'font-mono text-sm',
                      currentStep === step.id
                        ? 'text-champagne'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.id}
                  </span>
                )}
              </div>

              {/* Step Info (hidden on mobile) */}
              <div className="hidden md:block">
                <p
                  className={cn(
                    'text-sm font-bold',
                    currentStep >= step.id ? 'text-champagne' : 'text-champagne/30'
                  )}
                >
                  {step.title}
                </p>
                <p className={cn(
                  "text-xs font-bold",
                  currentStep >= step.id ? "text-burgundy" : "text-burgundy/30"
                )}>{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-burgundy/5 mx-4 hidden md:block">
                  <motion.div
                    className="h-full bg-burgundy"
                    initial={{ width: 0 }}
                    animate={{
                      width: currentStep > step.id ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

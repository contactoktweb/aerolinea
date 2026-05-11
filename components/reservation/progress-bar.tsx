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
    <div className="w-full bg-background/80 backdrop-blur-xl border-b border-pearl/5">
      {/* Thin Progress Line */}
      <div className="h-1 bg-muted relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-champagne"
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
                    ? 'bg-champagne'
                    : currentStep === step.id
                    ? 'bg-champagne/20 border-2 border-champagne'
                    : 'bg-muted border-2 border-muted'
                )}
              >
                {currentStep > step.id ? (
                  <Icon icon="ph:check-light" className="w-5 h-5 text-background" />
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
                    'text-sm font-medium',
                    currentStep >= step.id ? 'text-pearl' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-muted mx-4 hidden md:block">
                  <motion.div
                    className="h-full bg-champagne"
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

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StepCountry } from './step-country'
import { StepDestination } from './step-destination'
import { StepLogistics } from './step-logistics'
import { StepService } from './step-service'
import { StepContact } from './step-contact'
import { ProgressBar } from './progress-bar'
import { SuccessModal } from './success-modal'

export interface ReservationData {
  // Step 1: Country
  country: string

  // Step 2: Destination
  origin: string
  destination: string
  tripType: 'one-way' | 'round-trip'
  
  // Step 3: Logistics
  departureDate: Date | null
  returnDate: Date | null
  departureTime: string
  passengers: number
  
  // Step 4: Service
  serviceType: string
  aircraftPreference: string
  
  // Step 5: Contact
  fullName: string
  email: string
  phone: string
  company: string
  specialRequests: string
}

const initialData: ReservationData = {
  country: '',
  origin: '',
  destination: '',
  tripType: 'one-way',
  departureDate: null,
  returnDate: null,
  departureTime: '',
  passengers: 1,
  serviceType: '',
  aircraftPreference: '',
  fullName: '',
  email: '',
  phone: '',
  company: '',
  specialRequests: '',
}

const steps = [
  { id: 1, title: 'País', description: 'Selección de origen' },
  { id: 2, title: 'Destino', description: 'Origen y destino' },
  { id: 3, title: 'Logística', description: 'Fecha y pasajeros' },
  { id: 4, title: 'Servicio', description: 'Tipo de vuelo' },
  { id: 5, title: 'Contacto', description: 'Sus datos' },
]

export function ReservationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<ReservationData>(initialData)
  const [showSuccess, setShowSuccess] = useState(false)

  const updateData = (updates: Partial<ReservationData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would send data to a backend
    setShowSuccess(true)
  }

  const resetForm = () => {
    setData(initialData)
    setCurrentStep(1)
    setShowSuccess(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed/Sticky Navigation Layer */}
      <div className="fixed top-[112px] md:top-[144px] left-0 right-0 z-[150] pt-6 md:pt-10 bg-white/80 backdrop-blur-sm">
        <ProgressBar currentStep={currentStep} totalSteps={5} steps={steps} />
      </div>

      {/* Form Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-[220px] md:pt-[280px] pb-20 px-4 lg:px-8">
        <div className="w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
             {currentStep === 1 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepCountry
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepDestination
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepLogistics
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepService
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepContact
                  data={data}
                  updateData={updateData}
                  onSubmit={handleSubmit}
                  onBack={prevStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={resetForm}
        data={data}
      />
    </div>
  )
}

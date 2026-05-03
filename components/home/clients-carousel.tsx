'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animations'

// Mock client logos - representing luxury brands and corporations
const clients = [
  { name: 'Corporacion Andina', initials: 'CA' },
  { name: 'Grupo Minero Sur', initials: 'GMS' },
  { name: 'Banco Continental', initials: 'BC' },
  { name: 'Energia Nacional', initials: 'EN' },
  { name: 'Industrias del Pacifico', initials: 'IP' },
  { name: 'Textiles Premium', initials: 'TP' },
  { name: 'Constructora Andes', initials: 'CAN' },
  { name: 'Farmaceutica Global', initials: 'FG' },
]

// Duplicate for seamless infinite scroll
const allClients = [...clients, ...clients]

export function ClientsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="py-20 lg:py-28 border-t border-pearl/5 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '200%' }}
        viewport={{ once: true }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute top-1/2 left-0 w-20 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ y }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs uppercase tracking-widest mb-4">
            Confian en Nosotros
          </span>
          <h3 className="font-serif text-2xl lg:text-3xl text-pearl mt-3">
            Empresas Lideres de Latinoamerica
          </h3>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Content */}
        <div className="flex animate-scroll-left">
          {allClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-8 group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-36 h-24 rounded-2xl glass-card flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:border-champagne/20 border border-transparent">
                <span className="font-serif text-2xl text-pearl/30 group-hover:text-champagne transition-colors">
                  {client.initials}
                </span>
                <span className="text-[10px] text-pearl/20 group-hover:text-pearl/40 transition-colors uppercase tracking-wider">
                  {client.name.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-4 lg:px-8 mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Clientes Corporativos' },
            { value: '50+', label: 'Destinos Globales' },
            { value: '99.9%', label: 'Puntualidad' },
            { value: '24/7', label: 'Soporte Premium' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl glass-card border border-transparent hover:border-champagne/10 transition-all duration-300"
            >
              <div className="font-serif text-3xl lg:text-4xl text-champagne mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-pearl/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

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
      className="py-20 lg:py-28 bg-white text-background relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '200%' }}
        viewport={{ once: true }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute top-1/2 left-0 w-20 h-px bg-gradient-to-r from-transparent via-background/10 to-transparent pointer-events-none"
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-champagne/5 text-champagne font-bold text-[10px] uppercase tracking-widest mb-4 border border-champagne/10">
            Confían en Nosotros
          </span>
          <h3 className="font-serif text-2xl lg:text-3xl text-champagne mt-3 font-bold">
            Empresas Líderes de Latinoamérica
          </h3>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Content */}
        <div className="flex animate-scroll-left">
          {allClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-8 group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-36 h-24 rounded-2xl bg-white flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:border-burgundy/20 border border-burgundy/5 shadow-sm hover:shadow-md">
                <span className="font-serif text-2xl text-burgundy/30 group-hover:text-burgundy transition-colors font-bold">
                  {client.initials}
                </span>
                <span className="text-[10px] text-background/40 group-hover:text-burgundy/80 transition-colors uppercase tracking-wider font-bold">
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
              className="text-center p-6 rounded-2xl bg-burgundy/5 border border-burgundy/10 hover:border-burgundy/20 transition-all duration-300"
            >
              <div className="font-serif text-3xl lg:text-4xl text-burgundy mb-2 font-bold">
                {stat.value}
              </div>
              <div className="text-[10px] text-background/50 font-bold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

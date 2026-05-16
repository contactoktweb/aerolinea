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

import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export function ClientsCarousel({ data }: { data?: any[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  
  const displayClients = data && data.length > 0 ? data.map(c => ({
    name: c.name,
    image: c.image ? urlFor(c.image).url() : null,
    initials: c.name.slice(0, 2).toUpperCase()
  })) : clients

  const allClientsDisplay = [...displayClients, ...displayClients]

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white text-background relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
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

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-scroll-left">
          {allClientsDisplay.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-12 group flex items-center justify-center h-20"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {client.image ? (
                <div className="relative w-32 h-12">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              ) : (
                <div className="text-burgundy/20 font-serif text-3xl font-bold tracking-tighter grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                  {client.initials}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

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

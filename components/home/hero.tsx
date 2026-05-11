'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--champagne) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Main content grid */}
      <div className="relative min-h-screen grid lg:grid-cols-2">
        
        {/* Left side - Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 pt-48 pb-20 lg:pt-56 lg:pb-20"
        >
         

          {/* Main headline - Large elegant typography */}
          <motion.h1 
            variants={slideUp}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-pearl leading-[0.95] mb-8 drop-shadow-[0_0_15px_rgba(212,196,131,0.1)]"
          >
            <span className="block">Aerolíneas</span>
            <span className="block mt-2 text-champagne relative">
              Santander
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-champagne/60 via-champagne/20 to-transparent"
              />
            </span>
          </motion.h1>

          {/* Elegant divider */}
          <motion.div variants={slideUp} className="flex items-center gap-6 mb-8 mt-4">
            <div className="w-16 h-px bg-gradient-to-r from-champagne/60 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne/40 animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={slideUp}
            className="text-pearl/80 text-lg md:text-xl max-w-lg leading-relaxed font-light mb-12 italic"
          >
            "Elevando la experiencia de vuelo a través del diseño y la distinción."
          </motion.p>

          {/* CTAs */}
          <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/reserva"
              className="group relative inline-flex items-center justify-center gap-3 bg-champagne text-burgundy-black px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,196,131,0.3)] hover:-translate-y-1"
            >
              <span>Solicitar Vuelo</span>
              <Icon icon="ph:arrow-right-light" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/flota"
              className="group inline-flex items-center justify-center gap-3 border border-pearl/20 text-pearl px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-pearl/5 transition-all duration-300"
            >
              <span>Nuestra Flota</span>
            </Link>
          </motion.div>

          {/* Bottom content: Esencia & Historia */}
          <motion.div 
            variants={slideUp}
            className="mt-16 relative"
          >
            <div className="bg-champagne rounded-2xl p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-12 shadow-2xl">
              <div className="relative flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:sparkle-light" className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-background font-serif text-2xl mb-4 tracking-wide font-bold">Nuestra Esencia</h3>
                  <p className="text-background/80 text-sm leading-relaxed font-medium">
                    Elevamos el estándar de la aviación privada mediante exclusividad, seguridad y eficiencia absoluta en cada misión. Diseñamos el tiempo de nuestros clientes para que su única preocupación sea el destino.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
                  <Icon icon="ph:calendar-star-light" className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-background font-serif text-2xl mb-4 tracking-wide font-bold">Desde 2008</h3>
                  <p className="text-background/80 text-sm leading-relaxed font-medium">
                    Líderes en aviación ejecutiva con presencia global. Casi dos décadas operando bajo los más altos protocolos de seguridad y puntualidad en cada despegue.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          {/* Image container with elegant framing */}
          <div className="absolute inset-8 xl:inset-12">
            <div className="relative w-full h-full">
              {/* Gold accent lines */}
              <div className="absolute -top-4 -left-4 w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-champagne/40 to-transparent" />
                <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-champagne/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-champagne/40 to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-champagne/40 to-transparent" />
              </div>

              {/* Main image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/hero-jet.jpg"
                  alt="Interior lujoso de jet privado"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30" />
                <div className="absolute inset-0 bg-background/10" />
              </div>
            </div>
          </div>

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-20 xl:bottom-28 left-0 -translate-x-1/2 bg-background/90 backdrop-blur-sm border border-pearl/10 px-6 py-4"
          >
            <div className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] mb-1">Privacidad</div>
            <div className="text-champagne font-serif text-lg">Absoluta</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile image - shown below content on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="lg:hidden relative h-[50vh] -mt-20"
      >
        <Image
          src="/images/hero-jet.jpg"
          alt="Interior lujoso de jet privado"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-pearl/30 uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-champagne/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Decorative side text */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-[10px] text-pearl/20 uppercase tracking-[0.5em]">
          Aviacion Ejecutiva
        </span>
      </div>
    </section>
  )
}

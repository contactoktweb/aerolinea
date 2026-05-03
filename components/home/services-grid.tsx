'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SectionTitle } from '@/components/ui/section-title'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const services = [
  {
    icon: <Icon icon="ph:airplane-light" className="w-7 h-7" />,
    title: 'Vuelos Privados',
    description:
      'Vuelos ejecutivos personalizados con total privacidad y confort. Flexibilidad horaria absoluta adaptada a sus necesidades.',
    href: '/reserva',
    features: ['Sin escalas', 'Horarios flexibles', 'Maxima privacidad'],
    gradient: 'from-champagne/20 to-transparent',
  },
  {
    icon: <Icon icon="ph:clock-light" className="w-7 h-7" />,
    title: 'Vuelos Charter 24/7',
    description:
      'Disponibilidad permanente para vuelos nacionales e internacionales. Respuesta inmediata las 24 horas del dia.',
    href: '/reserva',
    features: ['Disponible siempre', 'Respuesta rapida', 'Cobertura global'],
    gradient: 'from-pearl/10 to-transparent',
  },
  {
    icon: <Icon icon="ph:heart-light" className="w-7 h-7" />,
    title: 'Ambulancia Aerea',
    description:
      'Traslados medicos de emergencia con equipamiento especializado y personal medico certificado a bordo.',
    href: '/reserva',
    features: ['Equipo medico', 'Personal certificado', 'Respuesta urgente'],
    gradient: 'from-red-500/10 to-transparent',
  },
  {
    icon: <Icon icon="ph:package-light" className="w-7 h-7" />,
    title: 'Carga Aerea',
    description:
      'Transporte de carga sensible y valiosa con maxima seguridad. Documentos, arte, equipamiento especial.',
    href: '/reserva',
    features: ['Alta seguridad', 'Carga sensible', 'Entrega garantizada'],
    gradient: 'from-champagne/15 to-transparent',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.div
      ref={cardRef}
      style={{ y: index % 2 === 0 ? y : undefined, opacity, scale }}
      variants={fadeInUp}
      custom={index}
    >
      <Link href={service.href} className="block h-full">
        <GlassCard className="h-full group relative overflow-hidden">
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)',
              backgroundSize: '200% 100%',
            }}
            initial={{ opacity: 0, backgroundPosition: '200% 0' }}
            whileHover={{
              opacity: 0.1,
              backgroundPosition: '-200% 0',
              transition: { duration: 1.5, ease: 'easeInOut' },
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors duration-300"
              >
                <div className="text-champagne">{service.icon}</div>
              </motion.div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-pearl mb-2 flex items-center gap-2">
                  {service.title}
                  <Icon
                    icon="ph:arrow-up-right-light"
                    className="w-4 h-4 text-champagne"
                  />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {service.features.map((feature, featureIndex) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * featureIndex }}
                  className="px-3 py-1.5 rounded-full text-xs bg-secondary/80 text-pearl/70 border border-pearl/5 group-hover:border-champagne/20 group-hover:text-pearl transition-all duration-300"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-burgundy-light/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Flying Plane Animation for Services Section */}
      <motion.div
        className="absolute top-1/2 left-0 w-full pointer-events-none"
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true, margin: '-200px' }}
        transition={{ duration: 6, ease: 'easeInOut' }}
      >
        <svg
          width="60"
          height="20"
          viewBox="0 0 60 20"
          fill="none"
          className="opacity-20"
        >
          <path
            d="M50 10L42.5 7.5L20 9L7.5 4L5 6L17.5 10L5 14L7.5 16L20 11L42.5 12.5L50 10Z"
            fill="var(--champagne)"
          />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Servicios"
          title="Experiencias de Vuelo VIP"
          description="Soluciones integrales de aviacion privada disenadas para satisfacer las mas altas exigencias. Cada vuelo es una experiencia unica."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

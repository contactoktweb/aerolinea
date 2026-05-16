'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SectionTitle } from '@/components/ui/section-title'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/utils/locale'

const getFallbackServices = (t: any) => [
  {
    iconType: 'ph:airplane-light',
    title: t('services.item1.title'),
    description: t('services.item1.desc'),
    href: '/reserva',
  },
  {
    iconType: 'ph:clock-light',
    title: t('services.item2.title'),
    description: t('services.item2.desc'),
    href: '/reserva',
  },
  {
    iconType: 'ph:heart-light',
    title: t('services.item3.title'),
    description: t('services.item3.desc'),
    href: '/reserva',
  },
  {
    iconType: 'ph:package-light',
    title: t('services.item4.title'),
    description: t('services.item4.desc'),
    href: '/reserva',
  },
]

function ServiceCard({ service, index }: { service: any; index: number }) {
  const { language, t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  const features = [
    t('services.features.1'),
    t('services.features.2'),
    t('services.features.3'),
  ]

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      custom={index}
      style={{ opacity, scale }}
    >
      <Link href={service.href || '/reserva'} className="block h-full">
        <div className="h-full group relative overflow-hidden bg-white rounded-2xl p-8 border border-burgundy/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-burgundy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-burgundy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-burgundy/5 flex items-center justify-center shrink-0 group-hover:bg-burgundy/10 transition-colors duration-500"
              >
                <Icon icon={service.iconType || 'ph:airplane-light'} className="w-7 h-7 text-burgundy" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-champagne mb-2 flex items-center gap-2">
                  {getLocaleString(service.title, language)}
                  <Icon icon="ph:arrow-up-right-light" className="w-4 h-4 text-champagne" />
                </h3>
                <p className="text-burgundy/70 text-sm leading-relaxed font-medium">
                  {getLocaleString(service.description, language)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feature, fIdx) => (
                <motion.span
                  key={fIdx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * fIdx }}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy/5 text-burgundy/60 border border-burgundy/10 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-all duration-300"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ServicesGrid({ data }: { data?: any[] }) {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const displayServices = data && data.length > 0 ? data : getFallbackServices(t)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionTitle
          subtitle={t('services.subtitle')}
          title={t('services.title')}
          description={t('services.description')}
          theme="light"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {displayServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

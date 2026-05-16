'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Aircraft, categoryLabels } from '@/lib/aircraft-data'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer, slideInFromLeft, slideInFromRight } from '@/lib/animations'
import { useLanguage } from '@/context/language-context'
import { getLocaleString, getLocaleArray } from '@/lib/locale-utils'
import { urlFor } from '@/sanity/lib/image'

interface AircraftDetailProps {
  aircraft: Aircraft
}

const specIcons = {
  passengers: 'ph:users-light',
  range: 'ph:navigation-arrow-light',
  speed: 'ph:gauge-light',
  altitude: 'ph:mountains-light',
  baggage: 'ph:briefcase-light',
}

const getSpecLabels = (t: any) => ({
  passengers: t('fleet.specs.passengers'),
  range: t('fleet.specs.range'),
  speed: t('fleet.specs.speed'),
  altitude: t('fleet.specs.altitude'),
  baggage: t('fleet.specs.baggage'),
})

export function AircraftDetail({ aircraft }: AircraftDetailProps) {
  const { language, t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const specLabels = getSpecLabels(t)

  const categoryLabelMap = {
    light: t('fleet.light'),
    midsize: t('fleet.midsize'),
    'super-midsize': t('fleet.super_midsize'),
    heavy: t('fleet.heavy'),
    'ultra-long-range': t('fleet.ultra_long_range'),
  }

  const openLightbox = useCallback((url: string) => {
    setSelectedImage(url)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <>
      <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={aircraft.image}
          alt={aircraft.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Back Link */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/flota"
              className="inline-flex items-center gap-2 text-pearl/80 hover:text-champagne transition-colors"
            >
              <Icon icon="ph:arrow-left-light" className="w-4 h-4" />
              <span className="text-sm">{t('fleet.back_link')}</span>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-champagne/90 text-background mb-4"
              >
                {(categoryLabelMap as any)[aircraft.category] || categoryLabels[aircraft.category]}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl mb-4"
              >
                {getLocaleString(aircraft.name, language)}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-champagne font-light"
              >
                {getLocaleString(aircraft.tagline, language)}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-16 lg:py-24 border-b border-pearl/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {Object.entries(aircraft.specs).map(([key, value]) => {
              const iconName = specIcons[key as keyof typeof specIcons]
              return (
                <motion.div key={key} variants={fadeInUp}>
                  <GlassCard hover={false} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-champagne/10 flex items-center justify-center">
                      <Icon icon={iconName} className="w-5 h-5 text-champagne" />
                    </div>
                    <p className="font-mono text-2xl text-pearl mb-1">{value as any}</p>
                    <p className="text-sm text-muted-foreground">
                      {(specLabels as any)[key]}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                {t('fleet.about_label')}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
                {t('fleet.about_title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {getLocaleString(aircraft.description, language)}
              </p>
              <GoldButton href="/reserva" size="lg">
                {t('fleet.book_now')}
              </GoldButton>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={aircraft.interiorImage}
                alt={`Interior del ${aircraft.name}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              {t('fleet.features_label')}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-pearl">
              {t('fleet.features_title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getLocaleArray(aircraft.features, language).map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <GlassCard hover={false} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-champagne/10 flex items-center justify-center shrink-0">
                    <Icon icon="ph:check-light" className="w-4 h-4 text-champagne" />
                  </div>
                  <p className="text-pearl">{feature}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Section */}
      {aircraft.gallery && aircraft.gallery.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                {t('fleet.gallery_label')}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-pearl">
                {t('fleet.gallery_title')}
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {aircraft.gallery.map((img: any, index: number) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(urlFor(img).url())}
                >
                    <Image
                      src={urlFor(img).url()}
                      alt={img.alt || `${t('fleet.gallery_alt_prefix')} ${index + 1} ${t('fleet.gallery_alt_of')} ${getLocaleString(aircraft.name, language)}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-pearl mb-6">
              {t('fleet.cta_title')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {t('fleet.cta_desc_prefix')} {getLocaleString(aircraft.name, language)} {t('fleet.cta_desc_suffix')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GoldButton href="/reserva" size="lg">
                {t('fleet.cta_book')}
              </GoldButton>
              <GoldButton href="/flota" variant="outline" size="lg">
                {t('fleet.cta_more')}
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </section>
    </article>

    {/* Lightbox Modal */}
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Galería ampliada"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            
            <button
              onClick={closeLightbox}
              className="absolute top-0 right-0 m-4 w-12 h-12 rounded-full bg-pearl/10 flex items-center justify-center text-pearl hover:bg-champagne hover:text-background transition-all duration-300"
            >
              <Icon icon="ph:x-light" className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

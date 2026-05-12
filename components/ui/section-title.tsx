'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  theme?: 'dark' | 'light'
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  theme = 'dark',
}: SectionTitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
      className={cn(
        'mb-12 lg:mb-16',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase mb-4 text-champagne">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-balance leading-[1.1] tracking-tight text-champagne font-bold">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-pretty leading-relaxed text-burgundy font-medium",
          align === 'center' ? "mx-auto" : ""
        )}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

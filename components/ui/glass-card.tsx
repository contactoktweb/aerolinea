'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover } from '@/lib/animations'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'section'
  variant?: 'dark' | 'light'
}

export function GlassCard({
  children,
  className,
  hover = true,
  as = 'div',
  variant = 'dark',
}: GlassCardProps) {
  const Component = motion[as]

  if (!hover) {
    return (
      <Component
        className={cn(
          variant === 'light' ? 'glass-card-light' : 'glass-card',
          'rounded-2xl p-6',
          className
        )}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={cn(
        variant === 'light' ? 'glass-card-light' : 'glass-card',
        'rounded-2xl p-6 cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  )
}

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function GoldButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  className,
  type = 'button',
  disabled = false,
}: GoldButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:ring-offset-2 focus:ring-offset-background',
    'disabled:opacity-50 disabled:pointer-events-none',
    {
      // Variants
      'bg-champagne text-background hover:bg-champagne-light hover:shadow-lg hover:shadow-champagne/20':
        variant === 'solid',
      'border-2 border-champagne text-champagne hover:bg-champagne hover:text-background':
        variant === 'outline',
      // Sizes
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-sm': size === 'md',
      'px-8 py-4 text-base': size === 'lg',
    },
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  )
}

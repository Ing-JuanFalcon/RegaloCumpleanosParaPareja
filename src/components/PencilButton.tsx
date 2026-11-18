import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type PencilButtonProps = {
  children: ReactNode
  onClick: () => void
  icon?: ReactNode
  className?: string
  ariaLabel?: string
}

export function PencilButton({ children, onClick, icon, className = '', ariaLabel }: PencilButtonProps) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.button
      type="button"
      className={`pencil-button ${className}`}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
      whileTap={reduceMotion ? undefined : { scale: .97 }}
      aria-label={ariaLabel}
    >
      <svg className="pencil-outline" viewBox="0 0 320 86" preserveAspectRatio="none" aria-hidden="true">
        <motion.path className="pencil-stroke pencil-stroke-one" d="M18 45 C18 24 49 14 85 19 C137 24 175 15 225 20 C268 24 305 26 302 46 C299 67 270 68 229 64 C164 59 109 72 59 64 C33 61 17 58 18 45Z" animate={reduceMotion ? undefined : { pathLength: [0, 1, .96, 1], stroke: ['#d79a8e', '#9daec0', '#c18ba7', '#d79a8e'] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.path className="pencil-stroke pencil-stroke-two" d="M24 43 C31 29 53 24 87 27 C140 31 186 22 237 28 C274 32 292 34 292 47 C291 59 267 59 229 56 C168 52 108 65 62 57 C41 54 26 54 24 43Z" animate={reduceMotion ? undefined : { pathLength: [0, .92, 1, .88], stroke: ['#e1bd8b', '#c78e9b', '#b5a6c9', '#e1bd8b'] }} transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: .3 }} />
      </svg>
      <span className="pencil-button-label">{children}</span>{icon && <span className="pencil-button-icon">{icon}</span>}
    </motion.button>
  )
}

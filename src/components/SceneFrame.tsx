import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
const fadeUp: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .72, ease: [ .22, 1, .36, 1 ] } } }
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) { return <motion.div className={className} variants={fadeUp} initial="hidden" animate="visible" transition={{ delay }}>{children}</motion.div> }
export function SceneFrame({ children, className = '' }: { children: ReactNode; className?: string }) { return <motion.main className={`scene ${className}`} initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .65, ease: [ .22, 1, .36, 1 ] }}>{children}</motion.main> }

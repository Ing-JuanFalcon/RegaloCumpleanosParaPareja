import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Decor } from '../components/Decor'
import { SceneFrame } from '../components/SceneFrame'

export function LoadingScene({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(onDone, 1350)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <SceneFrame className="loading-scene">
      <Decor scene={3} />
      <div className="loading-card">
        <motion.span className="loading-orbit" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} aria-hidden="true"><i /><i /><i /></motion.span>
        <p>Preparando todo...</p>
      </div>
    </SceneFrame>
  )
}

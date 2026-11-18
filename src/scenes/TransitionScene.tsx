import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SceneFrame } from '../components/SceneFrame'

export function TransitionScene({ image, duration = 5000, onDone, onBack, chapter }: { image: string; duration?: number; onDone: () => void; onBack: () => void; chapter: string }) {
  const reduceMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!loaded) return
    const timer = window.setTimeout(onDone, duration)
    return () => window.clearTimeout(timer)
  }, [duration, loaded, onDone])

  return (
    <SceneFrame className="fullscreen-transition">
      <img className="transition-backdrop" src={image} alt="" aria-hidden="true" />
      <img className="transition-art" src={image} alt={chapter} onLoad={() => setLoaded(true)} />
      <motion.div
        className="transition-fade"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={!loaded ? { opacity: 1 } : reduceMotion ? { opacity: 0 } : { opacity: [1, 0, 0, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: duration / 1000, times: [0, .07, .9, 1], ease: 'linear' }}
      />
      <button type="button" className="story-back transition-back" onClick={onBack} aria-label="Regresar a la foto anterior"><ArrowLeft size={17} /></button>
    </SceneFrame>
  )
}

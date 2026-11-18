import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SceneFrame } from '../components/SceneFrame'

export function TransitionScene({ image, video, poster, loop = false, duration = 5000, onDone, onBack, chapter }: { image?: string; video?: string; poster?: string; loop?: boolean; duration?: number; onDone: () => void; onBack: () => void; chapter: string }) {
  const reduceMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [ending, setEnding] = useState(false)
  useEffect(() => {
    if (!loaded) return
    const timer = window.setTimeout(() => setEnding(true), duration + (video && !loop ? 1000 : 0))
    return () => window.clearTimeout(timer)
  }, [duration, loaded, loop, video])
  useEffect(() => {
    if (!ending) return
    const timer = window.setTimeout(onDone, 650)
    return () => window.clearTimeout(timer)
  }, [ending, onDone])

  return (
    <SceneFrame className="fullscreen-transition">
      {poster && <img className="transition-backdrop" src={poster} alt="" aria-hidden="true" />}
      {!poster && image && <img className="transition-backdrop" src={image} alt="" aria-hidden="true" />}
      {poster && <img className="transition-art transition-poster" src={poster} alt="" aria-hidden="true" />}
      {video ? (
        <video className={`transition-art transition-animation${loaded ? ' is-ready' : ''}`} src={video} poster={poster} autoPlay muted playsInline loop={loop} onPlaying={() => setLoaded(true)} onEnded={() => setEnding(true)} onError={() => setLoaded(true)} aria-label={chapter} />
      ) : image ? (
        <img className={`transition-art transition-animation${loaded ? ' is-ready' : ''}`} src={image} alt={chapter} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} />
      ) : null}
      <motion.div
        className="transition-fade"
        aria-hidden="true"
        initial={{ opacity: poster ? 0 : 1 }}
        animate={!loaded ? { opacity: poster ? 0 : 1 } : reduceMotion ? { opacity: 0 } : { opacity: ending ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: ending ? .65 : .55, ease: 'easeInOut' }}
      />
      <button type="button" className="story-back transition-back" onClick={onBack} aria-label="Regresar a la foto anterior"><ArrowLeft size={17} /></button>
    </SceneFrame>
  )
}

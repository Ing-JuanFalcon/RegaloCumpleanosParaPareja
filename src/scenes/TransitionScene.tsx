import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { SceneFrame } from '../components/SceneFrame'

export function TransitionScene({ image, onDone, onBack, chapter }: { image: string; onDone: () => void; onBack: () => void; chapter: string }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 5000)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <SceneFrame className="fullscreen-transition">
      <img className="transition-backdrop" src={image} alt="" aria-hidden="true" />
      <img className="transition-art" src={image} alt={chapter} />
      <button type="button" className="story-back transition-back" onClick={onBack} aria-label="Regresar a la foto anterior"><ArrowLeft size={17} /></button>
    </SceneFrame>
  )
}

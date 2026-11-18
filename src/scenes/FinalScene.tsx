import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Sparkles } from 'lucide-react'
import { Decor } from '../components/Decor'
import { PencilButton } from '../components/PencilButton'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function FinalScene({ onBack, onRestart }: { onBack: () => void; onRestart: () => void }) {
  return (
    <SceneFrame className="final-scene">
      <Decor scene={3} />
      <button type="button" className="story-back" onClick={onBack} aria-label="Volver al collage"><ArrowLeft size={17} /></button>
      <div className="final-message">
        <Reveal className="final-sparkle"><Sparkles size={20} /></Reveal>
        <Reveal className="final-heart"><motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}><Heart size={35} fill="currentColor" /></motion.span></Reveal>
        <Reveal className="final-title"><h1>Muchas felicidades, mi Dians.</h1><p>Eres especial.</p></Reveal>
        <Reveal className="final-button"><PencilButton onClick={onRestart}>Volver al inicio</PencilButton></Reveal>
      </div>
    </SceneFrame>
  )
}

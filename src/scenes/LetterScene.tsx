import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Heart, RotateCcw, Sparkles } from 'lucide-react'
import { birthdayContent } from '../content'
import { Decor } from '../components/Decor'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function LetterScene({ onBack, onRestart }: { onBack: () => void; onRestart: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <SceneFrame className="letter-scene">
      <Decor scene={3} />
      <button className="story-back" onClick={onBack} aria-label="Volver a la última foto"><ArrowLeft size={17} /></button>
      <div className="letter-content">
        <Reveal className="letter-stamp" delay={.08}><Heart size={17} strokeWidth={1.25} /><span>18 · 11</span></Reveal>
        <Reveal className="letter-eyebrow" delay={.18}><Sparkles size={13} />{birthdayContent.letter.eyebrow}</Reveal>
        <Reveal className="letter-title" delay={.3}><h2>{birthdayContent.letter.title}</h2><span className="heading-underline" /></Reveal>
        <Reveal className="letter-paper" delay={.42}>
          <span className="letter-paper-flower flower-a" aria-hidden="true">✿</span>
          {birthdayContent.letter.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="letter-signoff"><span>{birthdayContent.letter.signoff}</span><span className="signature">{birthdayContent.letter.signature}</span></div>
          <span className="letter-paper-flower flower-b" aria-hidden="true">✦</span>
        </Reveal>
        <Reveal className="letter-actions" delay={.58}>
          <motion.button className="secondary-button" onClick={onRestart} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: .98 }}>
            <RotateCcw size={14} /><span>Volver al comienzo</span>
          </motion.button>
        </Reveal>
        <Reveal className="letter-footer" delay={.72}>HECHO CON TODO MI AMOR <span>✦</span></Reveal>
      </div>
    </SceneFrame>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { birthdayContent } from '../content'
import { Decor } from '../components/Decor'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function WelcomeScene({ onBegin }: { onBegin: () => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <SceneFrame className="welcome-scene">
      <Decor />
      <div className="welcome-content">
        <Reveal className="eyebrow" delay={.15}><span className="eyebrow-line" />{birthdayContent.intro}<span className="eyebrow-line" /></Reveal>
        <Reveal className="title-wrap" delay={.35}>
          <span className="title-sparkle sparkle-left"><Sparkles size={18} strokeWidth={1.2} /></span>
          <span className="title-sparkle sparkle-right"><Sparkles size={13} strokeWidth={1.2} /></span>
          <h1>{birthdayContent.title}</h1>
          <span className="title-underline" />
        </Reveal>
        <Reveal className="subtitle" delay={.58}><span className="tiny-heart" />{birthdayContent.subtitle}<span className="tiny-heart" /></Reveal>
        <Reveal className="start-wrap" delay={.8}>
          <motion.button className="primary-button" onClick={onBegin} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: .97 }}>
            <span className="button-halo" aria-hidden="true" /><span>{birthdayContent.start}</span><ArrowDown size={16} strokeWidth={1.7} />
          </motion.button>
        </Reveal>
        <Reveal className="welcome-note" delay={1.02}>UNA PEQUEÑA HISTORIA, SOLO PARA TI</Reveal>
      </div>
      <div className="welcome-foot" aria-hidden="true"><span className="foot-rule" /><span>hecho con amor</span><span className="foot-dot">✦</span><span>18 · 11 · 2026</span><span className="foot-rule" /></div>
    </SceneFrame>
  )
}

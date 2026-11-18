import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Flower2, Heart, Sparkles } from 'lucide-react'
import { birthdayContent } from '../content'
import { Decor } from '../components/Decor'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function MemoryScene() {
  const reduceMotion = useReducedMotion()

  return (
    <SceneFrame className="memory-scene">
      <Decor scene={2} />
      <div className="memory-content">
        <Reveal className="memory-kicker" delay={0.12}>
          <Sparkles size={13} strokeWidth={1.4} /> ESTE DÍA CAMBIÓ EL MUNDO
        </Reveal>
        <Reveal className="memory-heading" delay={0.28}>
          <span className="heading-ornament" aria-hidden="true">✦</span>
          <h2>{birthdayContent.memoryTitle}</h2>
          <span className="heading-underline" />
        </Reveal>
        <Reveal className="date-label" delay={0.42}>
          <span className="date-rule" />{birthdayContent.date}<span className="date-rule" />
        </Reveal>
        <Reveal className="polaroid-wrap" delay={0.55}>
          <span className="photo-orbit orbit-a" aria-hidden="true" />
          <span className="photo-orbit orbit-b" aria-hidden="true" />
          <motion.div
            className="polaroid"
            initial={{ opacity: 0, y: 34, rotate: 5, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, rotate: -2.2, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { rotate: 0, y: -5, scale: 1.025 }}
          >
            <div className="photo-window">
              <img
                src={birthdayContent.photoPath}
                alt="Una fotografía especial"
                onError={event => { event.currentTarget.style.display = 'none' }}
              />
              <div className="photo-placeholder">
                <span className="placeholder-light" />
                <span className="placeholder-ring"><Heart size={22} strokeWidth={1.2} /></span>
                <span className="placeholder-title">Tu foto va aquí</span>
                <span className="placeholder-note">un recuerdo que atesoro</span>
              </div>
              <span className="photo-grain" />
              <span className="photo-corner corner-one" /><span className="photo-corner corner-two" />
            </div>
            <div className="polaroid-caption"><span>desde aquel día</span><span className="caption-heart">♥</span></div>
            <span className="tape" />
          </motion.div>
          <span className="photo-flower flower-left" aria-hidden="true">✿</span>
          <span className="photo-flower flower-right" aria-hidden="true"><Flower2 size={24} strokeWidth={1.1} /></span>
        </Reveal>
        <Reveal className="continue-wrap" delay={0.82}>
          <motion.button
            className="secondary-button"
            disabled
            whileHover={reduceMotion ? undefined : { y: -2 }}
            aria-label="Continuar: próxima parte en preparación"
            title="La siguiente parte llegará pronto"
          >
            <span>{birthdayContent.continue}</span><ArrowRight size={16} strokeWidth={1.7} />
          </motion.button>
          <span className="coming-soon"><span className="coming-star">✦</span> el siguiente capítulo está por llegar <span className="coming-star">✦</span></span>
        </Reveal>
      </div>
      <div className="memory-page-number" aria-hidden="true"><span>01</span><span className="page-divider"/><span>02</span></div>
    </SceneFrame>
  )
}

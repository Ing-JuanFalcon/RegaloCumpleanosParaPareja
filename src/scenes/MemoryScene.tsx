import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react'
import type { StoryPhoto } from '../content'
import { Decor } from '../components/Decor'
import { Reveal, SceneFrame } from '../components/SceneFrame'

type MemorySceneProps = {
  memory: StoryPhoto
  index: number
  total: number
  onBack: () => void
  onNext: () => void
}

export function MemoryScene({ memory, index, total, onBack, onNext }: MemorySceneProps) {
  const reduceMotion = useReducedMotion()
  const isLast = index === total - 1

  return (
    <SceneFrame className={`memory-scene story-scene story-tone-${index}`}>
      <Decor scene={2} />
      <button className="story-back" onClick={onBack} aria-label="Volver a la escena anterior"><ArrowLeft size={17} /></button>
      <div className="memory-content story-content">
        <Reveal className="memory-kicker story-kicker" delay={0.08}>
          <Sparkles size={13} strokeWidth={1.4} /> {memory.chapter}
        </Reveal>
        <Reveal className="memory-heading story-heading" delay={0.2}>
          <span className="heading-ornament" aria-hidden="true">✦</span>
          <h2>{memory.title}</h2>
          <span className="heading-underline" />
        </Reveal>
        <Reveal className="story-message" delay={0.32}>{memory.message}</Reveal>
        <Reveal className="polaroid-wrap story-photo-wrap" delay={0.4}>
          <span className="photo-orbit orbit-a" aria-hidden="true" />
          <span className="photo-orbit orbit-b" aria-hidden="true" />
          <motion.div
            className="polaroid story-polaroid"
            initial={{ opacity: 0, y: 35, rotate: 4, scale: .92 }}
            animate={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2, scale: 1 }}
            transition={{ duration: .9, delay: .32, ease: [.22, 1, .36, 1] }}
            whileHover={reduceMotion ? undefined : { rotate: 0, y: -5, scale: 1.02 }}
          >
            <div className="photo-window story-photo-window">
              <img src={memory.image} alt={memory.alt} onError={event => { event.currentTarget.style.display = 'none' }} />
              <div className="photo-placeholder">
                <span className="placeholder-light" />
                <span className="placeholder-ring"><Heart size={22} strokeWidth={1.2} /></span>
                <span className="placeholder-title">Un recuerdo bonito</span>
                <span className="placeholder-note">guárdalo cerquita del corazón</span>
              </div>
              <span className="photo-grain" />
              <span className="photo-corner corner-one" /><span className="photo-corner corner-two" />
            </div>
            <div className="polaroid-caption"><span>{memory.caption}</span><span className="caption-heart">♥</span></div>
            <span className="tape" />
          </motion.div>
          <span className="photo-flower flower-left" aria-hidden="true">✿</span>
          <span className="photo-flower flower-right" aria-hidden="true"><Sparkles size={21} strokeWidth={1.1} /></span>
        </Reveal>
        <Reveal className="story-navigation" delay={.62}>
          <div className="story-progress" aria-label={`Recuerdo ${index + 1} de ${total}`}>
            <span className="progress-number">0{index + 1}</span>
            <span className="progress-track">{Array.from({ length: total }, (_, i) => <i key={i} className={i <= index ? 'progress-filled' : ''} />)}</span>
            <span className="progress-number">0{total}</span>
          </div>
          <motion.button className="secondary-button story-next" onClick={onNext} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: .98 }}>
            <span>{isLast ? 'Leer mi carta' : 'Siguiente recuerdo'}</span><ArrowRight size={16} strokeWidth={1.7} />
          </motion.button>
        </Reveal>
      </div>
    </SceneFrame>
  )
}

import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { characterAssets } from '../content'
import { Decor } from '../components/Decor'
import { StoryCharacters } from '../components/StoryCharacters'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function PreludeScene({ stage, onStageChange, onNext }: { stage: number; onStageChange: (stage: number) => void; onNext: () => void }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (stage >= 2) return
    const first = window.setTimeout(() => onStageChange(1), 5000)
    const second = window.setTimeout(() => onStageChange(2), 7400)
    return () => { window.clearTimeout(first); window.clearTimeout(second) }
  }, [onStageChange])

  return (
    <SceneFrame className={`prelude-scene prelude-stage-${stage}`}>
      <Decor scene={3} />
      {stage === 0 ? (
        <Reveal className="transition-film" delay={.1}>
          <div className="film-frame"><img src={characterAssets.firstTransition} alt="Una pareja se abraza en una ilustración animada" /></div>
          <span className="film-caption"><Heart size={12} fill="currentColor" /> un instante para entrar en nuestra historia</span>
        </Reveal>
      ) : (
        <div className="prelude-message" aria-live="polite">
          {stage === 1 ? (
            <Reveal className="prelude-line" key="song-first"><span className="message-flower">✿</span><h2>Primero, una canción.</h2><p>Hay melodías que encuentran las palabras antes que nosotros.</p></Reveal>
          ) : (
            <Reveal className="prelude-line" key="song-perfect"><span className="message-sparkle"><Sparkles size={17} /></span><h2>Excelente, esta es perfecta.</h2><p>Escúchala conmigo; ya empieza nuestro primer recuerdo.</p><motion.button className="secondary-button prelude-next" onClick={onNext} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><span>Siguiente</span><ArrowRight size={16} /></motion.button></Reveal>
          )}
        </div>
      )}
      <StoryCharacters together />
    </SceneFrame>
  )
}

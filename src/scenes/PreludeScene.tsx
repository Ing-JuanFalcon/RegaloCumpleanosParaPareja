import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { ArrowRight, Heart, Music2, Sparkles } from 'lucide-react'
import { birthdayContent, characterAssets, songCoverUrl } from '../content'
import { Decor } from '../components/Decor'
import { SceneFrame } from '../components/SceneFrame'

export function PreludeScene({ stage, onStageChange, onNext }: { stage: number; onStageChange: (stage: number) => void; onNext: () => void }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (stage >= 4) return
    onStageChange(0)
    const timers = [
      window.setTimeout(() => onStageChange(1), 1200),
      window.setTimeout(() => onStageChange(2), 6200),
      window.setTimeout(() => onStageChange(3), 8700),
      window.setTimeout(() => onStageChange(4), 12100),
    ]
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [onStageChange])

  const isTransition = stage === 1 || stage === 2

  return (
    <SceneFrame className="prelude-scene">
      <Decor scene={3} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={`prelude-stage-${stage}`}
          className={isTransition ? 'fullscreen-sequence' : 'prelude-content'}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: isTransition ? 0 : 18, scale: isTransition ? 1.035 : .985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: isTransition ? 0 : -12, scale: isTransition ? .97 : 1.02 }}
          transition={{ duration: reduceMotion ? 0 : isTransition ? .5 : .42, ease: [.22, 1, .36, 1] }}
        >
          {stage === 0 ? (
            <div className="loading-card">
              <motion.span className="loading-heart" animate={reduceMotion ? undefined : { rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }} transition={{ duration: 2.1, repeat: Infinity }}><Heart size={22} /></motion.span>
              <span className="loading-copy">Preparando esta sorpresa...</span>
              <span className="loading-dots"><i /><i /><i /></span>
            </div>
          ) : isTransition ? (
            <>
              <img className="transition-backdrop" src={stage === 1 ? characterAssets.firstTransition : characterAssets.secondTransition} alt="" aria-hidden="true" />
              <img className="transition-art" src={stage === 1 ? characterAssets.firstTransition : characterAssets.secondTransition} alt="Una ilustración animada de una pareja abrazándose" />
              <motion.span className="transition-heart" animate={reduceMotion ? undefined : { scale: [1, 1.18, 1], opacity: [.5, .9, .5] }} transition={{ duration: 2.2, repeat: Infinity }}>♥</motion.span>
            </>
          ) : stage === 3 ? (
            <div className="search-card">
              <span className="search-icon"><Music2 size={22} /></span>
              <h2>Buscando una canción perfecta como tú...</h2>
              <div className="fake-progress" role="progressbar" aria-label="Buscando una canción" aria-valuemin={0} aria-valuemax={100}><span /></div>
              <span className="search-caption">escuchando con el corazón</span>
            </div>
          ) : (
            <div className="song-reveal">
              <span className="song-reveal-kicker"><Sparkles size={14} /> ESTA ES EXCELENTE</span>
              <h2>Encontré nuestra canción</h2>
              <div className="song-card">
                <div className="cover-wrap"><img src={songCoverUrl} alt="Portada del álbum Brand New Eyes de Paramore" /></div>
                <div className="song-details">
                  <span className="song-overline">PARA ESCUCHAR JUNTOS</span>
                  <h3>{birthdayContent.songTitle}</h3>
                  <p>{birthdayContent.songArtist}</p>
                  <div className="song-waveform" aria-hidden="true">{Array.from({ length: 29 }, (_, i) => <i key={i} style={{ '--wave-height': `${18 + ((i * 17 + 11) % 74)}%`, '--wave-delay': `${(i % 8) * -.13}s` } as CSSProperties} />)}</div>
                </div>
              </div>
              <motion.button className="secondary-button song-continue" onClick={onNext} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: .98 }}>
                <span>Continuar</span><ArrowRight size={16} />
              </motion.button>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </SceneFrame>
  )
}

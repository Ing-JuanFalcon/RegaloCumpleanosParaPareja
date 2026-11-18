import { motion, useReducedMotion } from 'framer-motion'
import { characterAssets } from '../content'

function BalloonString() {
  return <svg className="balloon-string" viewBox="0 0 60 82" aria-hidden="true"><path d="M30 0 C12 23 48 42 27 81" /></svg>
}

export function StoryCharacters({ together = false }: { together?: boolean }) {
  const reduceMotion = useReducedMotion()
  if (together) {
    return <motion.img
      className="character-pair"
      src={characterAssets.together}
      alt="Peach y Goma juntos"
      initial={{ opacity: 0, y: 18, scale: .94 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -9, 0], rotate: [0, 1.2, 0] }}
      transition={{ opacity: { duration: .7 }, default: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }}
    />
  }

  return <div className="character-corners" aria-label="Peach y Goma acompañan la historia">
    <motion.div
      className="character-balloon character-goma"
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -13, 0], rotate: [-2, 1.6, -2], scale: [1, 1.025, 1] }}
      transition={{ duration: 5.3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img src={characterAssets.goma} alt="Goma" />
      <BalloonString />
    </motion.div>
    <motion.div
      className="character-balloon character-peach"
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -11, 0], rotate: [2, -1.4, 2], scale: [1, 1.025, 1] }}
      transition={{ duration: 4.7, delay: .35, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img src={characterAssets.peach} alt="Peach" />
      <BalloonString />
    </motion.div>
  </div>
}

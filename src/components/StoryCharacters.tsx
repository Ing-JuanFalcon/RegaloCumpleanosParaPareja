import { motion, useReducedMotion } from 'framer-motion'
import { characterAssets } from '../content'

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
    <motion.img
      className="character character-peach"
      src={characterAssets.peach}
      alt="Peach"
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -12, 0], rotate: [-2, 1.5, -2] }}
      transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.img
      className="character character-goma"
      src={characterAssets.goma}
      alt="Goma"
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -14, 0], rotate: [2, -1.5, 2] }}
      transition={{ duration: 5.2, delay: .35, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
}

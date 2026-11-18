import { motion } from 'framer-motion'

export function PageTurnOverlay() {
  return (
    <div className="page-turn-overlay" aria-hidden="true">
      <motion.div
        className="page-turn-sheet"
        initial={{ x: '0%', rotateY: 0, opacity: 1 }}
        animate={{ x: '108%', rotateY: -82, opacity: .18 }}
        transition={{ duration: .96, ease: [.66, 0, .3, 1] }}
      >
        <span className="page-turn-line" /><span className="page-turn-heart">♥</span><span className="page-turn-shadow" />
      </motion.div>
    </div>
  )
}

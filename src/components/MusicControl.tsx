import { motion } from 'framer-motion'
import { Music2, Pause, Play } from 'lucide-react'

export function MusicControl({ playing, label, onToggle }: { playing: boolean; label: string; onToggle: () => void }) {
  return (
    <div className="music-control">
      <span className={`music-indicator ${playing ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="music-label">{label}</span>
      <motion.button
        type="button"
        className="music-button"
        onClick={onToggle}
        whileTap={{ scale: .9 }}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        title={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
        <Music2 className="music-note" size={13} />
      </motion.button>
    </div>
  )
}

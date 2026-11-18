import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { birthdayContent } from '../content'
import { Decor } from '../components/Decor'
import { StoryCharacters } from '../components/StoryCharacters'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function WelcomeScene({ onBegin }: { onBegin: () => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <SceneFrame className="welcome-scene">
      <Decor />
      <StoryCharacters />
      <div className="welcome-content">
        <Reveal className="title-wrap" delay={.35}>
          <span className="title-sparkle sparkle-left"><Sparkles size={18} strokeWidth={1.2} /></span>
          <span className="title-sparkle sparkle-right"><Sparkles size={13} strokeWidth={1.2} /></span>
          <h1>{birthdayContent.title}</h1>
          <span className="title-underline" />
        </Reveal>
        <Reveal className="start-wrap" delay={.58}>
          <motion.button className="primary-button" onClick={onBegin} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: .97 }}>
            <span className="button-halo" aria-hidden="true" /><span>{birthdayContent.start}</span><ArrowDown size={16} strokeWidth={1.7} />
          </motion.button>
        </Reveal>
      </div>
      <div className="welcome-foot"><span>{birthdayContent.signature}</span><span className="footer-heart" aria-label="con amor">♥</span></div>
    </SceneFrame>
  )
}

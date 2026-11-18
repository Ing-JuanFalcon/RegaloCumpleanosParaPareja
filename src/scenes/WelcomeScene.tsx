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
          <motion.h1
            className="animated-title"
            aria-label={birthdayContent.title}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : .12, delayChildren: reduceMotion ? 0 : .24 } } }}
            initial="hidden"
            animate="visible"
          >
            {reduceMotion ? birthdayContent.title : birthdayContent.title.split(' ').map((word, wordIndex, words) => (
              <motion.span key={`${word}-${wordIndex}`} className="title-word" aria-hidden="true" variants={{ hidden: {}, visible: { transition: { staggerChildren: .045 } } }}>
                {word.split('').map((letter, index) => (
                  <motion.span key={`${letter}-${index}`} variants={{ hidden: { opacity: 0, y: 24, rotate: index % 2 ? 6 : -6 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', damping: 13, stiffness: 170 } } }}>{letter}</motion.span>
                ))}{wordIndex < words.length - 1 ? '\u00a0' : ''}
              </motion.span>
            ))}
          </motion.h1>
          <span className="title-underline" />
        </Reveal>
        <Reveal className="start-wrap" delay={.58}>
          <motion.button className="primary-button pencil-button" onClick={onBegin} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: .97 }}>
            <svg className="pencil-outline" viewBox="0 0 320 86" preserveAspectRatio="none" aria-hidden="true">
              <motion.path className="pencil-stroke pencil-stroke-one" d="M18 45 C18 24 49 14 85 19 C137 24 175 15 225 20 C268 24 305 26 302 46 C299 67 270 68 229 64 C164 59 109 72 59 64 C33 61 17 58 18 45Z" animate={reduceMotion ? undefined : { pathLength: [0, 1, .96, 1], stroke: ['#d79a8e', '#9daec0', '#c18ba7', '#d79a8e'] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.path className="pencil-stroke pencil-stroke-two" d="M24 43 C31 29 53 24 87 27 C140 31 186 22 237 28 C274 32 292 34 292 47 C291 59 267 59 229 56 C168 52 108 65 62 57 C41 54 26 54 24 43Z" animate={reduceMotion ? undefined : { pathLength: [0, .92, 1, .88], stroke: ['#e1bd8b', '#c78e9b', '#b5a6c9', '#e1bd8b'] }} transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: .3 }} />
            </svg>
            <span>{birthdayContent.start}</span><ArrowDown size={16} strokeWidth={1.7} />
          </motion.button>
        </Reveal>
      </div>
      <div className="welcome-foot"><span>{birthdayContent.signature}</span><span className="footer-heart" aria-label="con amor">♥</span></div>
    </SceneFrame>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { birthdayContent } from '../content'
import { Decor } from '../components/Decor'
import { PencilButton } from '../components/PencilButton'
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
          <motion.h1 className="animated-title" aria-label={birthdayContent.title}>
            {birthdayContent.title.split(' ').map((word, wordIndex, words) => (
              <span key={`${word}-${wordIndex}`} className="title-word" aria-hidden="true">
                {word.split('').map((letter, letterIndex) => {
                  const index = birthdayContent.title.split(' ').slice(0, wordIndex).join(' ').length + letterIndex + wordIndex
                  return <motion.span
                    key={`${letter}-${letterIndex}`}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, rotate: letterIndex % 2 ? 5 : -5 }}
                    animate={reduceMotion ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 1, y: [0, -3, 0], rotate: [0, letterIndex % 2 ? 1.2 : -1.2, 0] }}
                    transition={{
                      opacity: { duration: .38, delay: index * .045 },
                      y: { duration: 2.1 + (index % 4) * .23, delay: .3 + index * .075, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' },
                      rotate: { duration: 2.8 + (index % 3) * .2, delay: .4 + index * .09, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' },
                    }}
                  >{letter}</motion.span>
                })}{wordIndex < words.length - 1 ? '\u00a0' : ''}
              </span>
            ))}
          </motion.h1>
          <span className="title-underline" />
        </Reveal>
        <Reveal className="start-wrap" delay={.58}>
          <PencilButton onClick={onBegin} icon={<ArrowDown size={17} strokeWidth={1.7} />}>{birthdayContent.start}</PencilButton>
        </Reveal>
      </div>
    </SceneFrame>
  )
}


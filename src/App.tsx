import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { birthdayContent, soundtrackUrl } from './content'
import { MusicControl } from './components/MusicControl'
import { PageTurnOverlay } from './components/PageTurnOverlay'
import { WelcomeScene } from './scenes/WelcomeScene'
import { PreludeScene } from './scenes/PreludeScene'
import { MemoryScene } from './scenes/MemoryScene'
import { LetterScene } from './scenes/LetterScene'

export default function App() {
  const [scene, setScene] = useState(0)
  const [preludeStage, setPreludeStage] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [pageTurning, setPageTurning] = useState(false)
  const [turnId, setTurnId] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const reduceMotion = useReducedMotion()
  const lastPhotoScene = birthdayContent.photos.length + 1
  const lastScene = lastPhotoScene + 1
  const onPreludeStageChange = useCallback((stage: number) => setPreludeStage(stage), [])

  const playMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.2
    void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false))
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) playMusic()
    else audio.pause()
  }

  const playPageTurnSound = () => {
    const AudioContextConstructor = window.AudioContext
    if (!AudioContextConstructor) return
    const context = audioContextRef.current ?? new AudioContextConstructor()
    audioContextRef.current = context
    if (context.state === 'suspended') void context.resume()

    const duration = .42
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate)
    const channel = buffer.getChannelData(0)
    for (let index = 0; index < channel.length; index += 1) {
      const progress = index / channel.length
      channel[index] = (Math.random() * 2 - 1) * (1 - progress) ** 1.7
    }
    const source = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const volume = context.createGain()
    const now = context.currentTime
    source.buffer = buffer
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1450, now)
    filter.Q.value = .55
    volume.gain.setValueAtTime(.0001, now)
    volume.gain.exponentialRampToValueAtTime(.12, now + .045)
    volume.gain.exponentialRampToValueAtTime(.0001, now + duration)
    source.connect(filter).connect(volume).connect(context.destination)
    source.start(now)
    source.stop(now + duration)
  }

  const turnTo = (target: number) => {
    if (reduceMotion) { setScene(target); return }
    playPageTurnSound()
    setTurnId(current => current + 1)
    setPageTurning(true)
    setScene(target)
    window.setTimeout(() => setPageTurning(false), 1000)
  }

  const beginStory = () => setScene(1)
  const startPhotoStory = () => {
    playMusic()
    turnTo(2)
  }
  const goNext = () => turnTo(Math.min(scene + 1, lastScene))
  const goBack = () => turnTo(Math.max(scene - 1, 1))
  const showMusicControl = scene > 1

  return (
    <div className="app-shell">
      <div className="paper-grain" aria-hidden="true" />
      <audio ref={audioRef} src={soundtrackUrl} loop preload="metadata" onPause={() => setMusicPlaying(false)} onPlay={() => setMusicPlaying(true)} />
      {showMusicControl && <MusicControl playing={musicPlaying} label={birthdayContent.musicLabel} onToggle={toggleMusic} />}
      <AnimatePresence mode="wait" initial={false}>
        {scene === 0 ? (
          <WelcomeScene key="welcome" onBegin={beginStory} />
        ) : scene === 1 ? (
          <PreludeScene key="prelude" stage={preludeStage} onStageChange={onPreludeStageChange} onNext={startPhotoStory} />
        ) : scene <= lastPhotoScene ? (
          <MemoryScene
            key={`photo-${scene}`}
            memory={birthdayContent.photos[scene - 2]}
            index={scene - 2}
            total={birthdayContent.photos.length}
            onBack={goBack}
            onNext={goNext}
          />
        ) : (
          <LetterScene key="letter" onBack={goBack} onRestart={() => setScene(0)} />
        )}
      </AnimatePresence>
      <AnimatePresence>{pageTurning && <PageTurnOverlay key={`page-turn-${turnId}`} />}</AnimatePresence>
    </div>
  )
}

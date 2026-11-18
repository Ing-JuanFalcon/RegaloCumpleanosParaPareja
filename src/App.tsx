import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { birthdayContent, soundtrackUrl } from './content'
import { MusicControl } from './components/MusicControl'
import { WelcomeScene } from './scenes/WelcomeScene'
import { MemoryScene } from './scenes/MemoryScene'
import { LetterScene } from './scenes/LetterScene'

export default function App() {
  const [scene, setScene] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const lastScene = birthdayContent.photos.length + 1

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
    else { audio.pause(); setMusicPlaying(false) }
  }

  const goNext = () => setScene(current => Math.min(current + 1, lastScene))
  const goBack = () => setScene(current => Math.max(current - 1, 0))

  return (
    <div className="app-shell">
      <div className="paper-grain" aria-hidden="true" />
      <audio ref={audioRef} src={soundtrackUrl} loop preload="metadata" onPause={() => setMusicPlaying(false)} onPlay={() => setMusicPlaying(true)} />
      <MusicControl playing={musicPlaying} label={birthdayContent.musicLabel} onToggle={toggleMusic} />
      <AnimatePresence mode="wait" initial={false}>
        {scene === 0 ? (
          <WelcomeScene key="welcome" onBegin={() => { playMusic(); setScene(1) }} />
        ) : scene <= birthdayContent.photos.length ? (
          <MemoryScene
            key={`photo-${scene}`}
            memory={birthdayContent.photos[scene - 1]}
            index={scene - 1}
            total={birthdayContent.photos.length}
            onBack={goBack}
            onNext={goNext}
          />
        ) : (
          <LetterScene key="letter" onBack={goBack} onRestart={() => setScene(0)} />
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { birthdayContent, characterAssets, soundtrackUrl } from './content'
import { MusicControl } from './components/MusicControl'
import { PageTurnOverlay } from './components/PageTurnOverlay'
import { WelcomeScene } from './scenes/WelcomeScene'
import { PreludeScene } from './scenes/PreludeScene'
import { LoadingScene } from './scenes/LoadingScene'
import { TransitionScene } from './scenes/TransitionScene'
import { MemoryScene } from './scenes/MemoryScene'
import { LetterScene } from './scenes/LetterScene'
import { CollageScene } from './scenes/CollageScene'
import { FinalScene } from './scenes/FinalScene'

const MUSIC_SCENES = new Set([3, 5, 7, 9, 11, 14, 15, 16])
const transitionPreloads = new Map<string, HTMLImageElement | HTMLVideoElement>()
const preloadTransition = (source: string) => {
  if (transitionPreloads.has(source)) return
  if (source.endsWith('.webm')) {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.src = source
    transitionPreloads.set(source, video)
  } else {
    const image = new Image()
    image.decoding = 'async'
    image.fetchPriority = 'low'
    image.src = source
    transitionPreloads.set(source, image)
  }
}
const extraMemory = {
  image: characterAssets.extraPhoto,
  alt: 'Una foto de los dos juntos, antes del último recuerdo',
  title: 'MI mero mole',
  message: 'Una serie de eventos nos llevaron al día de hoy. Mi niña creció y aún tiene una vida por delante que, estoy seguro, nos llenará de sorpresas. Ya lo tengo todo contigo, pero aún vamos por más.',
  caption: 'nuestra historia continúa',
}

export default function App() {
  const [scene, setScene] = useState(0)
  const [preludeStage, setPreludeStage] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [pageTurning, setPageTurning] = useState(false)
  const [turnId, setTurnId] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const reduceMotion = useReducedMotion()
  const onPreludeStageChange = useCallback((stage: number) => setPreludeStage(stage), [])
  const onSongFound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.muted = false
    audio.volume = 0.7
    if (audio.paused) void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false))
  }, [])

  const playMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    audio.volume = 0.7
    void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false))
  }

  const primeMusicSilently = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.volume = 0.7
    audio.muted = true
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

  const beginStory = () => {
    primeMusicSilently()
    setPreludeStage(0)
    setScene(1)
  }
  const startPhotoStory = () => {
    if (audioRef.current?.paused) playMusic()
    turnTo(2)
  }
  const resetStory = () => {
    const audio = audioRef.current
    if (audio) { audio.pause(); audio.currentTime = 0; audio.muted = true }
    setMusicPlaying(false)
    setPreludeStage(0)
    setScene(0)
  }
  const nextFromPhoto = () => {
    const nextScene: Record<number, number> = { 3: 4, 5: 6, 7: 8, 9: 10, 11: 12 }
    turnTo(nextScene[scene] ?? scene)
  }
  const backFromPhoto = () => {
    const previousScene: Record<number, number> = { 3: 1, 5: 3, 7: 5, 9: 7, 11: 10 }
    turnTo(previousScene[scene] ?? 0)
  }
  const showMusicControl = MUSIC_SCENES.has(scene)

  const onBabyTransitionDone = useCallback(() => { preloadTransition(characterAssets.afterGrowing); setScene(5) }, [])
  const onGrowingTransitionDone = useCallback(() => { preloadTransition(characterAssets.afterFamily); setScene(7) }, [])
  const onFamilyTransitionDone = useCallback(() => { preloadTransition(characterAssets.afterTogether); setScene(9) }, [])
  const onCoupleTransitionDone = useCallback(() => { preloadTransition(characterAssets.afterFinalPhoto); setScene(11) }, [])
  const onLastTransitionDone = useCallback(() => setScene(13), [])
  const onBabyLoadingDone = useCallback(() => { preloadTransition(characterAssets.afterBaby); setScene(3) }, [])
  const onLetterLoadingDone = useCallback(() => setScene(14), [])

  return (
    <div className="app-shell">
      <div className="paper-grain" aria-hidden="true" />
      <audio ref={audioRef} src={soundtrackUrl} loop preload="none" onPause={() => setMusicPlaying(false)} onPlay={() => setMusicPlaying(true)} />
      {showMusicControl && <MusicControl playing={musicPlaying} label={birthdayContent.musicLabel} onToggle={toggleMusic} />}
      <AnimatePresence mode="wait">
        {scene === 0 ? (
          <WelcomeScene key="welcome" onBegin={beginStory} />
        ) : scene === 1 ? (
          <PreludeScene key="prelude" stage={preludeStage} onStageChange={onPreludeStageChange} onSongFound={onSongFound} onNext={startPhotoStory} onBack={() => turnTo(0)} />
        ) : scene === 2 || scene === 13 ? (
          <LoadingScene key={`loading-${scene}`} onDone={scene === 2 ? onBabyLoadingDone : onLetterLoadingDone} />
        ) : scene === 4 ? (
          <TransitionScene key="transition-baby" image={characterAssets.afterBaby} poster={characterAssets.posters.afterBaby} duration={7200} chapter="Un momento de ternura" onDone={onBabyTransitionDone} onBack={() => turnTo(3)} />
        ) : scene === 6 ? (
          <TransitionScene key="transition-growing" video={characterAssets.afterGrowing} poster={characterAssets.posters.afterGrowing} duration={18870} chapter="Un abrazo lleno de cariño" onDone={onGrowingTransitionDone} onBack={() => turnTo(5)} />
        ) : scene === 8 ? (
          <TransitionScene key="transition-family" video={characterAssets.afterFamily} poster={characterAssets.posters.afterFamily} duration={8800} chapter="Un recuerdo lleno de amor" onDone={onFamilyTransitionDone} onBack={() => turnTo(7)} />
        ) : scene === 10 ? (
          <TransitionScene key="transition-couple" video={characterAssets.afterTogether} poster={characterAssets.posters.afterTogether} loop duration={9120} chapter="Un momento para los dos" onDone={onCoupleTransitionDone} onBack={() => turnTo(9)} />
        ) : scene === 12 ? (
          <TransitionScene key="transition-last" video={characterAssets.afterFinalPhoto} poster={characterAssets.posters.afterFinalPhoto} duration={6660} chapter="Un último destello" onDone={onLastTransitionDone} onBack={() => turnTo(11)} />
        ) : [3, 5, 7, 9, 11].includes(scene) ? (
          <MemoryScene
            key={`photo-${scene}`}
            memory={scene === 11 ? extraMemory : birthdayContent.photos[scene === 3 ? 0 : scene === 5 ? 1 : scene === 7 ? 2 : 3]}
            index={scene === 3 ? 0 : scene === 5 ? 1 : scene === 7 ? 2 : scene === 9 ? 3 : 4}
            total={birthdayContent.photos.length + 1}
            onBack={backFromPhoto}
            onNext={nextFromPhoto}
          />
        ) : scene === 14 ? (
          <LetterScene key="letter" onBack={() => turnTo(12)} onNext={() => turnTo(15)} />
        ) : scene === 15 ? (
          <CollageScene key="collage" onBack={() => turnTo(14)} onFinish={() => turnTo(16)} />
        ) : (
          <FinalScene key="final" onBack={() => turnTo(15)} onRestart={resetStory} />
        )}
      </AnimatePresence>
      <AnimatePresence>{pageTurning && <PageTurnOverlay key={`page-turn-${turnId}`} />}</AnimatePresence>
    </div>
  )
}





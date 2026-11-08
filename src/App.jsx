import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import loveConfig, { musicUrl } from './config/loveConfig'
import { useAudio } from './hooks/useAudio'
import PageTransition from './components/PageTransition'
import Navigation from './components/Navigation'
import MusicPlayer from './components/MusicPlayer'
import Welcome from './pages/Welcome'
import FavouriteLight from './pages/FavouriteLight'
import LanternMessage from './pages/LanternMessage'
import LightTogether from './pages/LightTogether'
import Forever from './pages/Forever'

const PAGES = [Welcome, FavouriteLight, LanternMessage, LightTogether, Forever]
const LAST = PAGES.length - 1

export default function App() {
  const [chapter, setChapter] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [run, setRun] = useState(0) // bumps on replay to remount everything fresh
  const audio = useAudio(musicUrl, { volume: loveConfig.music.volume })

  useEffect(() => {
    document.title = loveConfig.siteTitle
  }, [])

  const go = useCallback((i) => {
    setChapter(i)
    setFurthest((f) => Math.max(f, i))
  }, [])

  const next = useCallback(() => {
    // first tap = a user gesture, so it's safe to start the music (never autoplays on load)
    if (chapter === 0) audio.play({ silent: true })
    go(Math.min(chapter + 1, LAST))
  }, [chapter, audio, go])

  const replay = useCallback(() => {
    setFurthest(0)
    setChapter(0)
    setRun((r) => r + 1)
  }, [])

  const Page = PAGES[chapter]

  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransition key={`${run}-${chapter}`}>
          <Page onNext={next} onReplay={replay} />
        </PageTransition>
      </AnimatePresence>

      <Navigation chapters={loveConfig.chapters} current={chapter} furthest={furthest} onGo={go} />
      <MusicPlayer audio={audio} label={loveConfig.music.label} />
    </>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Background music controller.
 * - Never autoplays: playback only starts from a user gesture (`play`/`toggle`).
 * - Gracefully handles a missing/unsupported file (`available` becomes false).
 */
export function useAudio(src, { volume = 0.5, loop = true } = {}) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [available, setAvailable] = useState(Boolean(src))
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!src) {
      setAvailable(false)
      return undefined
    }
    const audio = new Audio()
    audio.src = src
    audio.loop = loop
    audio.preload = 'none'
    audio.volume = volume
    audio.addEventListener('error', () => {
      setAvailable(false)
      setPlaying(false)
    })
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))
    audioRef.current = audio
    setAvailable(true)
    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [src, loop, volume])

  const flash = useCallback((msg) => {
    setNotice(msg)
    window.clearTimeout(flash.t)
    flash.t = window.setTimeout(() => setNotice(''), 4200)
  }, [])

  // `silent` is used for the automatic start on her first tap: no notice if music is missing.
  const play = useCallback(
    async ({ silent = false } = {}) => {
      const audio = audioRef.current
      if (!audio || !available) {
        if (!silent) flash('No music file added yet — see the README to add your song.')
        return false
      }
      try {
        await audio.play()
        return true
      } catch {
        setAvailable(false)
        if (!silent) flash('Music file could not be played. Check the file name in loveConfig.js.')
        return false
      }
    },
    [available, flash],
  )

  const pause = useCallback(() => audioRef.current?.pause(), [])

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m
      if (audioRef.current) audioRef.current.muted = next
      return next
    })
  }, [])

  return { playing, muted, available, notice, play, pause, toggle, toggleMute }
}

import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react'

/** Persistent play/pause + mute controls, bottom-right on every chapter. */
export default function MusicPlayer({ audio, label }) {
  const { playing, muted, notice, toggle, toggleMute } = audio

  return (
    <div
      className="fixed right-3 z-50 flex flex-col items-end gap-2"
      style={{ top: 'calc(env(safe-area-inset-top) + 8px)' }}
    >
      <div className="flex items-center gap-2">
        {playing && (
          <span className="hidden items-center gap-1.5 font-sans text-[11px] text-cream/60 sm:flex">
            <Music size={13} /> {label}
          </span>
        )}
        <button
          type="button"
          className="icon-btn !h-10 !w-10"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          title={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          type="button"
          className="icon-btn !h-10 !w-10"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      <AnimatePresence>
        {notice && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-[230px] rounded-2xl border border-gold/40 bg-plum/90 px-3.5 py-2.5 font-sans text-xs leading-snug text-cream/90 backdrop-blur"
          >
            {notice}
          </motion.p>
        )}
      </AnimatePresence>

    </div>
  )
}

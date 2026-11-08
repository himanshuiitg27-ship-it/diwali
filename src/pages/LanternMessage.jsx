import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import loveConfig from '../config/loveConfig'
import Lantern from '../components/Lantern'
import Fireworks from '../components/Fireworks'
import FloatingParticles from '../components/FloatingParticles'
import RevealLines from '../components/RevealLines'
import SparkleBurst from '../components/SparkleBurst'

export default function LanternMessage({ onNext }) {
  const c = loveConfig.lantern
  const [glow, setGlow] = useState(0.4)
  const [touched, setTouched] = useState(false)
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  const touchLantern = () => {
    setTouched(true)
    // intensify gradually over a few steps
    let v = glow
    const id = setInterval(() => {
      v = Math.min(1, v + 0.12)
      setGlow(v)
      if (v >= 1) clearInterval(id)
    }, 220)
  }

  return (
    <div className="stage bg-lantern">
      <FloatingParticles dust={60} stars={18} />
      <Fireworks auto intensity={0.9} interval={[2000, 3600]} zones={[[0.03, 0.24], [0.76, 0.97]]} />

      {/* warm wash that grows as the lantern brightens */}
      <motion.div className="warm-wash" initial={{ opacity: 0 }} animate={{ opacity: touched ? glow : 0 }} transition={{ duration: 1.2 }} />

      <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full flex-col items-center justify-start px-6 pt-[4.5rem] text-center sm:pt-20">
        <div className="relative">
          <Lantern intensity={glow} size="clamp(110px, 19vh, 200px)" onClick={touchLantern} label="Touch the lantern" />
          {touched && <SparkleBurst key="l" count={18} radius={120} />}
        </div>

        <AnimatePresence>
          {!touched && ready && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="mt-1 font-sans text-[11px] uppercase tracking-[0.3em] text-warm-gold"
            >
              {c.hint}
            </motion.p>
          )}
        </AnimatePresence>

        <RevealLines
          className="mt-4 flex flex-col items-center gap-1.5"
          start={0.6}
          gap={1.6}
          onDone={done}
          lines={[
            { text: c.lines[0], className: 'font-serifsoft text-2xl italic text-cream/85 sm:text-3xl' },
            { text: c.lines[1], className: 'text-gold-gradient font-display text-4xl font-semibold sm:text-5xl' },
            { text: c.lines[2], className: 'mt-2 font-serifsoft text-xl text-cream/85 sm:text-2xl' },
            { text: c.lines[3], className: 'font-script text-3xl text-rose sm:text-4xl' },
          ]}
        />

        <div className="mt-4 min-h-[4rem] max-w-sm">
          <AnimatePresence>
            {touched && glow > 0.7 && (
              <motion.p
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4 }}
                className="glow-text font-serifsoft text-xl italic text-cream sm:text-2xl"
              >
                “{c.hiddenMessage}”
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 pb-10">
          <AnimatePresence>
            {ready && (
              <motion.button
                type="button"
                className="btn-gold"
                onClick={onNext}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                {c.button}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  )
}

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import loveConfig from '../config/loveConfig'
import Diya from '../components/Diya'
import Rangoli from '../components/Rangoli'
import Fireworks from '../components/Fireworks'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import CursorGlow from '../components/CursorGlow'
import RevealLines from '../components/RevealLines'
import SparkleBurst from '../components/SparkleBurst'

export default function FavouriteLight({ onNext }) {
  const c = loveConfig.favouriteLight
  const fw = useRef(null)
  const [boosted, setBoosted] = useState(false)
  const [burst, setBurst] = useState(0)
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  const touchDiya = () => {
    setBoosted(true)
    setBurst((n) => n + 1)
    fw.current?.launch(0.5, 0.2)
    setTimeout(() => setBoosted(false), 2600)
  }

  const [l1, l2, l3] = c.lines

  return (
    <div className="stage bg-light">
      <CursorGlow />
      <FloatingParticles dust={40} stars={26} />
      <Fireworks ref={fw} auto intensity={1} interval={[1500, 2800]} zones={[[0.03, 0.26], [0.74, 0.97]]} />
      <FloatingHearts ambient every={5200} burstKey={0} />

      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ width: 'min(100vmin, 640px)', height: 'min(100vmin, 640px)', bottom: 'calc(min(100vmin, 640px) * -0.54)' }}
      >
        <Rangoli className="h-full w-full" opacity={0.8} />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Diya
            lit
            boost={boosted ? 1.8 : 1.15}
            size={230}
            onClick={touchDiya}
            label="Touch the diya to make its flame brighter"
          />
          {burst > 0 && <SparkleBurst key={burst} count={20} radius={130} />}
        </motion.div>

        <RevealLines
          className="mt-4 flex min-h-[9.5rem] flex-col items-center gap-2"
          start={0.9}
          gap={1.7}
          onDone={done}
          lines={[
            { text: l1, className: 'font-serifsoft text-2xl italic text-cream/85 sm:text-3xl' },
            { text: l2, className: 'font-serifsoft text-2xl italic text-cream/85 sm:text-3xl' },
            { text: l3, className: 'text-gold-gradient font-display text-[2.3rem] font-semibold leading-tight sm:text-6xl' },
          ]}
        />

        <div className="mt-6 h-16">
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
  )
}

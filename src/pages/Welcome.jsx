import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import loveConfig from '../config/loveConfig'
import Diya from '../components/Diya'
import Rangoli from '../components/Rangoli'
import Fireworks from '../components/Fireworks'
import FloatingParticles from '../components/FloatingParticles'
import SparkleBurst from '../components/SparkleBurst'

export default function Welcome({ onNext }) {
  const c = loveConfig.welcome
  const fw = useRef(null)
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    // golden particles spread across the whole screen, then cinematic hand-off
    fw.current?.finale(9, 1400)
    setTimeout(onNext, 1900)
  }

  return (
    <div className="stage bg-welcome">
      <FloatingParticles dust={46} stars={50} />
      <Fireworks ref={fw} auto intensity={0.7} interval={[2800, 4600]} zones={[[0.06, 0.3], [0.7, 0.94]]} />

      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ width: 'min(96vmin, 640px)', height: 'min(96vmin, 640px)', bottom: 'calc(min(96vmin, 640px) * -0.5)' }}
      >
        <Rangoli className="h-full w-full" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {c.showNameGreeting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="mb-2 font-script text-3xl text-rose"
          >
            {c.greetingPrefix} {loveConfig.herName}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Diya lit boost={opening ? 1.7 : 1} size={170} label="Your diya" />
          {opening && <SparkleBurst count={22} radius={150} />}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.7, duration: 1.4 }}
          className="glow-text mt-6 max-w-xl font-display text-[1.9rem] font-semibold leading-tight text-cream sm:text-5xl"
        >
          {c.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.3 }}
          className="mt-4 max-w-md font-serifsoft text-xl italic text-cream/85 sm:text-2xl"
        >
          {c.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mt-9"
        >
          <button type="button" className="btn-gold" onClick={open} disabled={opening}>
            {c.button}
          </button>
        </motion.div>
      </div>

      <p
        className="absolute left-0 right-0 z-10 text-center font-sans text-[11px] tracking-wider text-cream/80 [text-shadow:0_1px_6px_rgba(20,8,28,0.95)]"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}
      >
        {c.footer}
      </p>
    </div>
  )
}

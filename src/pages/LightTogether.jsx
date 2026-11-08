import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import loveConfig from '../config/loveConfig'
import Diya from '../components/Diya'
import Rangoli from '../components/Rangoli'
import Fireworks from '../components/Fireworks'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import SparkleBurst from '../components/SparkleBurst'

export default function LightTogether({ onNext }) {
  const c = loveConfig.lightTogether
  const messages = c.diyaMessages
  const total = messages.length
  const fw = useRef(null)

  // spread the pre-lit diyas evenly around the circle
  const initial = useMemo(() => {
    const set = new Set()
    const n = Math.min(c.initiallyLit, total - 1)
    for (let i = 0; i < n; i += 1) set.add(Math.floor((i * total) / Math.max(n, 1) + total / (2 * Math.max(n, 1))) % total)
    return set
  }, [c.initiallyLit, total])

  const [lit, setLit] = useState(initial)
  const [active, setActive] = useState(null) // { idx, key }
  const [burstKey, setBurstKey] = useState(0)
  const [heartKey, setHeartKey] = useState(0)
  const allLit = lit.size === total

  const light = (idx) => {
    setLit((prev) => {
      if (prev.has(idx)) return prev
      const next = new Set(prev)
      next.add(idx)
      return next
    })
    setActive({ idx, key: Date.now() })
    setBurstKey((k) => k + 1)
    setHeartKey((k) => k + 1)
  }

  // finale when the last diya is lit
  const celebrated = useRef(false)
  useEffect(() => {
    if (allLit && !celebrated.current) {
      celebrated.current = true
      const id = setTimeout(() => fw.current?.finale(20, 4500), 500)
      return () => clearTimeout(id)
    }
    return undefined
  }, [allLit])

  // circular layout (percentages of the square container)
  const R = 39
  const positions = useMemo(
    () =>
      messages.map((_, i) => {
        const a = (Math.PI * 2 * i) / total - Math.PI / 2
        return { left: 50 + R * Math.cos(a), top: 50 + R * Math.sin(a) }
      }),
    [messages, total],
  )

  const unlitCount = total - lit.size

  return (
    <div className="stage bg-together">
      <FloatingParticles dust={44} stars={30} />
      <Fireworks ref={fw} auto={false} intensity={1.2} />
      <FloatingHearts ambient={false} burstKey={heartKey} burstCount={allLit ? 18 : 3} />

      <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full flex-col items-center px-5 pb-6 pt-[4.75rem] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="glow-text max-w-xl font-display text-[1.6rem] font-semibold leading-tight text-cream sm:text-4xl"
          >
            {c.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.2 }}
            className="mt-2 max-w-md font-serifsoft text-base italic text-cream/80 sm:text-xl"
          >
            {c.subheading}
          </motion.p>

          {/* circle of diyas */}
          <div
            className="relative mb-3 mt-7 aspect-square flex-shrink-0"
            style={{ width: 'min(88vw, 46vh, 460px)' }}
          >
            <div className="pointer-events-none absolute inset-[-8%]">
              <Rangoli className="h-full w-full" opacity={allLit ? 1 : 0.62} />
            </div>

            {/* centre diya */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Diya lit boost={allLit ? 1.7 : 1.05} size={96} label="Centre diya" />
            </div>

            {messages.map((msg, i) => {
              const isLit = lit.has(i)
              return (
                <div
                  key={msg}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${positions[i].left}%`, top: `${positions[i].top}%` }}
                >
                  <motion.div
                    animate={isLit ? { y: 0 } : { y: [0, -3, 0] }}
                    transition={isLit ? {} : { duration: 2.6 + (i % 3) * 0.4, repeat: Infinity }}
                    className="relative"
                  >
                    <Diya
                      lit={isLit}
                      boost={1}
                      size={58}
                      onClick={() => (isLit ? setActive({ idx: i, key: Date.now() }) : light(i))}
                      label={isLit ? `Diya ${i + 1}, lit — read its message` : `Light diya ${i + 1}`}
                    />
                    {active?.idx === i && isLit && <SparkleBurst key={`${burstKey}-${active.key}`} count={10} radius={60} hearts />}
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* message / status area */}
          <div className="flex min-h-[6.5rem] max-w-sm flex-col items-center justify-start">
            <AnimatePresence mode="wait">
              {allLit ? (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4 }}
                >
                  <p className="text-gold-gradient font-display text-2xl font-semibold leading-snug sm:text-3xl">{c.allLitMessage}</p>
                </motion.div>
              ) : active ? (
                <motion.p
                  key={active.key}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-script text-3xl leading-snug text-rose sm:text-4xl"
                >
                  {messages[active.idx]}
                </motion.p>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                  className="font-sans text-[11px] uppercase tracking-[0.3em] text-warm-gold"
                >
                  {c.hint}
                </motion.p>
              )}
            </AnimatePresence>

            {!allLit && (
              <p className="mt-3 font-sans text-[11px] tracking-widest text-cream/50">
                {lit.size} / {total} lit · {unlitCount} to go
              </p>
            )}
          </div>

          <div className="mt-2 h-14">
            <AnimatePresence>
              {allLit && (
                <motion.button
                  type="button"
                  className="btn-gold"
                  onClick={onNext}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 1 }}
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

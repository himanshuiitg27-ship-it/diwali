import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import loveConfig, { resolvePhoto } from '../config/loveConfig'
import Diya from '../components/Diya'
import Fireworks from '../components/Fireworks'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import HeartLights from '../components/HeartLights'

const rand = (a, b) => a + Math.random() * (b - a)
const DIYA_ROW = 5

export default function Forever({ onReplay }) {
  const c = loveConfig.forever
  const fullText = useMemo(() => c.letter.join('\n\n'), [c.letter])
  const [n, setN] = useState(0)
  const [started, setStarted] = useState(false)
  const [finale, setFinale] = useState(false)
  const [litCount, setLitCount] = useState(1)
  const [heartKey, setHeartKey] = useState(0)
  const fw = useRef(null)
  const endRef = useRef(null)
  const typedDone = n >= fullText.length

  const petals = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: `${rand(4, 94)}%`,
        size: rand(10, 18),
        dur: `${rand(13, 22)}s`,
        delay: `${-rand(0, 18)}s`,
        sway: `${rand(-70, 70)}px`,
        spin: `${rand(240, 600)}deg`,
      })),
    [],
  )

  // typewriter
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2400)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (!started || typedDone) return undefined
    const id = setInterval(() => setN((v) => Math.min(fullText.length, v + 1)), c.typingSpeedMs)
    return () => clearInterval(id)
  }, [started, typedDone, fullText.length, c.typingSpeedMs])

  // keep the newest text in view
  const paragraphCount = fullText.slice(0, n).split('\n\n').length
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [paragraphCount, typedDone])

  const paragraphs = fullText.slice(0, n).split('\n\n')

  const lightForever = () => {
    if (finale) return
    setFinale(true)
    setHeartKey((k) => k + 1)
    fw.current?.finale(34, 8000)
    // light every diya, one after another
    const total = DIYA_ROW
    for (let i = 1; i < total; i += 1) setTimeout(() => setLitCount((v) => Math.max(v, i + 1)), 350 * i)
    setTimeout(() => setHeartKey((k) => k + 1), 3500)
  }

  const photos = (loveConfig.photos || []).filter((p) => resolvePhoto(p.file))
  const memories = loveConfig.memories || []

  return (
    <div className="stage bg-forever">
      <FloatingParticles dust={56} stars={34} direction="down" />
      <Fireworks auto intensity={0.6} interval={[3200, 5200]} zones={[[0.05, 0.3], [0.7, 0.95]]} />

      {/* rose petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{ left: p.left, width: p.size, height: p.size, '--dur': p.dur, '--delay': p.delay, '--sway': p.sway, '--spin': p.spin }}
          />
        ))}
      </div>

      {/* letter */}
      <div className="stage-scroll relative z-10 h-full">
        <div className="mx-auto flex min-h-full max-w-xl flex-col items-center px-6 pb-56 pt-16 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6 }}>
            <HeartLights size={132} bright={finale} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 1.4 }}
            className="text-gold-gradient mt-4 font-display text-[1.7rem] font-semibold leading-tight sm:text-4xl"
          >
            {c.title}
          </motion.h1>

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: started ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            onClick={() => setN(fullText.length)}
            aria-label="Love letter (tap to show it all)"
            className="mt-7 w-full rounded-3xl border border-gold/25 bg-plum/45 px-6 py-7 text-left shadow-[0_0_50px_rgba(255,199,107,0.08)] backdrop-blur-[3px]"
          >
            {paragraphs.map((p, i) => {
              const last = i === paragraphs.length - 1
              const script = i === 0 || i >= c.letter.length - 2
              return (
                <p
                  key={i}
                  className={`${script ? 'font-script text-[1.7rem] text-rose' : 'font-serifsoft text-[1.2rem] leading-relaxed text-cream/95 sm:text-[1.3rem]'} ${i ? 'mt-4' : ''} ${last && !typedDone ? 'caret' : ''}`}
                >
                  {p}
                </p>
              )
            })}
          </motion.article>

          <AnimatePresence>
            {typedDone && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4 }}
                className="mt-8 flex flex-col items-center gap-7"
              >
                {(photos.length > 0 || memories.length > 0) && (
                  <div className="grid w-full grid-cols-2 gap-3">
                    {photos.map((p) => (
                      <figure key={p.file} className="overflow-hidden rounded-2xl border border-gold/30">
                        <img src={resolvePhoto(p.file)} alt={p.caption || ''} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                        {p.caption && <figcaption className="bg-plum/70 px-2 py-1.5 font-script text-lg text-cream">{p.caption}</figcaption>}
                      </figure>
                    ))}
                    {memories.map((m) => (
                      <div key={m.title} className="rounded-2xl border border-gold/30 bg-plum/55 p-3 text-left">
                        <p className="font-display text-sm text-warm-gold">{m.title}</p>
                        {m.date && <p className="font-sans text-[10px] text-cream/50">{m.date}</p>}
                        <p className="mt-1 font-serifsoft text-base text-cream/90">{m.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="glow-text max-w-sm font-serifsoft text-xl italic text-cream sm:text-2xl">{c.closingLine}</p>

                <button type="button" className="btn-gold" onClick={lightForever} disabled={finale}>
                  {c.button}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
      </div>

      {/* bottom diya row — glowing from the start, all ignite on the finale */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[32] flex items-end justify-center gap-3 bg-gradient-to-t from-[#0b0510] via-[#0b0510]/90 to-transparent px-4 pt-10 sm:gap-6"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 10px)' }}
      >
        {Array.from({ length: DIYA_ROW }).map((_, i) => {
          const centre = i === Math.floor(DIYA_ROW / 2)
          // light the centre first, then the rest in order
          const order = centre ? 0 : i < Math.floor(DIYA_ROW / 2) ? i + 1 : i
          const lit = centre || (finale && litCount > order)
          return <Diya key={i} lit={lit} boost={finale ? 1.3 : 1} size={centre ? 74 : 58} />
        })}
      </div>

      {/* final reveal */}
      <AnimatePresence>
        {finale && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.8 }}
            className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-center overflow-y-auto px-7 text-center"
            style={{
              bottom: 0,
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 100px)',
              background: 'radial-gradient(ellipse at center, #1a0b24 0%, #0b0510 100%)',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 2.4, duration: 1.8 }}
              className="max-w-md font-serifsoft text-2xl italic leading-snug text-cream/90 sm:text-3xl"
            >
              {c.finalMessage[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 4.6, duration: 2 }}
              className="text-gold-gradient mt-5 font-display text-4xl font-semibold leading-tight sm:text-6xl"
            >
              {c.finalMessage[1]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1.8 }}
              className="mt-8 max-w-sm font-script text-2xl text-rose sm:text-3xl"
            >
              {c.theme}
            </motion.p>
            <motion.button
              type="button"
              className="btn-ghost mt-8"
              onClick={onReplay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8.2, duration: 1.2 }}
            >
              <RotateCcw size={16} /> {c.replayButton}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* finale layers sit above everything */}
      <Fireworks ref={fw} auto={false} intensity={1.4} className="z-[35]" />
      <FloatingHearts ambient={false} burstKey={heartKey} burstCount={22} className="z-[36]" />
    </div>
  )
}


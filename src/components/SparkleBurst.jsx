import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * A one-shot burst of golden sparkles/hearts radiating from its parent's centre.
 * Mount it with a new `key` each time to replay.
 */
export default function SparkleBurst({ count = 14, radius = 90, hearts = false }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const r = radius * (0.55 + Math.random() * 0.7)
        return {
          i,
          x: Math.cos(a) * r,
          y: Math.sin(a) * r - 12,
          s: 0.6 + Math.random() * 0.9,
          glyph: hearts && i % 3 === 0 ? '❤' : '✦',
          color: hearts && i % 3 === 0 ? '#EFA6B8' : i % 2 ? '#FFC76B' : '#FFF2DC',
        }
      }),
    [count, radius, hearts],
  )

  return (
    <span className="pointer-events-none absolute left-1/2 top-1/3 h-0 w-0" aria-hidden>
      {items.map((p) => (
        <motion.span
          key={p.i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: p.s }}
          transition={{ duration: 1.1 + Math.random() * 0.5, ease: 'easeOut' }}
          style={{ position: 'absolute', color: p.color, fontSize: 16, textShadow: '0 0 10px currentColor' }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </span>
  )
}

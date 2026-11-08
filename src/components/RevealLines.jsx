import { useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Cinematic line-by-line reveal.
 * `lines` can be strings or { text, className } objects.
 * Calls onDone after the last line has finished appearing.
 */
export default function RevealLines({ lines, className = '', start = 0.4, gap = 1.5, duration = 0.8, onDone }) {
  useEffect(() => {
    if (!onDone) return undefined
    const id = setTimeout(onDone, (start + gap * (lines.length - 1) + duration) * 1000)
    return () => clearTimeout(id)
  }, [lines.length, start, gap, duration, onDone])

  return (
    <div className={className}>
      {lines.map((line, i) => {
        const item = typeof line === 'string' ? { text: line } : line
        return (
          <motion.p
            key={item.text}
            className={item.className}
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: start + gap * i, duration, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.text}
          </motion.p>
        )
      })}
    </div>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'

const rand = (a, b) => a + Math.random() * (b - a)

/**
 * Floating hearts that rise and fade.
 *  - ambient: add a heart every `every` ms (occasional, subtle)
 *  - burstKey / burstCount: change burstKey to release a flurry
 */
export default function FloatingHearts({ ambient = true, every = 4200, burstKey = 0, burstCount = 14, className = '' }) {
  const [hearts, setHearts] = useState([])
  const idRef = useRef(0)

  const add = useCallback((n = 1, spread = 1) => {
    setHearts((prev) => {
      const next = [...prev]
      for (let i = 0; i < n; i += 1) {
        idRef.current += 1
        next.push({
          id: idRef.current,
          left: rand(8, 92),
          size: rand(14, 30) * spread,
          dur: rand(5.5, 9),
          drift: rand(-50, 50),
          rot: rand(-25, 25),
          delay: i * rand(0.05, 0.28),
          emoji: Math.random() < 0.8 ? '❤' : '✨',
          color: Math.random() < 0.6 ? '#EFA6B8' : '#ff7d9c',
        })
      }
      return next.slice(-60)
    })
  }, [])

  useEffect(() => {
    if (!ambient) return undefined
    const id = setInterval(() => add(1), every)
    return () => clearInterval(id)
  }, [ambient, every, add])

  useEffect(() => {
    if (burstKey) add(burstCount, 1.15)
  }, [burstKey, burstCount, add])

  const remove = (id) => setHearts((prev) => prev.filter((h) => h.id !== id))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          onAnimationEnd={() => remove(h.id)}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.color,
            '--dur': `${h.dur}s`,
            '--drift': `${h.drift}px`,
            '--rot': `${h.rot}deg`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

import { useMemo } from 'react'

/** A heart outlined and filled with tiny twinkling golden lights. */
export default function HeartLights({ size = 150, bright = false }) {
  const dots = useMemo(() => {
    const pts = []
    const heart = (t) => ({
      x: 16 * Math.sin(t) ** 3,
      y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
    })
    // outline
    for (let i = 0; i < 64; i += 1) pts.push({ ...heart((Math.PI * 2 * i) / 64), r: 0.85, d: (i % 16) * 0.18 })
    // inner rings (scaled copies) to fill the heart
    ;[0.74, 0.48, 0.22].forEach((k, ri) => {
      const n = 40 - ri * 12
      for (let i = 0; i < n; i += 1) {
        const p = heart((Math.PI * 2 * i) / n)
        pts.push({ x: p.x * k, y: p.y * k + 0.6, r: 0.55, d: ((i * 3 + ri * 5) % 17) * 0.17 })
      }
    })
    return pts
  }, [])

  return (
    <svg
      viewBox="-20 -19 40 38"
      width={size}
      height={size * 0.95}
      aria-hidden
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 0 ${bright ? 14 : 8}px rgba(255,199,107,${bright ? 0.9 : 0.6}))`,
        animation: 'pulse-heart 2.8s ease-in-out infinite',
        transition: 'filter 1s ease',
      }}
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={i % 5 === 0 ? '#FFF2DC' : '#FFC76B'}
          style={{ animation: `twinkle ${2 + (i % 5) * 0.4}s ease-in-out ${d.d}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}

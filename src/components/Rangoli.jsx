import { useMemo } from 'react'

const COLORS = ['#e83e8c', '#ff9f1c', '#ffd23f', '#2ec4b6', '#7b2cbf', '#f15bb5', '#ff6b35']

/**
 * A colourful radial rangoli drawn in SVG.
 * Usually positioned so only the top half is visible at the bottom of the page.
 */
export default function Rangoli({ size = 520, className = '', spin = true, opacity = 0.95 }) {
  const petals = useMemo(() => {
    const layers = []
    const rings = [
      { n: 16, r: 232, len: 52, w: 20, c: 0 },
      { n: 16, r: 198, len: 46, w: 17, c: 2 },
      { n: 12, r: 158, len: 52, w: 24, c: 1 },
      { n: 12, r: 118, len: 40, w: 18, c: 4 },
      { n: 8, r: 80, len: 38, w: 20, c: 5 },
    ]
    rings.forEach((ring, ri) => {
      for (let i = 0; i < ring.n; i += 1) {
        const angle = (360 / ring.n) * i + (ri % 2 ? 360 / ring.n / 2 : 0)
        layers.push({
          key: `${ri}-${i}`,
          angle,
          ...ring,
          color: COLORS[(i + ring.c) % COLORS.length],
        })
      }
    })
    return layers
  }, [])

  return (
    <svg
      viewBox="0 0 520 520"
      width={size}
      height={size}
      className={className}
      style={{ opacity, filter: 'drop-shadow(0 0 22px rgba(255,199,107,0.28))' }}
      aria-hidden
    >
      <g className={spin ? 'rangoli-spin' : ''}>
        <g transform="translate(260 260)">
        <circle r="250" fill="none" stroke="#ffd98a" strokeWidth="2" strokeDasharray="2 7" opacity="0.7" />
        {petals.map((p) => (
          <g key={p.key} transform={`rotate(${p.angle}) translate(0 ${-p.r})`}>
            <path
              d={`M0 ${p.len / 2} C${p.w} ${p.len / 4} ${p.w} ${-p.len / 3} 0 ${-p.len / 2} C${-p.w} ${-p.len / 3} ${-p.w} ${p.len / 4} 0 ${p.len / 2} Z`}
              fill={p.color}
              stroke="#fff2dc"
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />
            <circle cx="0" cy={p.len / 6} r="3" fill="#fff2dc" opacity="0.85" />
          </g>
        ))}
        {/* dot ring */}
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} r="2.4" fill="#fff2dc" transform={`rotate(${i * 10}) translate(0 -42)`} opacity="0.9" />
        ))}
        <circle r="24" fill="#ffc76b" />
        <circle r="14" fill="#e83e8c" />
        <circle r="6" fill="#fff2dc" />
        </g>
      </g>
    </svg>
  )
}

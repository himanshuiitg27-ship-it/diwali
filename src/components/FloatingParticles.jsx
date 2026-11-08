import { useRef } from 'react'
import { useCanvasLoop } from '../hooks/useCanvasLoop'

const rand = (a, b) => a + Math.random() * (b - a)

/**
 * Ambient canvas layer: drifting golden dust and twinkling stars.
 *  - direction: 'up' (dust floats up) | 'down' (falls like golden snow)
 *  - dust / stars: how many of each (auto-reduced on small screens)
 */
export default function FloatingParticles({ dust = 50, stars = 36, direction = 'up', className = '' }) {
  const ref = useRef(null)

  useCanvasLoop(ref, ({ ctx, size }) => {
    const small = window.innerWidth < 640
    const dustN = Math.round(dust * (small ? 0.6 : 1))
    const starN = Math.round(stars * (small ? 0.6 : 1))
    const sign = direction === 'down' ? 1 : -1

    const mk = (kind) => ({
      kind,
      x: Math.random() * size.w,
      y: Math.random() * size.h,
      r: kind === 'star' ? rand(0.6, 1.5) : rand(0.8, 2.6),
      vy: kind === 'star' ? 0 : rand(6, 22) * sign,
      vx: rand(-6, 6),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.6, 2),
    })
    const list = [...Array.from({ length: dustN }, () => mk('dust')), ...Array.from({ length: starN }, () => mk('star'))]

    return {
      frame(dt, now) {
        ctx.clearRect(0, 0, size.w, size.h)
        const t = now / 1000
        for (const p of list) {
          p.x += p.vx * dt
          p.y += p.vy * dt
          if (p.y < -6) p.y = size.h + 6
          if (p.y > size.h + 6) p.y = -6
          if (p.x < -6) p.x = size.w + 6
          if (p.x > size.w + 6) p.x = -6
          const tw = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase)
          if (p.kind === 'star') {
            ctx.globalAlpha = 0.25 + tw * 0.75
            ctx.fillStyle = '#FFF2DC'
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fill()
          } else {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
            g.addColorStop(0, `rgba(255,199,107,${0.55 + tw * 0.4})`)
            g.addColorStop(1, 'rgba(255,199,107,0)')
            ctx.globalAlpha = 1
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
      },
    }
  })

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full pointer-events-none ${className}`} aria-hidden />
}

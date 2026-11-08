import { useCallback } from 'react'
import { useCanvasLoop } from './useCanvasLoop'

const PALETTE = ['#FFC76B', '#FFD98A', '#D6A75C', '#FFF2DC', '#EFA6B8', '#FFB347']
const REDUCED = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const rand = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

/**
 * Canvas fireworks engine.
 *
 * options:
 *  - auto:      launch rockets on a timer
 *  - interval:  [minMs, maxMs] between automatic launches
 *  - zones:     array of [xMinFraction, xMaxFraction] that auto rockets may use
 *  - intensity: particle multiplier (0.5 subtle … 1.5 grand)
 *
 * Returns stable { launch(xFrac?, yFrac?), burst(x, y), finale(count, durationMs) }.
 */
export function useFireworks(canvasRef, { auto = false, interval = [1800, 3400], zones = [[0.08, 0.92]], intensity = 1 } = {}) {
  const apiRef = useCanvasLoop(canvasRef, ({ ctx, size }) => {
    const rockets = []
    const sparks = []
    const timers = new Set()
    let nextAuto = performance.now() + rand(600, 1400)
    const maxSparks = window.innerWidth < 640 ? 360 : 700
    const reduced = REDUCED()

    const explode = (x, y, colorSet) => {
      const base = pick(colorSet)
      const count = Math.round((window.innerWidth < 640 ? 46 : 70) * intensity)
      const ring = Math.random() < 0.35
      for (let i = 0; i < count && sparks.length < maxSparks; i += 1) {
        const a = (Math.PI * 2 * i) / count + rand(-0.05, 0.05)
        const speed = ring ? rand(110, 125) : rand(40, 150)
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 0,
          max: rand(1.0, 1.9),
          color: Math.random() < 0.7 ? base : pick(colorSet),
          size: rand(1.1, 2.3),
        })
      }
    }

    const launchRocket = (xFrac, yFrac, colors = PALETTE) => {
      const x = (xFrac ?? rand(0.1, 0.9)) * size.w
      const targetY = (yFrac ?? rand(0.12, 0.42)) * size.h
      rockets.push({ x, y: size.h + 10, tx: x + rand(-18, 18), ty: targetY, speed: rand(420, 560), colors })
    }

    return {
      frame(dt, now) {
        // fade previous frame (transparent trails)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'rgba(0,0,0,0.22)'
        ctx.fillRect(0, 0, size.w, size.h)
        ctx.globalCompositeOperation = 'lighter'

        if (auto && !reduced && now > nextAuto) {
          const zone = pick(zones)
          launchRocket(rand(zone[0], zone[1]))
          nextAuto = now + rand(interval[0], interval[1])
        }

        for (let i = rockets.length - 1; i >= 0; i -= 1) {
          const r = rockets[i]
          const dx = r.tx - r.x
          const dy = r.ty - r.y
          const dist = Math.hypot(dx, dy)
          const step = r.speed * dt
          if (dist <= step) {
            explode(r.tx, r.ty, r.colors)
            rockets.splice(i, 1)
            continue
          }
          r.x += (dx / dist) * step
          r.y += (dy / dist) * step
          ctx.beginPath()
          ctx.fillStyle = '#FFE9B0'
          ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }

        for (let i = sparks.length - 1; i >= 0; i -= 1) {
          const s = sparks[i]
          s.life += dt
          if (s.life >= s.max) {
            sparks.splice(i, 1)
            continue
          }
          s.vx *= 0.985
          s.vy = s.vy * 0.985 + 55 * dt
          s.x += s.vx * dt
          s.y += s.vy * dt
          const t = 1 - s.life / s.max
          ctx.globalAlpha = t
          ctx.fillStyle = s.color
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * (0.5 + t * 0.7), 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      },
      launch: launchRocket,
      burst(x, y, colors = PALETTE) {
        explode(x, y, colors)
      },
      finale(count = 16, duration = 4200) {
        for (let i = 0; i < count; i += 1) {
          const id = setTimeout(() => {
            timers.delete(id)
            launchRocket(rand(0.06, 0.94), rand(0.1, 0.5))
          }, (duration / count) * i + rand(0, 120))
          timers.add(id)
        }
      },
      dispose() {
        timers.forEach(clearTimeout)
        timers.clear()
      },
    }
  })

  const launch = useCallback((x, y) => apiRef.current?.launch(x, y), [apiRef])
  const burst = useCallback((x, y) => apiRef.current?.burst(x, y), [apiRef])
  const finale = useCallback((count, duration) => apiRef.current?.finale(count, duration), [apiRef])

  return { launch, burst, finale }
}

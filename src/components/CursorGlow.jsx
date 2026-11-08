import { useEffect, useRef } from 'react'

/**
 * A soft golden light that follows the mouse (or finger) across the page.
 * Uses direct DOM transforms to avoid re-rendering React on every move.
 */
export default function CursorGlow({ size = 320 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty

    const move = (e) => {
      const p = e.touches ? e.touches[0] : e
      tx = p.clientX
      ty = p.clientY
      el.style.opacity = '1'
    }
    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('touchmove', move, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('touchmove', move)
    }
  }, [size])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5]"
      style={{
        width: size,
        height: size,
        opacity: 0,
        transition: 'opacity 0.6s ease',
        background: 'radial-gradient(circle, rgba(255,199,107,0.28) 0%, rgba(255,170,80,0.1) 40%, transparent 68%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

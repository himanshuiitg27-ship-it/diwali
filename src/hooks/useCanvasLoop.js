import { useEffect, useRef } from 'react'

/**
 * Shared canvas runner: handles DPR scaling, resizing, requestAnimationFrame
 * and pausing while the tab is hidden.
 *
 * `init({ ctx, size })` must return an object with `frame(dt, now)` and may
 * include any other methods (they are exposed through the returned ref).
 * `size` is a live object ({ w, h }) that is updated on resize.
 */
export function useCanvasLoop(canvasRef, init) {
  const apiRef = useRef(null)
  const initRef = useRef(init)
  initRef.current = init

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const size = { w: 0, h: 0 }
    let raf = 0
    let last = performance.now()
    let api = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dprCap = window.innerWidth < 640 ? 1.5 : 2
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
      size.w = rect.width
      size.h = rect.height
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      api?.resize?.(size)
    }

    resize()
    api = initRef.current({ ctx, size })
    apiRef.current = api

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      api.frame(dt, now)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    ro?.observe(canvas)
    window.addEventListener('resize', resize)

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      api?.dispose?.()
      apiRef.current = null
    }
  }, [canvasRef])

  return apiRef
}

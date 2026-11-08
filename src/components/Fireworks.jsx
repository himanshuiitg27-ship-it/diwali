import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFireworks } from '../hooks/useFireworks'

/**
 * Canvas fireworks layer. Fill any positioned parent.
 * Imperative handle: launch(xFrac, yFrac), burst(xPx, yPx), finale(count, ms)
 */
const Fireworks = forwardRef(function Fireworks(
  { auto = true, interval, zones, intensity = 1, className = '' },
  ref,
) {
  const canvasRef = useRef(null)
  const api = useFireworks(canvasRef, { auto, interval, zones, intensity })
  useImperativeHandle(ref, () => api, [api])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full pointer-events-none ${className}`} aria-hidden />
})

export default Fireworks

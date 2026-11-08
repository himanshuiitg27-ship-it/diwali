import { motion } from 'framer-motion'

/**
 * Chapter progress indicator. Visited chapters can be revisited by tapping their dot.
 */
export default function Navigation({ chapters, current, furthest, onGo }) {
  return (
    <nav
      className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex flex-col items-center gap-1.5 px-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 14px)' }}
      aria-label="Story chapters"
    >
      <ol className="pointer-events-auto flex items-center gap-2.5">
        {chapters.map((name, i) => {
          const active = i === current
          const reachable = i <= furthest
          return (
            <li key={name}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onGo(i)}
                aria-label={`Chapter ${i + 1}: ${name}`}
                aria-current={active ? 'step' : undefined}
                className="flex h-6 items-center justify-center px-0.5 disabled:cursor-default"
                style={{ background: 'none', border: 0 }}
              >
                <motion.span
                  animate={{ width: active ? 30 : 9, opacity: reachable ? 1 : 0.3 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="block h-[9px] rounded-full"
                  style={{
                    background: active ? 'linear-gradient(90deg,#ffd98a,#ffc76b)' : reachable ? '#D6A75C' : '#FFF2DC',
                    boxShadow: active ? '0 0 12px rgba(255,199,107,0.9)' : 'none',
                  }}
                />
              </button>
            </li>
          )
        })}
      </ol>
      <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-cream/55">{chapters[current]}</p>
    </nav>
  )
}

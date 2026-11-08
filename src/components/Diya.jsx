import { memo } from 'react'

/**
 * A clay diya with a flickering flame and a warm glow.
 * Flame/glow are driven by CSS (see animations.css) so many diyas stay cheap.
 *
 * props: lit, boost (flame/glow scale, 1 = normal), size (px), onClick, label, className
 */
function Diya({ lit = true, boost = 1, size = 140, onClick, label = 'Diya', className = '' }) {
  const Wrapper = onClick ? 'button' : 'div'
  const interactive = onClick
    ? { type: 'button', onClick, 'aria-label': label, 'aria-pressed': lit }
    : { 'aria-hidden': true }

  return (
    <Wrapper
      {...interactive}
      className={`relative inline-block select-none ${lit ? 'diya-lit' : ''} ${onClick ? 'diya-btn rounded-full' : ''} ${className}`}
      style={{ width: size, height: size * 0.82, '--boost': boost, background: 'none', border: 0, padding: 0 }}
    >
      <span className="diya-glow" />
      <svg viewBox="0 0 200 164" width="100%" height="100%" style={{ position: 'relative', overflow: 'visible' }}>
        <defs>
          <linearGradient id="clay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9b46a" />
            <stop offset="55%" stopColor="#b9692f" />
            <stop offset="100%" stopColor="#6e3418" />
          </linearGradient>
          <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a4720" />
            <stop offset="50%" stopColor="#f2c680" />
            <stop offset="100%" stopColor="#8a4720" />
          </linearGradient>
          <radialGradient id="oil" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd98a" />
            <stop offset="100%" stopColor="#8d4a1b" />
          </radialGradient>
          <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff9a2e" />
            <stop offset="55%" stopColor="#ffc76b" />
            <stop offset="100%" stopColor="#fff3c8" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#4aa0ff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#fff6d6" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* body */}
        <path d="M14 84 C14 84 30 148 100 152 C170 148 186 84 186 84 Z" fill="url(#clay)" />
        {/* tip/spout of the lamp */}
        <path d="M168 88 C184 80 196 70 198 60 C190 72 178 78 160 82 Z" fill="url(#clay)" />
        {/* rim */}
        <ellipse cx="100" cy="84" rx="86" ry="14" fill="url(#rim)" />
        <ellipse cx="100" cy="85" rx="74" ry="9.5" fill="url(#oil)" />
        {/* painted dots */}
        {[48, 70, 100, 130, 152].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 122 : 116} r="3.4" fill="#ffd98a" opacity="0.85" />
        ))}
        <path d="M54 104 Q100 124 146 104" stroke="#ffd98a" strokeWidth="2.2" fill="none" opacity="0.7" />

        {/* wick */}
        <rect x="97.5" y="70" width="5" height="16" rx="2.5" fill="#2a1409" />

        {/* flame */}
        <g className="flame-wrap">
          <g className="flame-flicker">
            <path
              d="M100 8 C112 28 124 42 120 58 C118 70 109 76 100 76 C91 76 82 70 80 58 C76 42 90 30 100 8 Z"
              fill="url(#flameOuter)"
            />
            <path
              className="flame-inner"
              d="M100 36 C106 48 111 56 109 64 C108 71 104 74 100 74 C96 74 92 71 91 64 C89 56 94 48 100 36 Z"
              fill="url(#flameInner)"
            />
          </g>
        </g>
      </svg>
    </Wrapper>
  )
}

export default memo(Diya)

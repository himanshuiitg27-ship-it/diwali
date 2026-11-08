/**
 * An ornate hanging Indian lantern (fanoos).
 * `intensity` (0–1) controls how brightly the inside glows; it animates smoothly.
 */
export default function Lantern({ intensity = 0.45, onClick, size = 220, label = 'Lantern' }) {
  const glow = 0.25 + intensity * 0.75
  const Wrapper = onClick ? 'button' : 'div'
  const props = onClick ? { type: 'button', onClick, 'aria-label': label } : { 'aria-hidden': true }

  return (
    <Wrapper
      {...props}
      className="lantern-sway relative inline-block select-none diya-btn"
      style={{ width: size, background: 'none', border: 0, padding: 0 }}
    >
      {/* light radiating below */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '58%',
          width: '230%',
          aspectRatio: '1',
          transform: 'translate(-50%, -30%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,199,107,${0.18 + intensity * 0.5}) 0%, rgba(255,160,70,${0.06 + intensity * 0.18}) 38%, transparent 68%)`,
          transition: 'background 1.6s ease',
          pointerEvents: 'none',
        }}
      />
      <svg viewBox="0 0 200 330" width="100%" style={{ position: 'relative', overflow: 'visible' }}>
        <defs>
          <radialGradient id="lanternCore" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fff6d0" stopOpacity={glow} />
            <stop offset="45%" stopColor="#ffc76b" stopOpacity={glow * 0.85} />
            <stop offset="100%" stopColor="#c76a1c" stopOpacity={glow * 0.5} />
          </radialGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a6128" />
            <stop offset="50%" stopColor="#f4d58f" />
            <stop offset="100%" stopColor="#8a6128" />
          </linearGradient>
          <filter id="lanternBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* chain & hook */}
        <line x1="100" y1="0" x2="100" y2="46" stroke="url(#metal)" strokeWidth="3" strokeDasharray="6 3" />
        <circle cx="100" cy="48" r="7" fill="none" stroke="url(#metal)" strokeWidth="3" />

        {/* crown */}
        <path d="M100 56 C118 62 134 76 140 96 L60 96 C66 76 82 62 100 56 Z" fill="url(#metal)" />
        <circle cx="100" cy="54" r="5" fill="#ffd98a" />
        <rect x="52" y="94" width="96" height="9" rx="4" fill="url(#metal)" />

        {/* glass body */}
        <path
          d="M60 103 C42 150 42 214 62 250 L138 250 C158 214 158 150 140 103 Z"
          fill="url(#lanternCore)"
          style={{ transition: 'all 1.4s ease' }}
        />
        <ellipse
          cx="100"
          cy="178"
          rx="26"
          ry="48"
          fill="#fff3c8"
          opacity={0.25 + intensity * 0.6}
          filter="url(#lanternBlur)"
          style={{ transition: 'opacity 1.4s ease' }}
        />

        {/* lattice ribs */}
        {[-34, -17, 0, 17, 34].map((dx) => (
          <path
            key={dx}
            d={`M${100 + dx * 0.55} 103 C${100 + dx * 1.7} 150 ${100 + dx * 1.7} 205 ${100 + dx * 0.8} 250`}
            stroke="url(#metal)"
            strokeWidth="2.4"
            fill="none"
            opacity="0.95"
          />
        ))}
        {/* cut-out diamonds */}
        {[140, 178, 216].map((y) => (
          <path key={y} d={`M100 ${y - 9} L108 ${y} L100 ${y + 9} L92 ${y} Z`} fill="#3a1f2c" opacity="0.28" />
        ))}

        {/* base */}
        <rect x="56" y="248" width="88" height="9" rx="4" fill="url(#metal)" />
        <path d="M66 257 L134 257 L124 276 L76 276 Z" fill="url(#metal)" />
        {/* tassel */}
        <line x1="100" y1="276" x2="100" y2="296" stroke="#d6a75c" strokeWidth="3" />
        <circle cx="100" cy="300" r="6" fill="#ffc76b" />
        <path d="M94 304 L90 328 M100 306 L100 330 M106 304 L110 328" stroke="#d6a75c" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </Wrapper>
  )
}

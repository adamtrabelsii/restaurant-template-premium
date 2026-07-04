// src/components/common/Embers.jsx
import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Sparse sparks rising like embers off a charcoal grill.
// Kept deliberately scarce — it should read as occasional sparks,
// not a particle system. Colors come from the brand tokens.
export default function Embers({ count = 18, reducedMotion, className = '' }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: 8 + Math.random() * 84,
        size: 2 + Math.random() * 3,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 8,
        drift: -30 + Math.random() * 60,
        peak: 0.5 + Math.random() * 0.4,
        rgb: Math.random() > 0.75 ? 'var(--red-rgb)' : 'var(--gold-rgb)',
      })),
    [count]
  )

  if (reducedMotion) return null

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {embers.map((e, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: `rgb(${e.rgb})`,
            boxShadow: `0 0 ${e.size * 3}px ${e.size}px rgb(${e.rgb} / 0.27)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: ['0vh', '-55vh'],
            x: [0, e.drift],
            opacity: [0, e.peak, e.peak * 0.7, 0],
            scale: [1, 0.55],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

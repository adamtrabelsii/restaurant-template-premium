// src/components/ui/floating-paths.jsx
// Adapted from 21st.dev "background-paths": only the SVG line field is kept,
// re-skinned as rising smoke — brass strokes at very low opacity, 13 paths
// instead of 72, static under reduced motion.
import { motion } from 'framer-motion'

const PATHS = Array.from({ length: 13 }, (_, i) => ({
  id: i,
  d: `M-${380 - i * 10} -${189 + i * 12}C-${380 - i * 10} -${189 + i * 12} -${
    312 - i * 10
  } ${216 - i * 12} ${152 - i * 10} ${343 - i * 12}C${616 - i * 10} ${
    470 - i * 12
  } ${684 - i * 10} ${875 - i * 12} ${684 - i * 10} ${875 - i * 12}`,
  width: 0.5 + i * 0.04,
  opacity: 0.02 + i * 0.003, // caps at ~0.06
  duration: 22 + (i % 5) * 3,
}))

export default function FloatingPaths({ reducedMotion, className = '' }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none text-ardor-gold ${className}`}
      aria-hidden="true"
    >
      {/* rotated so the curves drift upward, like smoke off the grill */}
      <svg
        className="w-full h-full rotate-180"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {PATHS.map((p) =>
          reducedMotion ? (
            <path
              key={p.id}
              d={p.d}
              stroke="currentColor"
              strokeWidth={p.width}
              strokeOpacity={p.opacity}
            />
          ) : (
            <motion.path
              key={p.id}
              d={p.d}
              stroke="currentColor"
              strokeWidth={p.width}
              initial={{ pathLength: 0.3, strokeOpacity: p.opacity * 0.6 }}
              animate={{
                pathLength: 1,
                strokeOpacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )
        )}
      </svg>
    </div>
  )
}

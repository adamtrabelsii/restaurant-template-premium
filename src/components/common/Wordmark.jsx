// src/components/common/Wordmark.jsx
import { BRAND } from '../../config/brand'

// The brand name with its accent letter, driven by src/config/brand.js.
export default function Wordmark({ className = '' }) {
  return (
    <span className={className}>
      {[...BRAND.name].map((ch, i) =>
        i === BRAND.accentLetter ? (
          <span key={i} className="text-ardor-red">{ch}</span>
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
    </span>
  )
}

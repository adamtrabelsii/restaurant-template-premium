// src/components/common/SpotlightVars.jsx
import { useEffect } from 'react'

// One global pointer listener feeding every `.spotlight` card (fix3 §9.2).
// The cards use background-attachment: fixed, so they all sample the same
// viewport coordinates — a single pair of CSS vars on :root is enough.
// Never mounts on touch devices or under reduced motion; without the vars
// the gradients stay off-screen and the cards render as plain glass.
export default function SpotlightVars({ reducedMotion }) {
  useEffect(() => {
    if (reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const root = document.documentElement
    const onMove = (e) => {
      root.style.setProperty('--spot-x', e.clientX.toFixed(1))
      root.style.setProperty('--spot-y', e.clientY.toFixed(1))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      root.style.removeProperty('--spot-x')
      root.style.removeProperty('--spot-y')
    }
  }, [reducedMotion])

  return null
}

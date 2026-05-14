import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower({ reducedMotion }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 180, damping: 25, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 25, mass: 0.4 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-[60] rounded-full"
      style={{
        x: sx,
        y: sy,
        width: 380,
        height: 380,
        marginLeft: -190,
        marginTop: -190,
        background: 'radial-gradient(circle, rgba(201,169,97,0.08) 0%, rgba(168,50,63,0.04) 35%, transparent 65%)',
        mixBlendMode: 'screen',
        filter: 'blur(20px)',
      }}
    />
  )
}

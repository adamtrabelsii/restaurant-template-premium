import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[55] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #A8323F 0%, #C9A961 100%)',
        boxShadow: '0 0 10px rgba(168,50,63,0.35)',
      }}
    />
  )
}

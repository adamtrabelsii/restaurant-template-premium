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
        background: 'linear-gradient(90deg, #C87941 0%, #7BA7BC 100%)',
        boxShadow: '0 0 10px rgba(200,121,65,0.35)',
      }}
    />
  )
}

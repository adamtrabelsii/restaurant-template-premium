// src/components/common/Reveal.jsx
import { motion } from 'framer-motion'

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  zoom:  { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  once = true,
  blur = true,
  reducedMotion = false,
  className,
  ...rest
}) {
  const Motion = motion[Tag] || motion.div

  if (reducedMotion) {
    return <Tag className={className} {...rest}>{children}</Tag>
  }

  const base = VARIANTS[direction] || VARIANTS.up
  const variants = blur
    ? {
        hidden: { ...base.hidden, filter: 'blur(6px)' },
        show:   { ...base.show,   filter: 'blur(0px)' },
      }
    : base

  return (
    <Motion
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Motion>
  )
}

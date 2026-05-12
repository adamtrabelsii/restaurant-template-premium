import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import DishScene from '../canvas/DishScene'

const DISHES = [
  {
    id: 1,
    dishId: 1,
    name: 'Paella Valenciana',
    description: 'Saffron bomba rice, free-range rabbit, green beans, slow-cooked over orange wood fire.',
    price: '€28',
  },
  {
    id: 2,
    dishId: 2,
    name: 'Secreto Ibérico',
    description: 'Hidden cut of pure-bred Ibérico pork, charcoal grilled, Pedro Ximénez reduction, roasted peppers.',
    price: '€34',
  },
  {
    id: 3,
    dishId: 3,
    name: 'Gambas al Ajillo',
    description: 'Wild Atlantic prawns, sizzling in garlic, guindilla chilli, dry sherry, served in a clay cazuela.',
    price: '€22',
  },
]

function DishCard({ dish, reducedMotion, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="bg-ardor-dark border border-white/5 overflow-hidden"
        animate={{ borderColor: hovered ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.05)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Mini R3F canvas */}
        <div className="h-64 bg-black/30">
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <Suspense fallback={null}>
              <DishScene hovered={hovered} dishId={dish.dishId} />
            </Suspense>
          </Canvas>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-cormorant font-semibold text-white text-xl">{dish.name}</h3>
            <span className="font-montserrat text-ardor-gold text-sm font-medium ml-4 flex-shrink-0">{dish.price}</span>
          </div>
          <p className="font-montserrat text-ardor-muted text-xs leading-relaxed">{dish.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Dishes({ reducedMotion }) {
  return (
    <section id="dishes" className="bg-ardor-mid py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Our Specialities</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Platos Estrella
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DISHES.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}

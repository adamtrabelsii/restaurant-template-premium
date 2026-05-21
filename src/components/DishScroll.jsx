// src/components/DishScroll.jsx
import { motion } from 'framer-motion'
import { ContainerScroll } from './ui/container-scroll-animation'
import { useLanguage } from '../i18n/LanguageContext'

const DISHES = [
  {
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1200&q=80&auto=format&fit=crop',
    name: 'Toro Tartare',
    price: '€38',
    desc: 'Bluefin tuna, smoked roe, crispy capers',
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=700&q=80&auto=format&fit=crop',
    name: 'Ibérico Presa',
    price: '€42',
    desc: 'Charcoal-grilled, romesco, wild herbs',
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=700&q=80&auto=format&fit=crop',
    name: 'Black Truffle Risotto',
    price: '€56',
    desc: 'Carnaroli, aged parmesan, shaved truffle',
    featured: false,
  },
]

const EASE = [0.16, 1, 0.3, 1]

function DishTile({ dish, delay, reducedMotion, className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl group ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker via-ardor-darker/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-cormorant italic font-semibold text-white ${dish.featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
            {dish.name}
          </h3>
          <span className="font-mono text-ardor-gold text-sm flex-shrink-0 tabular">{dish.price}</span>
        </div>
        <p className="font-montserrat text-white/55 text-[11px] mt-1 leading-relaxed">{dish.desc}</p>
      </div>
    </motion.div>
  )
}

export default function DishScroll({ reducedMotion }) {
  const { t } = useLanguage()

  const titleComponent = (
    <div>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="w-8 h-px bg-ardor-red/60" />
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red">
          Signature Dishes
        </p>
        <span className="w-8 h-px bg-ardor-red/60" />
      </div>
      <h2
        className="font-cormorant font-bold italic text-ardor-text"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
      >
        Crafted with obsession.
      </h2>
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
    </div>
  )

  return (
    <section id="dish-scroll" className="relative bg-ardor-darker overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(168,50,63,0.10) 0%, transparent 65%)',
        }}
      />
      <ContainerScroll titleComponent={titleComponent}>
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-3 p-1">
          <DishTile
            dish={DISHES[0]}
            delay={0}
            reducedMotion={reducedMotion}
            className="row-span-2"
          />
          <DishTile dish={DISHES[1]} delay={0.12} reducedMotion={reducedMotion} />
          <DishTile dish={DISHES[2]} delay={0.24} reducedMotion={reducedMotion} />
        </div>
      </ContainerScroll>
    </section>
  )
}

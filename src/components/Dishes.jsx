import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const UNSPLASH = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const DISH_IMAGES = [
  UNSPLASH('1534080564583-6be75777b70a'),
  UNSPLASH('1432139509613-5c4255815697'),
  UNSPLASH('1559847844-5315695dadae'),
]

// Bento layout: featured large + two compact
const SPANS = [
  'md:col-span-2 md:row-span-2 md:min-h-[36rem]',
  'md:col-span-1 md:row-span-1 md:min-h-[17.5rem]',
  'md:col-span-1 md:row-span-1 md:min-h-[17.5rem]',
]

function DishCard({ dish, image, reducedMotion, delay, span, featured }) {
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={`group relative overflow-hidden rounded-sm glass glass-hover cursor-pointer ${span}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={image}
          alt={dish.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          initial={false}
          whileHover={reducedMotion ? {} : { scale: 1.08 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker via-ardor-darker/30 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.10) 0%, transparent 70%)' }} />

      {/* Corner brackets */}
      <span className="absolute top-4 left-4 w-4 h-4 border-l border-t border-ardor-neon/40 group-hover:border-ardor-neon transition-colors" />
      <span className="absolute top-4 right-4 w-4 h-4 border-r border-t border-ardor-neon/40 group-hover:border-ardor-neon transition-colors" />

      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {featured && (
          <span className="self-start mb-3 font-montserrat text-[9px] tracking-[0.4em] uppercase text-ardor-neon border border-ardor-neon/40 px-2 py-1 rounded-sm">
            Signature
          </span>
        )}
        <div className="flex justify-between items-baseline gap-4">
          <h3 className={`font-cormorant font-semibold italic text-white ${featured ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
            {dish.name}
          </h3>
          <span className="font-mono text-ardor-gold text-sm tabular flex-shrink-0">{dish.price}</span>
        </div>
        <p className={`font-montserrat text-white/60 text-xs leading-relaxed mt-3 ${featured ? 'max-w-md' : ''}`}>
          {dish.description}
        </p>
        <div className="mt-5 flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-ardor-neon/70">
          <span className="w-6 h-px bg-ardor-neon/50" />
          <span>Explore</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Dishes({ reducedMotion }) {
  const { t } = useLanguage()
  const dishes = t('dishes.items')

  return (
    <section id="dishes" className="relative bg-ardor-mid py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-red/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red">{t('dishes.eyebrow')}</p>
            <span className="w-8 h-px bg-ardor-red/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('dishes.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
        </Reveal>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5">
          {dishes.map((dish, i) => (
            <DishCard
              key={i}
              dish={dish}
              image={DISH_IMAGES[i]}
              reducedMotion={reducedMotion}
              delay={i * 0.1}
              span={SPANS[i] || ''}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

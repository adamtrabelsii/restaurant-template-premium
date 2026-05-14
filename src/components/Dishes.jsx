import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const UNSPLASH = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const DISH_IMAGES = [
  UNSPLASH('1534080564583-6be75777b70a'),
  UNSPLASH('1432139509613-5c4255815697'),
  UNSPLASH('1559847844-5315695dadae'),
]

function DishCard({ dish, image, reducedMotion, delay }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="group cursor-pointer"
    >
      <motion.div
        className="bg-ardor-dark border border-white/5 overflow-hidden transition-colors duration-300 group-hover:border-ardor-red/40"
      >
        <div className="h-64 overflow-hidden bg-black/30 relative">
          <motion.img
            src={image}
            alt={dish.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            initial={false}
            whileHover={reducedMotion ? {} : { scale: 1.06 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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
  const { t } = useLanguage()
  const dishes = t('dishes.items')

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
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">{t('dishes.eyebrow')}</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('dishes.title')}
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <DishCard key={i} dish={dish} image={DISH_IMAGES[i]} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}

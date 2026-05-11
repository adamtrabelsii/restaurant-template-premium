import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['tapas', 'mains', 'postres', 'bebidas']

const TAB_LABELS = { tapas: 'Tapas', mains: 'Mains', postres: 'Postres', bebidas: 'Bebidas' }

const MENU_ITEMS = {
  tapas: [
    { name: 'Pan con Tomate', desc: 'Sourdough, grated heirloom tomato, Arbequina oil, sea salt', price: '€8' },
    { name: 'Patatas Bravas', desc: 'Crispy potatoes, smoky bravas sauce, garlic alioli', price: '€9' },
    { name: 'Croquetas de Jamón', desc: 'Hand-rolled jamón ibérico croquettes, béchamel, crispy crumb', price: '€12' },
    { name: 'Pimientos de Padrón', desc: 'Blistered Padrón peppers, flor de sal, lemon', price: '€9' },
  ],
  mains: [
    { name: 'Paella Valenciana', desc: 'Saffron bomba rice, rabbit, beans, orange wood fire (for 2)', price: '€56' },
    { name: 'Secreto Ibérico', desc: 'Charcoal-grilled Ibérico pork, PX reduction, peppers', price: '€34' },
    { name: 'Lubina a la Sal', desc: 'Whole sea bass baked in salt crust, garlic butter, capers', price: '€38' },
    { name: 'Cochinillo Asado', desc: 'Segovian suckling pig, slow-roasted 6 hours, apple compote', price: '€42' },
  ],
  postres: [
    { name: 'Crema Catalana', desc: 'Classic custard, caramelised crust, orange zest', price: '€9' },
    { name: 'Churros con Chocolate', desc: 'Fried dough, cinnamon sugar, thick dark chocolate dipping sauce', price: '€11' },
    { name: 'Tarta de Santiago', desc: 'Almond cake, powdered sugar cross, Pedro Ximénez ice cream', price: '€10' },
  ],
  bebidas: [
    { name: 'Sangria Ardiente', desc: 'House red wine, blood orange, cinnamon, berries', price: '€14' },
    { name: 'Rioja Reserva', desc: 'Bodegas Muga, aged 18 months in oak, deep cherry notes', price: '€12' },
    { name: 'Agua de Valencia', desc: "Fresh orange juice, Cava, vodka, gin — Valencia's signature", price: '€13' },
  ],
}

export default function Menu() {
  const [active, setActive] = useState('tapas')

  return (
    <section id="menu" className="bg-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Explore</p>
          <h2 className="font-cormorant font-bold text-ardor-dark" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Nuestra Carta
          </h2>
          <div className="w-16 h-px bg-ardor-red mx-auto mt-5" />
        </motion.div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative font-montserrat text-xs tracking-[0.3em] uppercase px-6 py-3 cursor-pointer whitespace-nowrap transition-colors duration-200"
              style={{ color: active === tab ? '#0F0F0F' : '#9CA3AF' }}
            >
              {TAB_LABELS[tab]}
              {active === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-ardor-red"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-5"
          >
            {MENU_ITEMS[active].map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-baseline border-b border-dotted border-gray-200 pb-4 last:border-0"
              >
                <div>
                  <p className="font-cormorant font-semibold text-ardor-dark text-lg">{item.name}</p>
                  <p className="font-montserrat text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
                <span className="font-montserrat text-ardor-red text-sm font-medium ml-6 flex-shrink-0">{item.price}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

      </div>
    </section>
  )
}

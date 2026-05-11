import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Dishes from './components/Dishes'
import Drinks from './components/Drinks'
import Menu from './components/Menu'
import Reservations from './components/Reservations'
import Footer from './components/Footer'

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <main>
      <Navbar reducedMotion={prefersReducedMotion} />
      <Hero reducedMotion={prefersReducedMotion} />
      <About reducedMotion={prefersReducedMotion} />
      <Dishes reducedMotion={prefersReducedMotion} />
      <Drinks reducedMotion={prefersReducedMotion} />
      <Menu />
      <Reservations />
      <Footer reducedMotion={prefersReducedMotion} />
    </main>
  )
}

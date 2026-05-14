import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Press from './components/Press'
import Dishes from './components/Dishes'
import Drinks from './components/Drinks'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Footer from './components/Footer'
import ScrollProgress from './components/common/ScrollProgress'
import CursorFollower from './components/common/CursorFollower'
import LoadingScreen from './components/common/LoadingScreen'

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <LoadingScreen reducedMotion={prefersReducedMotion} />
      <ScrollProgress />
      <CursorFollower reducedMotion={prefersReducedMotion} />

      <Navbar reducedMotion={prefersReducedMotion} />
      <main>
        <Hero reducedMotion={prefersReducedMotion} />
        <Press reducedMotion={prefersReducedMotion} />
        <About reducedMotion={prefersReducedMotion} />
        <Dishes reducedMotion={prefersReducedMotion} />
        <Drinks reducedMotion={prefersReducedMotion} />
        <Menu reducedMotion={prefersReducedMotion} />
        <Gallery reducedMotion={prefersReducedMotion} />
        <Reservations reducedMotion={prefersReducedMotion} />
        <Footer reducedMotion={prefersReducedMotion} />
      </main>
    </>
  )
}

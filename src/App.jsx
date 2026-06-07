import { useEffect } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <CustomCursor />

      {/* Ambient blobs */}
      <div className="blob animate-drift1" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #0ea5e9, #1e3a8a)', top: '5%', left: '-10%' }} />
      <div className="blob animate-drift2" style={{ width: 400, height: 400, background: 'radial-gradient(circle, #22d3ee, #0ea5e9)', top: '40%', right: '-8%' }} />
      <div className="blob animate-drift3" style={{ width: 350, height: 350, background: 'radial-gradient(circle, #7c3aed, #0ea5e9)', bottom: '15%', left: '20%' }} />

      <ParticleCanvas />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  )
}

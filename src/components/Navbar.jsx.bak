import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = navItems.map(item => document.getElementById(item.toLowerCase()))
      const scrollY = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollY) {
          setActive(navItems[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 2rem',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34,211,238,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: '1.2rem',
          background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          cursor: 'pointer',
          letterSpacing: 2,
        }}
        onClick={() => scrollTo('home')}
      >
        TG
      </motion.div>

      {/* Desktop nav */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
        {navItems.map((item) => (
          <motion.button
            key={item}
            onClick={() => scrollTo(item)}
            whileHover={{ scale: 1.1 }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.85rem',
              fontWeight: active === item ? 600 : 400,
              color: active === item ? '#22d3ee' : '#94a3b8',
              cursor: 'pointer',
              letterSpacing: 1,
              textShadow: active === item ? '0 0 8px rgba(34,211,238,0.6)' : 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              padding: '4px 0',
            }}
          >
            {item}
            {active === item && (
              <motion.div
                layoutId="activeBar"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
                  borderRadius: 2,
                  boxShadow: '0 0 6px #22d3ee',
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex md:hidden flex-col gap-1.5 p-2"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: 22,
            height: 2,
            background: '#22d3ee',
            borderRadius: 2,
            transition: 'all 0.3s',
            transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' :
                        menuOpen && i === 1 ? 'scaleX(0)' :
                        menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 68,
            left: 0,
            right: 0,
            background: 'rgba(10,10,26,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(34,211,238,0.2)',
            padding: '1rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                background: 'none',
                border: 'none',
                color: active === item ? '#22d3ee' : '#94a3b8',
                fontFamily: 'Sora, sans-serif',
                fontSize: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(34,211,238,0.1)',
              }}
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

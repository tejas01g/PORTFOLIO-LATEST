import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact']

function haptic(style = 'light') {
  if (navigator?.vibrate) navigator.vibrate(style === 'light' ? 10 : 20)
}

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navItems.map(item => document.getElementById(item.toLowerCase()))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollY) { setActive(navItems[i]); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    haptic('light')
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 1.25rem',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,26,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(34,211,238,0.12)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('home')}
          style={{
            fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1.2rem',
            background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', cursor: 'pointer', letterSpacing: 2,
            userSelect: 'none',
          }}
        >
          TG
        </motion.div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="hidden md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="haptic-btn"
              style={{
                background: 'none', border: 'none',
                fontFamily: 'Sora, sans-serif', fontSize: '0.85rem',
                fontWeight: active === item ? 600 : 400,
                color: active === item ? '#22d3ee' : '#94a3b8',
                cursor: 'pointer', letterSpacing: 1,
                textShadow: active === item ? '0 0 8px rgba(34,211,238,0.6)' : 'none',
                transition: 'all 0.3s ease', position: 'relative', padding: '4px 0',
              }}
            >
              {item}
              {active === item && (
                <motion.div layoutId="activeBar" style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
                  borderRadius: 2, boxShadow: '0 0 6px #22d3ee',
                }} />
              )}
            </motion.button>
          ))}

          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            download="Tejasvi_Garg_Resume.pdf"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => haptic('medium')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(34,211,238,0.1))',
              border: '1px solid rgba(34,211,238,0.4)',
              color: '#22d3ee', fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.68rem', fontWeight: 600, letterSpacing: 1.5,
              padding: '7px 14px', borderRadius: 8, textDecoration: 'none',
              cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: '0 0 12px rgba(34,211,238,0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            <Download size={12} />
            RESUME
          </motion.a>
        </div>

        {/* Mobile: Resume + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="flex md:hidden">
          {/* <motion.a
            href="/resume.pdf"
            download="Tejasvi_Garg_Resume.pdf"
            whileTap={{ scale: 0.92 }}
            onClick={() => haptic('medium')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(34,211,238,0.35)',
              color: '#22d3ee', fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.6rem', fontWeight: 600, letterSpacing: 1,
              padding: '6px 10px', borderRadius: 6, textDecoration: 'none',
              cursor: 'pointer',
            }}
          > */}
            {/* <Download size={11} /> */}
            {/* CV */}
          {/* </motion.a> */}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { haptic('light'); setMenuOpen(!menuOpen) }}
            className="haptic-btn"
            style={{
              background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(34,211,238,0.25)',
              borderRadius: 8, padding: '7px', cursor: 'pointer',
              color: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'rgba(10,10,26,0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(34,211,238,0.15)',
              padding: '1.5rem 1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.97, x: 6 }}
                onClick={() => scrollTo(item)}
                className="haptic-btn"
                style={{
                  background: active === item ? 'rgba(14,165,233,0.12)' : 'none',
                  border: active === item ? '1px solid rgba(34,211,238,0.3)' : '1px solid transparent',
                  borderRadius: 10, padding: '0.9rem 1rem',
                  color: active === item ? '#22d3ee' : '#94a3b8',
                  fontFamily: 'Sora, sans-serif', fontSize: '1rem',
                  fontWeight: active === item ? 600 : 400,
                  textAlign: 'left', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  letterSpacing: 0.5,
                }}
              >
                {item}
                {active === item && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

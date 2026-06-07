import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'React Native Developer',
  'Flutter Developer',
  'AI SaaS Product Builder',
  'Web Developer',
  'Full Stack Developer',
  'Software Developer',
]

function haptic(ms = 10) {
  if (navigator?.vibrate) navigator.vibrate(ms)
}

function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setText(current.slice(0, charIdx)); setCharIdx(c => c + 1) },
        charIdx === current.length ? pause : speed)
    } else if (!deleting && charIdx > current.length) {
      setDeleting(true)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setText(current.slice(0, charIdx)); setCharIdx(c => c - 1) }, speed / 2)
    } else {
      setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(roles)
  const heroRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (isMobile) return
    const handleMouse = (e) => {
      if (!heroRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 16
      const y = (e.clientY / window.innerHeight - 0.5) * 16
      heroRef.current.style.transform = `perspective(1000px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [isMobile])

  const scrollTo = useCallback((id) => {
    haptic(12)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="home" style={{
      minHeight: '100svh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', padding: '5rem 1.25rem 2rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.08) 0%, rgba(10,10,26,0) 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 760, width: '100%', textAlign: 'center',
          transformStyle: 'preserve-3d',
          transition: isMobile ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <div className="gradient-border" style={{ borderRadius: 24, padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.25rem, 5vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(14,165,233,0.04) 0%, rgba(34,211,238,0.02) 50%, rgba(14,165,233,0.06) 100%)',
            borderRadius: 24, pointerEvents: 'none',
          }} />

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 999, padding: '5px 14px', marginBottom: '1.25rem',
            }}
          >
            <span className="live-dot" />
            <span style={{ fontFamily: 'Sora', fontSize: '0.72rem', color: '#86efac', letterSpacing: 1 }}>Available for Work</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{
              fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
              fontSize: 'clamp(2rem, 10vw, 4.5rem)',
              lineHeight: 1.1, marginBottom: '0.4rem', letterSpacing: '-1px',
            }}
          >
            <span className="shimmer-text">Tejasvi</span>
            <br />
            <span style={{ color: '#f1f5f9', textShadow: '0 0 40px rgba(14,165,233,0.3)' }}>Garg</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }}
            className="section-line" style={{ width: 160, margin: '0.75rem auto 1.25rem', borderRadius: 2 }}
          />

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(0.72rem, 3vw, 1.1rem)',
              color: '#22d3ee', letterSpacing: 1.5,
              minHeight: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
              textShadow: '0 0 12px rgba(34,211,238,0.5)',
              flexWrap: 'wrap',
            }}
          >
            {typed}<span className="typewriter-cursor" style={{ height: '1.2em' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={{
              fontFamily: 'Sora', fontSize: 'clamp(0.82rem, 2.5vw, 0.98rem)',
              color: '#94a3b8', maxWidth: 440, margin: '0 auto 2rem', lineHeight: 1.7,
            }}
          >
            MCA 2026 · SRM University · Building production-ready apps that ship 🚀
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => scrollTo('projects')}
              whileTap={{ scale: 0.95 }}
              className="neon-btn haptic-btn"
              style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(34,211,238,0.15))',
                border: '1px solid rgba(14,165,233,0.5)', color: '#e0f2fe',
                fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(0.65rem, 2vw, 0.78rem)',
                letterSpacing: 2, padding: 'clamp(10px, 2vw, 13px) clamp(18px, 4vw, 26px)',
                borderRadius: 8, cursor: 'pointer', fontWeight: 600,
              }}
            >
              VIEW MY WORK
            </motion.button>
            <motion.button
              onClick={() => scrollTo('contact')}
              whileTap={{ scale: 0.95 }}
              className="neon-btn haptic-btn"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)', border: 'none',
                color: '#0a0a1a', fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(0.65rem, 2vw, 0.78rem)',
                letterSpacing: 2, padding: 'clamp(10px, 2vw, 13px) clamp(18px, 4vw, 26px)',
                borderRadius: 8, cursor: 'pointer', fontWeight: 700,
                boxShadow: '0 0 24px rgba(14,165,233,0.4)',
              }}
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>
        </div>

        {/* Floating orbs */}
        {[
          { top: '-24px', left: '-24px', size: 50 },
          { top: '-16px', right: '-16px', size: 36 },
          { bottom: '-20px', left: '10%', size: 42 },
          { bottom: '-12px', right: '12%', size: 30 },
        ].map((s, i) => (
          <motion.div key={i}
            animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            style={{
              position: 'absolute', width: s.size, height: s.size, borderRadius: '50%',
              border: '1px solid rgba(34,211,238,0.25)', background: 'rgba(14,165,233,0.05)',
              backdropFilter: 'blur(4px)',
              top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            }}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontFamily: 'Sora', fontSize: '0.6rem', color: '#94a3b8', letterSpacing: 3 }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(34,211,238,0.8), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

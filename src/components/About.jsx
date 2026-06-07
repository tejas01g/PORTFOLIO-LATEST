import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'

const skills = [
  'React Native', 'Flutter', 'Dart', 'JavaScript', 'TypeScript',
  'React.js', 'Node.js', 'Firebase', 'Firestore', 'REST APIs',
  'Groq API', 'RAG', 'LLM Integration', 'Prompt Engineering',
  'Google Auth', 'Git', 'Tailwind CSS', 'AI SaaS Architecture'
]

const stats = [
  { value: '8+', label: 'Months Exp.' },
  { value: '2', label: 'Apps Live' },
  { value: '5+', label: 'Projects' },
  { value: '2026', label: 'MCA Grad' },
]

export default function About() {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (!cardRef.current || isTouchDevice()) return
    VanillaTilt.init(cardRef.current, { max: 8, speed: 400, glare: true, 'max-glare': 0.12, scale: 1.01 })
    return () => { if (cardRef.current?.vanillaTilt) cardRef.current.vanillaTilt.destroy() }
  }, [])

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (!imgRef.current || isTouchDevice()) return
    VanillaTilt.init(imgRef.current, { max: 14, speed: 300, glare: true, 'max-glare': 0.2, scale: 1.04 })
    return () => { if (imgRef.current?.vanillaTilt) imgRef.current.vanillaTilt.destroy() }
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '5rem 1.25rem', position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 960, width: '100%' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <p style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: '#22d3ee', letterSpacing: 6, marginBottom: 10 }}>WHO I AM</p>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9' }}>
            About <span className="shimmer-text">Me</span>
          </h2>
          <div className="section-line" style={{ width: 100, margin: '0.75rem auto 0', borderRadius: 2 }} />
        </motion.div>

        {/* Main layout: Photo + Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}>

          {/* === PHOTO CARD === */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              ref={imgRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 300,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer glow ring */}
              <div style={{
                position: 'absolute',
                inset: -3,
                borderRadius: 24,
                background: 'linear-gradient(135deg, #0ea5e9, #22d3ee, #7c3aed, #0ea5e9)',
                backgroundSize: '300% 300%',
                animation: 'borderRotate 4s linear infinite',
                zIndex: 0,
                filter: 'blur(1px)',
              }} />

              {/* Glass frame */}
              <div style={{
                position: 'relative',
                borderRadius: 22,
                overflow: 'hidden',
                background: 'rgba(14,165,233,0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(34,211,238,0.3)',
                zIndex: 1,
                boxShadow: '0 0 40px rgba(14,165,233,0.2), 0 0 80px rgba(34,211,238,0.1), inset 0 0 30px rgba(14,165,233,0.05)',
              }}>
                <img
                  src="/tejasvi.png"
                  alt="Tejasvi Garg"
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    aspectRatio: '3/4',
                    filter: 'brightness(1.05) contrast(1.05) saturate(1.1)',
                  }}
                />

                {/* Holographic overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 40%, rgba(34,211,238,0.05) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Bottom name tag */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(0deg, rgba(10,10,26,0.95) 0%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem',
                }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: 1 }}>
                    Tejasvi Garg
                  </div>
                  <div style={{ fontFamily: 'Sora', fontSize: '0.72rem', color: '#22d3ee', marginTop: 3, letterSpacing: 0.5 }}>
                    React Native · Flutter · AI Builder
                  </div>
                </div>
              </div>

              {/* Floating badge - top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: -14,
                  right: -14,
                  zIndex: 2,
                  background: 'rgba(10,10,26,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(34,211,238,0.4)',
                  borderRadius: 12,
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 0 16px rgba(34,211,238,0.2)',
                }}
              >
                <span className="live-dot" />
                <span style={{ fontFamily: 'Orbitron', fontSize: '0.58rem', color: '#86efac', letterSpacing: 1 }}>OPEN TO WORK</span>
              </motion.div>

              {/* Floating badge - bottom left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: 80,
                  left: -16,
                  zIndex: 2,
                  background: 'rgba(10,10,26,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(14,165,233,0.4)',
                  borderRadius: 12,
                  padding: '8px 12px',
                  boxShadow: '0 0 16px rgba(14,165,233,0.2)',
                }}
              >
                <div style={{ fontFamily: 'Orbitron', fontSize: '0.9rem', fontWeight: 800, color: '#0ea5e9' }}>2+</div>
                <div style={{ fontFamily: 'Sora', fontSize: '0.6rem', color: '#94a3b8', marginTop: 1 }}>Apps Shipped</div>
              </motion.div>
            </div>
          </motion.div>

          {/* === INFO CARD === */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <div ref={cardRef} className="gradient-border" style={{ borderRadius: 20, padding: 'clamp(1.25rem, 4vw, 2rem)', transformStyle: 'preserve-3d' }}>

              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.05rem', color: '#f1f5f9', marginBottom: '0.85rem', fontWeight: 700 }}>
                Hi, I'm <span className="shimmer-text">Tejasvi Garg</span>
              </h3>
              <p style={{ fontFamily: 'Sora', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                An MCA 2026 graduate from SRM University. I build cross-platform mobile apps, responsive web experiences, and AI-powered SaaS products. With hands-on experience in React Native, Flutter, and modern AI stacks, I turn ideas into polished, production-ready software.
              </p>

              {/* Info rows */}
              {[
                { icon: '🎓', label: 'Education', value: 'MCA 2026 · SRM University' },
                { icon: '📍', label: 'Location', value: 'Hapur, Uttar Pradesh' },
                { icon: '✉️', label: 'Email', value: 'gargtejasvi076@gmail.com' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.95rem', marginTop: 2 }}>{icon}</span>
                  <div>
                    <span style={{ fontFamily: 'Sora', fontSize: '0.62rem', color: '#0ea5e9', letterSpacing: 2, display: 'block' }}>{label.toUpperCase()}</span>
                    <span style={{ fontFamily: 'Sora', fontSize: '0.82rem', color: '#f1f5f9' }}>{value}</span>
                  </div>
                </div>
              ))}

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, margin: '1.25rem 0' }}>
                {stats.map(({ value, label }) => (
                  <div key={label} className="glass-card-hover" style={{ padding: '0.75rem 0.5rem', textAlign: 'center', borderRadius: 12 }}>
                    <div style={{
                      fontFamily: 'Orbitron', fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 800,
                      background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{value}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: '0.6rem', color: '#94a3b8', marginTop: 2, letterSpacing: 0.5 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <p style={{ fontFamily: 'Orbitron', fontSize: '0.6rem', color: '#22d3ee', letterSpacing: 4, marginBottom: '0.75rem' }}>TECH STACK</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map(s => (
                  <span key={s} className="skill-chip" style={{ fontFamily: 'Sora', fontSize: '0.7rem', padding: '4px 10px', borderRadius: 999, display: 'inline-block' }}>{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

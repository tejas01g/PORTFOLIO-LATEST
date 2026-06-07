import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'
import { ExternalLink, Play } from 'lucide-react'

function haptic(ms = 15) { if (navigator?.vibrate) navigator.vibrate(ms) }

function TiltCard({ children, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (!ref.current || isTouchDevice()) return
    VanillaTilt.init(ref.current, { max: 7, speed: 400, glare: true, 'max-glare': 0.08, scale: 1.02 })
    return () => { if (ref.current?.vanillaTilt) ref.current.vanillaTilt.destroy() }
  }, [])
  return <div ref={ref} style={{ height: '100%', ...style }}>{children}</div>
}

const projects = [
  {
    id: 'devsocial', name: 'DevSocial', featured: true, live: true,
    badge: '🟢 Live on Google Play',
    description: 'A developer-focused social media platform built with React Native. Features include an AI chatbot (DevBot) powered by Groq API, AI content moderation feed, Google Sign-In with Firebase Auth, multi-image post galleries, project showcase cards with terminal-style UI, Dev.to feed integration, real-time Firestore notifications, followers/following system, trending hashtags, and a full dark glassmorphism design.',
    tags: ['React Native', 'Firebase', 'Groq AI', 'Firestore', 'Google Auth'],
    cta: 'Play Store',
    link: 'https://play.google.com/store/apps/details?id=com.socialproject.devsocial',
    demo: 'https://play.google.com/store/apps/details?id=com.socialproject.devsocial',
    icon: '⚡', color: '#22c55e',
  },
  {
    id: 'expense', name: 'AI Expense Tracker',
    description: 'An intelligent personal finance app powered by RAG (Retrieval-Augmented Generation). AI analyzes your online & offline spending patterns, categorizes transactions automatically, and surfaces smart insights through conversational queries — all with interactive charts.',
    tags: ['React Native', 'RAG', 'Groq AI', 'AsyncStorage'],
    demo: 'https://github.com/tejas01g',
    icon: '💸', color: '#0ea5e9',
  },
  {
    id: 'portaldrop', name: 'PortalDrop', inDev: true,
    description: 'An AR-based location-pinned social media app. Drop portals in the real world that others can discover and enter.',
    tags: ['React Native', 'ViroReact', 'AR', 'Firebase'],
    icon: '🌀', color: '#a78bfa',
  },
  {
    id: 'portfolio', name: 'Portfolio Website',
    description: 'This very portfolio — built with a 3D futuristic glassmorphism design, smooth scroll animations, and a cinematic developer aesthetic.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    demo: '#',
    icon: '🔮', color: '#22d3ee',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" ref={sectionRef} style={{
      minHeight: '100vh', padding: '5rem 1.25rem',
      position: 'relative', zIndex: 1,
      maxWidth: 1100, margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: '#22d3ee', letterSpacing: 6, marginBottom: 10 }}>WHAT I'VE BUILT</p>
        <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9' }}>
          <span className="shimmer-text">Projects</span>
        </h2>
        <div className="section-line" style={{ width: 100, margin: '0.75rem auto 0', borderRadius: 2 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>

        {/* === FEATURED CARD === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotateX: 16, filter: 'blur(12px)' }}
          animate={inView ? { opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ gridColumn: 'span 2' }}
        >
          <TiltCard>
            <div className="gradient-border" style={{
              borderRadius: 20, padding: 'clamp(1.25rem, 4vw, 2rem)',
              height: '100%', position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow bg */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)', pointerEvents: 'none' }} />

              {/* Live pulse */}
              <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="live-dot" />
                <span style={{ fontFamily: 'Orbitron', fontSize: '0.58rem', color: '#86efac', letterSpacing: 2 }}>LIVE</span>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{
                  width: 58, height: 58, borderRadius: 14, flexShrink: 0,
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', boxShadow: '0 0 16px rgba(34,197,94,0.15)',
                }}>{featured.icon}</div>

                <div style={{ flex: 1, minWidth: 200 }}>
                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: 999, padding: '2px 10px', marginBottom: 8,
                  }}>
                    <span style={{ fontFamily: 'Sora', fontSize: '0.7rem', color: '#86efac' }}>{featured.badge}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>
                    {featured.name}
                  </h3>

                  <p style={{ fontFamily: 'Sora', fontSize: 'clamp(0.8rem, 2vw, 0.88rem)', color: '#94a3b8', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 580 }}>
                    {featured.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
                    {featured.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
                  </div>

                  {/* Button row */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <motion.a
                      href={featured.link} target="_blank" rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => haptic(15)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))',
                        border: '1px solid rgba(34,197,94,0.4)', color: '#86efac',
                        fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: 2,
                        padding: '9px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <ExternalLink size={12} /> {featured.cta}
                    </motion.a>

                    <motion.a
                      href={featured.demo} target="_blank" rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => haptic(15)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
                        border: 'none', color: '#0a0a1a',
                        fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: 2,
                        padding: '9px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 0 16px rgba(14,165,233,0.35)',
                      }}
                    >
                      <Play size={12} fill="#0a0a1a" /> LIVE DEMO
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* === REST CARDS === */}
        {rest.map((proj, i) => (
          <motion.div key={proj.id}
            initial={{ opacity: 0, scale: 0.88, y: 40, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.18 + i * 0.1 }}
          >
            <TiltCard>
              <div className="gradient-border glass-card-hover" style={{
                borderRadius: 20, padding: 'clamp(1.1rem, 3vw, 1.75rem)',
                height: '100%', position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 110, height: 110, borderRadius: '50%', background: `radial-gradient(circle, ${proj.color}18, transparent 70%)`, pointerEvents: 'none' }} />

                {proj.inDev && (
                  <div className="dev-badge" style={{ display: 'inline-block', borderRadius: 999, padding: '3px 10px', marginBottom: 10, width: 'fit-content' }}>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '0.58rem', color: '#22d3ee', letterSpacing: 2 }}>⚙ IN DEVELOPMENT</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.85rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: `${proj.color}15`, border: `1px solid ${proj.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', boxShadow: `0 0 12px ${proj.color}22`,
                  }}>{proj.icon}</div>
                  <h3 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', fontWeight: 700, color: '#f1f5f9' }}>{proj.name}</h3>
                </div>

                <p style={{ fontFamily: 'Sora', fontSize: 'clamp(0.78rem, 2vw, 0.86rem)', color: '#94a3b8', lineHeight: 1.75, flex: 1, marginBottom: '0.85rem' }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: proj.demo ? '1rem' : 0 }}>
                  {proj.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
                </div>

                {/* Live Demo button for non-featured cards */}
                {proj.demo && !proj.inDev && (
                  <motion.a
                    href={proj.demo} target="_blank" rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => haptic(15)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      background: `linear-gradient(135deg, ${proj.color}22, ${proj.color}11)`,
                      border: `1px solid ${proj.color}44`,
                      color: proj.color,
                      fontFamily: 'Orbitron', fontSize: '0.62rem', letterSpacing: 1.5,
                      padding: '8px 14px', borderRadius: 8, textDecoration: 'none',
                      fontWeight: 600, width: 'fit-content', cursor: 'pointer',
                      marginTop: 'auto',
                    }}
                  >
                    <Play size={11} fill={proj.color} /> LIVE DEMO
                  </motion.a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

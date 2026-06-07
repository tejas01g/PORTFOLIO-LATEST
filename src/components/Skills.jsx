import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'

const categories = [
  {
    name: 'Mobile', icon: '📱',
    skills: [{ name: 'React Native', level: 90 }, { name: 'Flutter', level: 75 }, { name: 'Android Studio', level: 80 }],
  },
  {
    name: 'Web', icon: '🌐',
    skills: [{ name: 'HTML / CSS', level: 90 }, { name: 'React.js', level: 85 }, { name: 'Tailwind CSS', level: 88 }],
  },
  {
    name: 'AI / ML', icon: '🤖',
    skills: [{ name: 'Groq API / LLMs', level: 82 }, { name: 'RAG Systems', level: 75 }, { name: 'Prompt Engineering', level: 85 }],
  },
  {
    name: 'Backend & Cloud', icon: '☁️',
    skills: [{ name: 'Firebase', level: 85 }, { name: 'Google Cloud', level: 72 }, { name: 'Node.js', level: 78 }, { name: 'REST APIs', level: 82 }],
  },
  {
    name: 'Languages', icon: '💻',
    skills: [{ name: 'JavaScript', level: 80 }, { name: 'TypeScript', level: 50 }, { name: 'Python', level: 60 }],
  },
  {
    name: 'Tools & DevX', icon: '🛠',
    skills: [{ name: 'VS Code / Cursor', level: 95 }, { name: 'Git', level: 88 }, { name: 'Figma', level: 70 }],
  },
]

function SkillBar({ name, level, inView, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), delay)
      return () => clearTimeout(t)
    }
  }, [inView, level, delay])
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Sora', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#f1f5f9', fontWeight: 500 }}>{name}</span>
        <span style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: '#22d3ee', letterSpacing: 1 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(14,165,233,0.1)', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(34,211,238,0.1)' }}>
        <div className="skill-bar-fill" style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </div>
    </div>
  )
}

function CategoryCard({ cat, delay, inView }) {
  const ref = useRef(null)
  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (!ref.current || isTouchDevice()) return
    VanillaTilt.init(ref.current, { max: 7, speed: 400, glare: true, 'max-glare': 0.07 })
    return () => { if (ref.current?.vanillaTilt) ref.current.vanillaTilt.destroy() }
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 16, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay }}
      style={{ height: '100%' }}
    >
      <div ref={ref} className="gradient-border" style={{ borderRadius: 18, padding: 'clamp(1.1rem, 3vw, 1.75rem)', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
          <h3 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(0.72rem, 2vw, 0.88rem)', color: '#22d3ee', letterSpacing: 2, fontWeight: 700 }}>
            {cat.name.toUpperCase()}
          </h3>
        </div>
        {cat.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} inView={inView} delay={delay * 1000 + i * 200} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  return (
    <section id="skills" ref={sectionRef} style={{ padding: '5rem 1.25rem', position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: '#22d3ee', letterSpacing: 6, marginBottom: 10 }}>WHAT I KNOW</p>
        <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9' }}>
          <span className="shimmer-text">Skills</span> & Tools
        </h2>
        <div className="section-line" style={{ width: 100, margin: '0.75rem auto 0', borderRadius: 2 }} />
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {categories.map((cat, i) => (
          <CategoryCard key={cat.name} cat={cat} delay={0.08 + i * 0.09} inView={inView} />
        ))}
      </div>
    </section>
  )
}

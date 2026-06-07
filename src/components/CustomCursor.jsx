import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const trailPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice()) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      const cursor = cursorRef.current
      const trail = trailRef.current
      if (cursor) {
        cursor.style.left = posRef.current.x + 'px'
        cursor.style.top = posRef.current.y + 'px'
      }
      if (trail) {
        trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.12
        trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.12
        trail.style.left = trailPosRef.current.x + 'px'
        trail.style.top = trailPosRef.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          background: '#22d3ee',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px #22d3ee, 0 0 16px #22d3ee',
          left: '-100px',
          top: '-100px',
        }}
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(34,211,238,0.5)',
          background: 'transparent',
          left: '-100px',
          top: '-100px',
        }}
      />
    </>
  )
}
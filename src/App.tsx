import { useEffect, useRef, useState } from 'react'
import './App.css'

type SignalMode = 'quiet' | 'curious' | 'electric'

function SignalField({ mode }: { mode: SignalMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let frame = 0
    let animation = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const colors: Record<SignalMode, string> = {
      quiet: '#8aa0ff',
      curious: '#ff4d8d',
      electric: '#d7ff36',
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(rect.width * scale)
      canvas.height = Math.floor(rect.height * scale)
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      context.clearRect(0, 0, rect.width, rect.height)
      context.fillStyle = '#09090b'
      context.fillRect(0, 0, rect.width, rect.height)

      const fontSize = rect.width < 700 ? 9 : 11
      const stepX = fontSize * 0.72
      const stepY = fontSize * 1.16
      const ramp = mode === 'electric' ? ' .:+*#@' : mode === 'curious' ? ' ·:+=#%' : ' ·:+*%'
      context.font = `${fontSize}px "Courier New", monospace`
      context.textBaseline = 'top'

      for (let y = 0; y < rect.height; y += stepY) {
        let line = ''
        for (let x = 0; x < rect.width; x += stepX) {
          const dx = x - pointerRef.current.x
          const dy = y - pointerRef.current.y
          const pointerDistance = Math.sqrt(dx * dx + dy * dy)
          const pointerWave = pointerDistance < 190
            ? Math.sin(pointerDistance * 0.16 - frame * 0.12) * (1 - pointerDistance / 190)
            : 0
          const wave = Math.sin(x * 0.018 + frame * 0.018) +
            Math.cos(y * 0.027 - frame * 0.012) +
            pointerWave * 2
          const index = Math.max(0, Math.min(ramp.length - 1, Math.floor((wave + 4) / 8 * ramp.length)))
          line += ramp[index]
        }
        context.fillStyle = colors[mode]
        context.globalAlpha = 0.82
        context.fillText(line, 0, y)
      }

      context.globalAlpha = 1
      if (!reducedMotion) {
        frame += 1
        animation = window.requestAnimationFrame(draw)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const onPointerLeave = () => {
      pointerRef.current = { x: -1000, y: -1000 }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [mode])

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />
}

function App() {
  const [mode, setMode] = useState<SignalMode>('curious')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visit] = useState(() => Number(window.localStorage.getItem('lucky-visits') || 0) + 1)

  useEffect(() => {
    window.localStorage.setItem('lucky-visits', String(visit))
  }, [visit])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className={`site signal-${mode}`}>
      <header className="topbar">
        <a className="identity" href="#top" aria-label="Lucky Patel, back to top">
          <span className="identity-mark">LP</span>
          <span>Lucky Patel</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="site-menu" className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#notes" onClick={closeMenu}>Notes</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <SignalField mode={mode} />
        <div className="hero-copy">
          <p className="signal-label">
            <span className="live-dot" aria-hidden="true" />
            Signal {String(visit).padStart(3, '0')} / Live
          </p>
          <h1>
            <span>LUCKY</span>
            <em>Patel</em>
          </h1>
          <p className="hero-summary">A personal field for things built, broken, and found interesting.</p>
        </div>
        <div className="signal-controls" aria-label="Change signal color">
          {(['quiet', 'curious', 'electric'] as SignalMode[]).map((item) => (
            <button
              type="button"
              className={mode === item ? 'active' : ''}
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <a className="hero-next" href="#work">
          Enter the archive <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="work-section" id="work">
        <header className="section-header">
          <p>Selected work</p>
          <p>01 / Archive</p>
        </header>
        <div className="work-list">
          <article className="feature-work">
            <div className="work-visual" aria-hidden="true">
              <span className="work-ring ring-a" />
              <span className="work-ring ring-b" />
              <span className="work-center">?</span>
            </div>
            <div className="work-copy">
              <p className="work-status">Next arrival / details pending</p>
              <h2>The first<br />real thing</h2>
              <p>This frame is ready to become a real project. Name, story, image, and live URL will be added together.</p>
              <span className="work-rule">Waiting for Lucky to send the details</span>
            </div>
          </article>
          <article className="future-work">
            <span>02</span>
            <div>
              <p>Unclaimed space</p>
              <h3>Future experiment</h3>
            </div>
            <b>+</b>
          </article>
          <article className="future-work">
            <span>03</span>
            <div>
              <p>Unclaimed space</p>
              <h3>Future experiment</h3>
            </div>
            <b>+</b>
          </article>
        </div>
      </section>

      <section className="about-section" id="about">
        <header className="section-header">
          <p>About the maker</p>
          <p>02 / Lucky</p>
        </header>
        <div className="about-grid">
          <p className="about-lead">I’m building a home for my ideas—some finished, some strange, all honest.</p>
          <div className="about-body">
            <p>This is Lucky’s internet room: a place for experiments, useful things, late discoveries, and whatever deserves another look.</p>
            <p>The work is intentionally not all here yet. Better to leave a doorway open than fill it with invented history.</p>
          </div>
        </div>
      </section>

      <section className="notes-section" id="notes">
        <header className="section-header">
          <p>Field notes</p>
          <p>03 / Log</p>
        </header>
        <div className="empty-log">
          <span>000</span>
          <p>No published notes yet.</p>
          <a href="#contact">Ask Lucky what changed →</a>
        </div>
      </section>

      <footer id="contact">
        <p>Start a conversation</p>
        <a className="contact-link" href="mailto:hello@luckypatel.tech">hello@luckypatel.tech</a>
        <div className="footer-row">
          <span>Lucky Patel © 2026</span>
          <a href="https://github.com/Teqoflucky" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="#top">Back to signal ↑</a>
        </div>
      </footer>
    </main>
  )
}

export default App

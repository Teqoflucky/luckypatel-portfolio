import { useEffect, useState } from 'react'
import './App.css'

const objects = [
  { code: 'A-17', name: 'A useful mistake', note: 'A failed assumption, preserved' },
  { code: 'B-04', name: 'A tiny system', note: 'Rules, inputs, and an outcome' },
  { code: 'C-29', name: 'An unfinished loop', note: 'Worth reopening tomorrow' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [objectIndex, setObjectIndex] = useState(0)
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date()))
    }
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const object = objects[objectIndex]

  return (
    <main className="observatory">
      <header className="masthead">
        <a className="identity" href="#top" aria-label="Lucky Patel, top">Lucky Patel</a>
        <p className="edition">Personal observatory / 2026</p>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Index'}
        </button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
      </header>

      <section className="instrument" id="top">
        <div className="instrument-title">
          <p className="station">
            <span className="station-dot" aria-hidden="true" />
            Station LP-01
          </p>
          <h1>Lucky<br />Patel</h1>
          <p className="title-note">Making small systems with large curiosity.</p>
        </div>

        <div className="finder">
          <div className="finder-labels">
            <span>Object no.</span>
            <span>{object.code}</span>
          </div>
          <div className="finder-window" aria-live="polite">
            <div className="orbit orbit-a" aria-hidden="true" />
            <div className="orbit orbit-b" aria-hidden="true" />
            <div className="finder-body">
              <span>{object.name}</span>
              <small>{object.note}</small>
            </div>
          </div>
          <div className="finder-controls">
            <button
              type="button"
              onClick={() => setObjectIndex((current) => (current - 1 + objects.length) % objects.length)}
              aria-label="Previous object"
            >
              −
            </button>
            <span>{String(objectIndex + 1).padStart(2, '0')} / {String(objects.length).padStart(2, '0')}</span>
            <button
              type="button"
              onClick={() => setObjectIndex((current) => (current + 1) % objects.length)}
              aria-label="Next object"
            >
              +
            </button>
          </div>
        </div>

        <a className="enter" href="#work">
          Enter the index
          <span aria-hidden="true">↓</span>
        </a>
        <p className="local-time">Local {time || '00:00'}</p>
      </section>

      <section className="work" id="work">
        <header className="section-index">
          <p>01 / Work index</p>
          <p>Arrivals are grouped, not ranked</p>
        </header>

        <article className="featured-work">
          <div className="work-scale">
            <span>Arrival 01</span>
            <b>Q</b>
          </div>
          <div className="work-detail">
            <p className="status">First entry / waiting for details</p>
            <h2>The first<br />real project</h2>
            <p>The title, process, and outcome will live here once the project is ready.</p>
          </div>
        </article>

        <div className="work-list">
          <article>
            <span>02</span>
            <h3>Open frame</h3>
            <p>Content pending</p>
          </article>
          <article>
            <span>03</span>
            <h3>Open frame</h3>
            <p>Content pending</p>
          </article>
          <article>
            <span>04</span>
            <h3>Open frame</h3>
            <p>Content pending</p>
          </article>
        </div>
      </section>

      <section className="notes" id="notes">
        <header className="section-index">
          <p>02 / Field notes</p>
          <p>Observations in progress</p>
        </header>
        <div className="empty-notes">
          <span>000</span>
          <p>No notes published yet.</p>
          <p>The log remains blank until Lucky adds a real observation.</p>
        </div>
      </section>

      <section className="about" id="about">
        <header className="section-index">
          <p>03 / Observer</p>
          <p>Lucky Patel</p>
        </header>
        <div className="about-grid">
          <p>I keep a close eye on systems, interfaces, and the useful oddities between them.</p>
          <div>
            <p>This site is the working index of things I make and things I am learning while making them.</p>
            <a href="https://github.com/Teqoflucky" target="_blank" rel="noreferrer">
              View GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>Lucky Patel © 2026</p>
        <a href="#top">Return to station ↑</a>
      </footer>
    </main>
  )
}

export default App

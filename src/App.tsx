import { useState } from 'react'
import './App.css'

const curiosities = [
  { number: '01', word: 'A door', line: 'A doorway only opens while you are looking for it.' },
  { number: '02', word: 'A clock', line: 'It does not keep time. It keeps appointments.' },
  { number: '03', word: 'A switch', line: 'One small decision changes the whole room.' },
  { number: '04', word: 'A drawer', line: 'Something useful is hiding under something ordinary.' },
  { number: '05', word: 'A map', line: 'The shortest route is rarely the most memorable.' },
]

function App() {
  const [curiosityIndex, setCuriosityIndex] = useState(() => {
    const stored = Number(window.localStorage.getItem('lucky-curiosity') || 0)
    return stored % curiosities.length
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const curiosity = curiosities[curiosityIndex]

  const changeCuriosity = () => {
    const next = (curiosityIndex + 1) % curiosities.length
    window.localStorage.setItem('lucky-curiosity', String(next))
    setCuriosityIndex(next)
  }

  return (
    <main className="cabinet">
      <header className="masthead">
        <a className="nameplate" href="#top" aria-label="Lucky Patel, back to top">
          Lucky Patel
        </a>
        <p>Personal index / 2026</p>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="opening" id="top">
        <div className="opening-copy">
          <p className="issue">Issue no. 1 / The beginning</p>
          <h1>
            Come back
            <em>curious.</em>
          </h1>
          <p className="opening-note">
            Lucky Patel’s personal place for projects, experiments, and useful surprises.
          </p>
        </div>

        <button
          className={`curiosity-door ${drawerOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <span className="door-label">Today’s object</span>
          <span className="door-window" aria-hidden="true">
            <span className="door-word">{curiosity.word}</span>
          </span>
          <span className="door-action">
            {drawerOpen ? 'Close object' : 'Open object'} <b aria-hidden="true">↗</b>
          </span>
        </button>

        {drawerOpen && (
          <aside className="object-card" aria-live="polite">
            <p>{curiosity.number}</p>
            <blockquote>{curiosity.line}</blockquote>
            <button type="button" onClick={changeCuriosity}>Next object →</button>
          </aside>
        )}
      </section>

      <section className="ticker" aria-label="Site themes">
        <div>
          <span>Projects in progress</span>
          <b>✳</b>
          <span>Things worth returning to</span>
          <b>✳</b>
          <span>Lucky Patel</span>
        </div>
      </section>

      <section className="work" id="work">
        <header className="section-rule">
          <p>Selected work</p>
          <span>01—08</span>
        </header>

        <article className="incoming">
          <div className="incoming-number">01</div>
          <div className="incoming-copy">
            <p className="incoming-label">Incoming</p>
            <h2>The first real project</h2>
            <p>Its name, images, story, and link belong here when Lucky shares them.</p>
          </div>
          <div className="incoming-mark" aria-hidden="true">
            <span>LP</span>
          </div>
        </article>

        <div className="future-grid">
          <article>
            <span>02</span>
            <h3>Open slot</h3>
            <p>Project details pending</p>
          </article>
          <article>
            <span>03</span>
            <h3>Open slot</h3>
            <p>Project details pending</p>
          </article>
          <article>
            <span>04</span>
            <h3>Open slot</h3>
            <p>Project details pending</p>
          </article>
        </div>
      </section>

      <section className="about" id="about">
        <header className="section-rule">
          <p>About</p>
          <span>Lucky’s index</span>
        </header>
        <div className="about-layout">
          <h2>I make small systems that leave room for surprise.</h2>
          <div>
            <p>This is a working index of Lucky Patel’s projects and experiments. It will grow without pretending that unfinished things are finished.</p>
            <p>There is no resume wall here. The work will speak in its own form, and the site will keep changing as new things arrive.</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p>Start a conversation</p>
        <a href="mailto:hello@luckypatel.tech">hello@luckypatel.tech</a>
        <div className="footer-rule">
          <span>Lucky Patel © 2026</span>
          <a href="https://github.com/Teqoflucky" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="#top">Top ↑</a>
        </div>
      </footer>
    </main>
  )
}

export default App

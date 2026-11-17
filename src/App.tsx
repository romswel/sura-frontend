import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Brand } from './components/Brand'
import Icon from './components/Icon'
import Home from './components/Home'
import TeamPage from './components/TeamPage'
import ProjectDesk from './components/ProjectDesk'
import UpdatesPage from './components/UpdatesPage'
import Modal from './components/Modal'
import { ConceptDemo } from './components/ConceptSite'
import type { Concept, ProjectKind } from './content'
import { useProject } from './hooks/useProject'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  const [preview, setPreview] = useState<Concept | null>(null)
  const [step, setStep] = useState(0)
  const [deskView, setDeskView] = useState<'brief' | 'checklist'>('brief')
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const focusChecklist = useRef(false)
  const project = useProject()
  const isDesk = hash === '#/planner'
  const isTeam = hash === '#/team'
  const isUpdates = hash === '#/updates'

  useEffect(() => {
    const navigate = () => {
      setHash(window.location.hash)
      setMenuOpen(false)
      setPreview(null)
    }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useLayoutEffect(() => {
    document.title = isDesk
      ? 'Your project desk — Sura'
      : isTeam
        ? 'Team workspace — Sura'
        : isUpdates
          ? 'Updates — Sura'
          : 'Sura — Websites, shops & useful web apps'
    if (isDesk || isTeam || isUpdates || !hash || hash === '#') window.scrollTo(0, 0)
    else document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash, isDesk, isTeam, isUpdates])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target))
        setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', outside)
    }
  }, [menuOpen])
  useLayoutEffect(() => {
    if (isDesk && deskView === 'checklist' && focusChecklist.current) {
      document.getElementById('checklist-title')?.focus()
      focusChecklist.current = false
    }
  }, [isDesk, deskView])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#151617' : '#f7f7f3')
    try {
      localStorage.setItem('sura.theme', next)
    } catch {
      /* Theme still works. */
    }
  }
  function begin(kind: ProjectKind, features: string[] = [], concept?: Concept) {
    project.updateDraft({
      kind,
      features: [...new Set([...project.draft.features, ...features])],
      ...(concept ? { reference: concept.name } : {}),
    })
    setStep(1)
    setPreview(null)
    window.location.hash = 'start'
    requestAnimationFrame(() => {
      document.getElementById('planner-step-title')?.focus({ preventScroll: true })
      document.getElementById('start-title')?.scrollIntoView({ block: 'start' })
    })
  }
  const openChecklist = () => {
    focusChecklist.current = true
    setDeskView('checklist')
    window.location.hash = '/planner'
  }
  const planner = { ...project, step, setStep, openChecklist }

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
          document.getElementById('main')?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <header className="site-header" ref={header}>
        <div className="container header-inner">
          <Brand />
          <span className="header-descriptor">
            INDEPENDENT
            <br />
            WEB STUDIO
          </span>
          <nav
            id="main-navigation"
            className={'navigation ' + (menuOpen ? 'is-open' : '')}
            aria-label="Main navigation"
          >
            <a href="#showcase" onClick={() => setMenuOpen(false)}>
              Explore work
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              What we do
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              Our approach
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About Sura
            </a>
            <a href="#/updates" onClick={() => setMenuOpen(false)}>
              Updates
            </a>
            <a className="mobile-nav-cta" href="#start" onClick={() => setMenuOpen(false)}>
              Start a project
              <Icon name="diagonal" size={17} />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-toggle"
              aria-label={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'}
              onClick={toggleTheme}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
            <a href="#start" className="header-cta">
              Let’s build something
              <Icon name="diagonal" size={16} />
            </a>
            <button
              ref={menuButton}
              className="menu-toggle icon-button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      {isTeam ? (
        <TeamPage />
      ) : isUpdates ? (
        <UpdatesPage />
      ) : isDesk ? (
        <ProjectDesk {...planner} view={deskView} setView={setDeskView} />
      ) : (
        <Home onPreview={setPreview} onBegin={begin} planner={planner} />
      )}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand />
              <p>
                Websites, shops, and useful web apps.
                <br />
                Built with care. Built together.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <span>EXPLORE</span>
                <a href="#showcase">The possibilities</a>
                <a href="#services">What we do</a>
                <a href="#about">About Sura</a>
                <a href="#/updates">Updates</a>
              </div>
              <div>
                <span>MAKE A START</span>
                <a href="#start">Build your brief</a>
                <a href="#/planner">Your project desk</a>
                <a href="#/team">Future team workspace</a>
              </div>
            </div>
            <a
              className="footer-top"
              href="#"
              aria-label="Back to top"
              onClick={(event) => {
                event.preventDefault()
                document.getElementById('main')?.focus({ preventScroll: true })
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
            >
              <Icon name="diagonal" size={23} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Sura. An independent web team.</span>
            <span>Good things take a little teamwork.</span>
          </div>
        </div>
      </footer>
      {preview && (
        <Modal titleId="concept-title" onClose={() => setPreview(null)}>
          <div className="concept-dialog-heading">
            <span className="eyebrow">THE WORKBENCH / INTERACTIVE CONCEPT</span>
            <h2 id="concept-title">{preview.name}</h2>
            <p>{preview.description}</p>
            <div className="capability-list">
              {preview.capabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>
          </div>
          <ConceptDemo concept={preview} />
          <div className="concept-dialog-bottom">
            <div>
              <strong>See something that feels like your business?</strong>
              <p>Use this as a starting point for your own project.</p>
            </div>
            <button
              className="button button-primary"
              onClick={() =>
                begin(
                  preview.kind,
                  preview.id === 'offday'
                    ? ['Product catalog', 'Search & filters']
                    : ['Contact & inquiries'],
                  preview,
                )
              }
            >
              Use this direction
              <Icon name="diagonal" size={18} />
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

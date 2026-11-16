import { useEffect, useState } from 'react'
import { Arrow, Brand, Mark, ServiceIcon } from './components/Brand'
import { ConceptSite } from './components/ConceptSite'
import BriefForm from './components/BriefForm'
import Modal from './components/Modal'
import TeamPage from './components/TeamPage'
import { categories, concepts, faqs } from './content'
import type { Concept } from './content'
import { contactEmail } from './config'

export default function App() {
  const [teamPage, setTeamPage] = useState(window.location.hash === '#/team')
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState('All concepts')
  const [preview, setPreview] = useState<Concept | null>(null)
  const [projectType, setProjectType] = useState('Not sure yet')
  useEffect(() => {
    const navigate = () => {
      const isTeam = window.location.hash === '#/team'
      setTeamPage(isTeam)
      setMenuOpen(false)
      if (isTeam || !window.location.hash) window.scrollTo(0, 0)
      else
        requestAnimationFrame(() =>
          document.getElementById(window.location.hash.slice(1))?.scrollIntoView(),
        )
      document.title = isTeam ? 'Team space — Sura' : 'Sura — Your next chapter, online.'
    }
    window.addEventListener('hashchange', navigate)
    navigate()
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  const visibleConcepts = concepts.filter(
    (concept) => category === 'All concepts' || concept.category === category,
  )

  function startWithConcept(concept: Concept) {
    setProjectType(concept.category)
    setPreview(null)
    window.location.hash = 'start'
    requestAnimationFrame(() => {
      document.getElementById('start')?.scrollIntoView()
      document
        .querySelector<HTMLInputElement>('#start input[name="name"]')
        ?.focus({ preventScroll: true })
    })
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close −' : 'Menu +'}
          </button>
          <nav
            id="main-navigation"
            className={menuOpen ? 'navigation is-open' : 'navigation'}
            aria-label="Main navigation"
          >
            <a href="#showcase" onClick={() => setMenuOpen(false)}>
              Explore concepts
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              Our approach
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              The team
            </a>
            <span className="nav-divider" />
            <a className="nav-cta" href="#start" onClick={() => setMenuOpen(false)}>
              Let’s talk <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>
      {teamPage ? (
        <TeamPage />
      ) : (
        <main id="main">
          <section className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="status-pill">
                <span />A small team. Open for new beginnings.
              </span>
              <h1 id="hero-title">
                Your next
                <br />
                chapter,
                <br />
                <span className="hero-serif">online.</span>
                <span className="hero-asterisk" aria-hidden="true">
                  ✳
                </span>
              </h1>
              <p>
                You have something worth sharing.
                <br />
                We build the website that brings it to the world.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#start">
                  Let’s build something <Arrow diagonal />
                </a>
                <a className="text-link" href="#showcase">
                  Find your inspiration <Arrow />
                </a>
              </div>
              <div className="hero-footnote">
                <span className="tiny-mark">
                  <Mark />
                </span>
                <span>
                  Thoughtful websites. Real collaboration.
                  <br />
                  <span className="muted">Built around your business, from the start.</span>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-caption">
                <span>FROM “WHAT IF” TO YOUR OWN WEBSITE</span>
                <span>↙</span>
              </div>
              <div className="hero-browser">
                <div className="browser-bar">
                  <div className="browser-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>your-next-chapter.website</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <ConceptSite concept={concepts[0]!} compact />
              </div>
              <div className="floating-note">
                <span className="note-icon">↗</span>
                <div>
                  <strong>Your business belongs here.</strong>
                  <span>Let’s make it feel like you.</span>
                </div>
                <span className="note-star" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="visual-baseline">
                <span>01 — A LITTLE POSSIBILITY</span>
                <span>DESIGNED BY SURA</span>
              </div>
            </div>
          </section>
          <div className="values-strip">
            <div className="container">
              <span>A GOOD IDEA DESERVES A GOOD WEBSITE</span>
              <span>
                Independent businesses <i>✳</i> Local favorites <i>✳</i> Big little ideas
              </span>
            </div>
          </div>
          <section className="section container services" aria-labelledby="services-title">
            <div className="section-heading">
              <span className="eyebrow">01 / WHAT WE CAN BUILD TOGETHER</span>
              <h2 id="services-title">
                A small start.
                <br />
                <span className="muted">A world of possibilities.</span>
              </h2>
              <p>
                A café around the corner. A craft you have made your own. A business ready for its
                next step. Let’s give it a place online.
              </p>
            </div>
            <div className="services-grid">
              {[
                {
                  icon: 'window' as const,
                  number: '01',
                  title: 'Your first website',
                  text: 'A clear, welcoming home for your business. Show people what you do, why it matters, and how to find you.',
                  tags: 'Business sites · Landing pages',
                },
                {
                  icon: 'spark' as const,
                  number: '02',
                  title: 'Something more you',
                  text: 'A portfolio, a product showcase, or a fresh look. A website shaped around your work and the people you want to reach.',
                  tags: 'Portfolios · Catalogs · Redesigns',
                },
                {
                  icon: 'layers' as const,
                  number: '03',
                  title: 'Room to grow',
                  text: 'Have a bigger idea? We can plan the forms, workflows, and useful features that make sense for your next stage.',
                  tags: 'Custom features · Business tools',
                },
              ].map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-card-top">
                    <ServiceIcon type={service.icon} />
                    <span>{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="service-tags">{service.tags}</span>
                </article>
              ))}
            </div>
          </section>
          <section className="showcase section" id="showcase" aria-labelledby="showcase-title">
            <div className="container">
              <div className="showcase-heading">
                <div>
                  <span className="eyebrow">02 / PICTURE THE POSSIBILITIES</span>
                  <h2 id="showcase-title">
                    See your business
                    <br />
                    <span className="serif">in a different light.</span>
                  </h2>
                </div>
                <p>
                  A few original concepts to get the ideas going.
                  <br />
                  Different businesses. Different personalities.
                  <br />
                  <span className="muted">Something here might feel a little like you.</span>
                </p>
              </div>
              <div className="filter-bar" role="group" aria-label="Filter website concepts">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? 'filter active' : 'filter'}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                    {item === 'All concepts' && <span>04</span>}
                  </button>
                ))}
              </div>
              <p className="sr-only" role="status">
                {visibleConcepts.length} website{' '}
                {visibleConcepts.length === 1 ? 'concept' : 'concepts'} shown
              </p>
              <div className="concept-grid">
                {visibleConcepts.map((concept) => (
                  <article className="concept-card" key={concept.id}>
                    <button
                      className="concept-preview"
                      onClick={() => setPreview(concept)}
                      aria-label={`Explore ${concept.name}, ${concept.category} website concept`}
                    >
                      <ConceptSite concept={concept} compact />
                      <span className="preview-badge">
                        Explore concept <Arrow diagonal />
                      </span>
                    </button>
                    <div className="concept-card-info">
                      <div>
                        <span className="concept-category">
                          {concept.category} <span> / CONCEPT</span>
                        </span>
                        <h3>{concept.title}</h3>
                      </div>
                      <button
                        className="circle-button"
                        aria-label={`View ${concept.name} concept details`}
                        onClick={() => setPreview(concept)}
                      >
                        <Arrow diagonal />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <p className="concept-disclaimer">
                <span>↳</span> These are design explorations, not client projects. Your website
                starts with your own story.
              </p>
            </div>
          </section>
          <section
            className="section container approach"
            id="approach"
            aria-labelledby="approach-title"
          >
            <div className="section-heading">
              <span className="eyebrow">03 / NO COMPLICATED FIRST STEPS</span>
              <h2 id="approach-title">
                Good things start
                <br />
                <span className="muted">with a conversation.</span>
              </h2>
              <p>
                You know your business. We bring the web part. Here’s how we can put the two
                together.
              </p>
            </div>
            <div className="process-grid">
              {[
                [
                  '01',
                  'We listen.',
                  'Tell us about your business, your people, and what you have in mind. No technical vocabulary needed.',
                ],
                [
                  '02',
                  'We find the shape.',
                  'Together, we agree on the pages, features, scope, and a quote. A clear plan before the building begins.',
                ],
                [
                  '03',
                  'We build with you.',
                  'You see the progress, share your thoughts, and help make the website feel right for your business.',
                ],
                [
                  '04',
                  'Your next chapter.',
                  'We check the details together and walk you through your website, ready for its first visitors.',
                ],
              ].map(([number, title, text]) => (
                <article key={number}>
                  <span className="process-number">
                    {number}
                    <span aria-hidden="true">↗</span>
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="about-section" id="about" aria-labelledby="about-title">
            <div className="container about-grid">
              <div className="about-art" aria-hidden="true">
                <Mark />
                <span>
                  GOOD THINGS
                  <br />
                  START SMALL.
                </span>
                <div className="about-art-bottom">
                  <span>SURA / EST. 2026</span>
                  <span>✳</span>
                </div>
              </div>
              <div className="about-copy">
                <span className="eyebrow">04 / THE PEOPLE BEHIND THE PIXELS</span>
                <h2 id="about-title">
                  Two people.
                  <br />
                  One shared
                  <br />
                  <span className="serif">starting point.</span>
                </h2>
                <p>
                  We’re Sura. A small team of two friends, starting from zero and building something
                  we believe in.
                </p>
                <p>
                  Our aim is simple: help businesses take their place online through thoughtful
                  websites and honest collaboration. We’re at the beginning of our story, and we’d
                  love to be part of yours.
                </p>
                <div className="about-signoff">
                  <Mark />
                  <span>
                    Small team. A direct conversation.
                    <br />
                    <span className="muted">Your project matters to the people building it.</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="section container faq-section" aria-labelledby="faq-title">
            <div>
              <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
              <h2 id="faq-title">
                Good questions.
                <br />
                <span className="muted">Straight answers.</span>
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section
            className="section start-section container"
            id="start"
            aria-labelledby="start-title"
          >
            <div className="start-copy">
              <span className="eyebrow">05 / YOUR IDEA STARTS HERE</span>
              <h2 id="start-title">
                Big idea.
                <br />
                Small question.
                <br />
                <span className="serif">Tell us.</span>
              </h2>
              <p>
                You don’t need to have it all figured out.
                <br />A few words about your business are a good start.
              </p>
              <div className="contact-pending">
                <span className="status-dot" />
                <div>
                  <strong>
                    {contactEmail
                      ? 'Let’s hear what you have in mind.'
                      : 'A new beginning, in progress.'}
                  </strong>
                  {contactEmail ? (
                    <p>
                      Prepare a brief, then open your email app to send it. Or{' '}
                      <a className="text-link" href={`mailto:${contactEmail}`}>
                        email us directly <Arrow diagonal />
                      </a>
                      .
                    </p>
                  ) : (
                    <p>
                      Our contact details will be here soon. For now, prepare a project brief and
                      keep it for when we connect.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <BriefForm projectType={projectType} onTypeChange={setProjectType} />
          </section>
        </main>
      )}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand />
              <p>Your next chapter, online.</p>
            </div>
            <div className="footer-links">
              <a href="#showcase">Explore concepts</a>
              <a href="#about">Meet Sura</a>
              <a href="#/team">
                Team space <Arrow diagonal />
              </a>
            </div>
            <a className="footer-back" href="#" aria-label="Back to top">
              ↑
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Sura. Built with intention.</span>
            <span>A small team. A fresh start.</span>
          </div>
        </div>
      </footer>
      {preview && (
        <Modal titleId="concept-dialog-title" onClose={() => setPreview(null)}>
          <div className="dialog-heading">
            <span className="eyebrow">{preview.category} / ORIGINAL CONCEPT</span>
            <h2 id="concept-dialog-title">{preview.name}</h2>
            <p>{preview.description}</p>
          </div>
          <ConceptSite concept={preview} />
          <div className="dialog-bottom">
            <div>
              <h3>Imagine this for your business.</h3>
              <ul>
                {preview.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="form-note">
                Illustrative design only.{' '}
                {preview.category === 'Shops'
                  ? 'No checkout, payments, or orders are connected.'
                  : 'Bookings, forms, and contact services are not connected.'}
              </p>
            </div>
            <button className="button button-light" onClick={() => startWithConcept(preview)}>
              Start with this idea <Arrow diagonal />
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

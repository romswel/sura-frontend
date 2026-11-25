import { useState } from 'react'
import { categories, concepts, faqs, processSteps, services } from '../content'
import type { Concept, ProjectKind } from '../content'
import { ConceptCover } from './ConceptSite'
import { Mark } from './Brand'
import Icon from './Icon'
import ProjectPlanner from './ProjectPlanner'
import type { PlannerProps } from './ProjectPlanner'

type Props = {
  onPreview: (concept: Concept) => void
  onBegin: (kind: ProjectKind, features?: string[]) => void
  planner: PlannerProps
}

export default function Home({ onPreview, onBegin, planner }: Props) {
  const [featured, setFeatured] = useState(0)
  const [category, setCategory] = useState('All work')
  const selected = concepts[featured] ?? concepts[0]!
  const visible = concepts.filter(
    (concept) => category === 'All work' || concept.category === category,
  )
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="status-dot" />
            <span>INDEPENDENT WEB DESIGN & DEVELOPMENT</span>
          </div>
          <h1 id="hero-title">
            Welcome to
            <br />
            <span>Surafy.inc</span>
          </h1>
          <p>
            We’re Sura. A small team building considered websites, online shops, and useful web
            apps. From your first idea to a working website, we’re in it with you.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#start">
              Plan your project
              <Icon name="diagonal" size={18} />
            </a>
            <a className="text-link" href="#showcase">
              Explore the possibilities
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="hero-signoff">
            <Mark />
            <p>
              Two people. Direct collaboration.
              <br />
              <span>A clear plan before the first line of code.</span>
            </p>
          </div>
        </div>
        <div className="hero-workbench">
          <div className="workbench-label">
            <span>THE WORKBENCH</span>
            <span>ORIGINAL CONCEPTS / 0{featured + 1}</span>
          </div>
          <button
            className="hero-featured"
            onClick={() => onPreview(selected)}
            aria-label={'Explore ' + selected.name + ' concept'}
          >
            <ConceptCover concept={selected} hero />
            <span className="featured-open">
              Explore the concept
              <Icon name="diagonal" size={19} />
            </span>
          </button>
          <div className="featured-switcher" aria-label="Featured concept">
            {concepts.slice(0, 3).map((concept, index) => (
              <button
                aria-pressed={featured === index}
                onClick={() => setFeatured(index)}
                key={concept.id}
              >
                <span>0{index + 1}</span>
                {['Objects', 'Coffee', 'Spaces'][index]}
                <span className="switch-indicator" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="offer-strip">
        <div className="container">
          <span>GOOD DESIGN. USEFUL DEVELOPMENT.</span>
          <div>
            <a href="#services">
              Websites
              <Icon name="diagonal" size={15} />
            </a>
            <a href="#services">
              Online shops
              <Icon name="diagonal" size={15} />
            </a>
            <a href="#services">
              Web apps
              <Icon name="diagonal" size={15} />
            </a>
          </div>
          <span className="offer-end">Built around your business.</span>
        </div>
      </div>

      <section className="work-section section" id="showcase" aria-labelledby="work-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / THE POSSIBILITIES</span>
              <h2 id="work-title">
                Four businesses.
                <br />
                <span className="muted">Four ways to build.</span>
              </h2>
            </div>
            <p>
              Different businesses need different websites. Open a concept to browse a collection,
              explore a menu, or get to know a studio.
            </p>
          </div>
          <div className="work-toolbar">
            <div className="work-filters" aria-label="Filter concepts">
              {categories.map((item) => (
                <button
                  key={item}
                  className={item === category ? 'is-active' : ''}
                  aria-pressed={item === category}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="work-count" role="status">
              {String(visible.length).padStart(2, '0')} CONCEPT{visible.length !== 1 ? 'S' : ''}
            </span>
          </div>
          <div className="work-grid">
            {visible.map((concept, index) => (
              <article className="work-card" key={concept.id}>
                <button
                  className="work-cover-button"
                  aria-label={'Explore ' + concept.name + ', ' + concept.category + ' concept'}
                  onClick={() => onPreview(concept)}
                >
                  <ConceptCover concept={concept} />
                  <span className="work-open">
                    <Icon name="diagonal" size={23} />
                  </span>
                </button>
                <div className="work-card-info">
                  <div>
                    <div className="work-card-title">
                      <h3>{concept.name}</h3>
                      <span>CONCEPT / 0{index + 1}</span>
                    </div>
                    <p>{concept.category}</p>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => onPreview(concept)}
                    aria-label={'Open ' + concept.name + ' details'}
                  >
                    <Icon name="plus" size={20} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="concept-note">
            <span className="note-mark">↳</span>Original design explorations, not client deliveries.
            Your project starts with your business.
          </p>
        </div>
      </section>
      <Services onBegin={onBegin} />
      <Process />
      <section className="about-section section" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="studio-tile">
            <div className="studio-tile-top">
              <span>SURA / AN INDEPENDENT STUDIO</span>
              <Icon name="diagonal" size={20} />
            </div>
            <Mark />
            <div className="studio-tile-bottom">
              <span>
                Small team.
                <br />
                Shared ambition.
              </span>
              <span>
                DESIGN
                <br />
                DEVELOPMENT
                <br />
                TOGETHER.
              </span>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">04 / THE PEOPLE BEHIND THE WORK</span>
            <h2 id="about-title">
              Small team.
              <br />
              Close to the work.
            </h2>
            <p>
              Sura started with two friends and a simple idea: build useful things, do the work
              properly, and make the process easier for the people we work with.
            </p>
            <p>
              You work directly with the people designing and developing your website. We ask
              questions, share progress, and work through the details with you.
            </p>
            <div className="about-principles">
              <span>
                <Icon name="check" size={16} />
                Clear scope
              </span>
              <span>
                <Icon name="check" size={16} />
                Direct conversation
              </span>
              <span>
                <Icon name="check" size={16} />
                Thoughtful handoff
              </span>
            </div>
            <a href="#start" className="text-link">
              Let’s find your starting point
              <Icon name="diagonal" size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="faq-section section container" aria-labelledby="faq-title">
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
                <span className="faq-plus">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="start-section section" id="start" aria-labelledby="start-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">05 / LET’S MAKE SOMETHING USEFUL</span>
              <h2 id="start-title">
                An idea is enough.
                <br />
                <span className="muted">Let’s give it a plan.</span>
              </h2>
            </div>
            <p>
              A few simple choices turn into a useful project brief. No account, no automatic quote,
              no pressure.
            </p>
          </div>
          <ProjectPlanner {...planner} />
          <div className="start-footnote">
            <span>
              <span className="status-dot" />
              Contact details are being prepared.
            </span>
            <a className="text-link" href="#/planner">
              Open your project desk
              <Icon name="diagonal" size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function Services({ onBegin }: { onBegin: Props['onBegin'] }) {
  const [active, setActive] = useState<string | null>('websites')
  return (
    <section
      className="services-section section container"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">02 / WHAT WE CAN BUILD</span>
          <h2 id="services-title">
            The right website.
            <br />
            <span className="muted">For the way you work.</span>
          </h2>
        </div>
        <p>
          A first website, a better shop, or a tool that makes the day easier. We start with what
          your business needs.
        </p>
      </div>
      <div className="services-list">
        {services.map((service) => (
          <article
            className={'service-row ' + (active === service.id ? 'is-open' : '')}
            key={service.id}
          >
            <button
              className="service-toggle"
              aria-expanded={active === service.id}
              aria-controls={'service-' + service.id}
              onClick={() => setActive(active === service.id ? null : service.id)}
            >
              <span className="service-number">{service.label.split(' / ')[0]}</span>
              <span>
                <strong>{service.title}</strong>
                <span>{service.description}</span>
              </span>
              <span className="service-expand">
                <Icon name={active === service.id ? 'minus' : 'plus'} size={21} />
              </span>
            </button>
            {active === service.id && (
              <div className="service-detail" id={'service-' + service.id}>
                <p>{service.detail}</p>
                <div>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="text-link"
                    onClick={() => onBegin(service.kind, service.features)}
                  >
                    Plan{' '}
                    {service.kind === 'Web app'
                      ? 'a web app'
                      : service.kind === 'Online shop'
                        ? 'an online shop'
                        : 'a website'}
                    <Icon name="diagonal" size={17} />
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="services-footnote">
        <span>Already have a website?</span>
        <button className="text-link" onClick={() => onBegin('Redesign')}>
          Let’s make it work better
          <Icon name="diagonal" size={16} />
        </button>
      </div>
    </section>
  )
}

function Process() {
  const [active, setActive] = useState(0)
  const step = processSteps[active]!
  return (
    <section className="process-section section" id="approach" aria-labelledby="process-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / FROM IDEA TO HANDOFF</span>
            <h2 id="process-title">
              You’re part of
              <br />
              <span className="muted">the process.</span>
            </h2>
          </div>
          <p>Clear steps, room for feedback, and a shared understanding of what we’re building.</p>
        </div>
        <div className="process-grid">
          <div className="process-navigation" aria-label="Explore our process">
            {processSteps.map((item, index) => (
              <button
                key={item.short}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span>0{index + 1}</span>
                <strong>{item.short}</strong>
                <Icon name="arrow" size={19} />
              </button>
            ))}
          </div>
          <div className="process-explanation" key={active}>
            <span className="eyebrow">
              0{active + 1} / {step.short.toUpperCase()}
            </span>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
            <div className="process-deliverables">
              <div>
                <Icon name="folder" size={18} />
                <span>WHAT WE WORK TOWARD</span>
              </div>
              {step.outputs.map((output) => (
                <p key={output}>
                  <Icon name="check" size={16} />
                  {output}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

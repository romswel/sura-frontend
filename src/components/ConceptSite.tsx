import { useLayoutEffect, useRef, useState } from 'react'
import type { Concept } from '../content'
import Icon from './Icon'

export function ConceptCover({ concept, hero = false }: { concept: Concept; hero?: boolean }) {
  return (
    <div
      className={'concept-cover cover-' + concept.id + (hero ? ' cover-hero' : '')}
      aria-hidden="true"
    >
      {concept.image && (
        <img
          src={concept.image}
          alt=""
          width="1104"
          height="736"
          loading={hero ? 'eager' : 'lazy'}
          fetchPriority={hero ? 'high' : 'auto'}
        />
      )}
      <div className="cover-top">
        <span>
          {concept.id === 'offday'
            ? 'OFFDAY / OBJECTS'
            : concept.id === 'morrow'
              ? 'morrow coffee'
              : concept.id === 'forma'
                ? 'F / FORMA STUDIO'
                : 'ALEX MORGAN'}
        </span>
        <span>{concept.id === 'alex' ? 'INDEPENDENT CREATIVE' : 'A SURA CONCEPT'}</span>
      </div>
      <div className="cover-heading">
        {concept.id === 'offday' ? (
          <>
            Good objects.
            <br />
            Everyday company.
          </>
        ) : concept.id === 'morrow' ? (
          <>
            A slower start.
            <br />A better morning.
          </>
        ) : concept.id === 'forma' ? (
          <>
            A little space.
            <br />A different feeling.
          </>
        ) : (
          <>
            Independent
            <br />
            <span>by design.</span>
          </>
        )}
      </div>
      {concept.id === 'alex' && <span className="alex-art">am.</span>}
      <div className="cover-bottom">
        <span>
          {concept.id === 'offday'
            ? 'SEATING / LIGHTING / LIVING'
            : concept.id === 'morrow'
              ? 'COFFEE & SOMETHING GOOD'
              : concept.id === 'forma'
                ? 'SPACES FOR EVERYDAY LIFE'
                : 'WORDS / IDENTITY / DIGITAL'}
        </span>
        <span>↗</span>
      </div>
    </div>
  )
}

export function ConceptDemo({ concept }: { concept: Concept }) {
  if (concept.id === 'offday') return <ShopDemo />
  if (concept.id === 'morrow') return <CafeDemo />
  if (concept.id === 'forma') return <StudioDemo />
  return <PortfolioDemo />
}

const objects = [
  {
    id: 'arc',
    name: 'Arc chair',
    category: 'Seating',
    image: '/images/offday-objects.webp',
    note: 'A sculptural shape with a bright point of view. A concept product page built to make the details easy to explore.',
  },
  {
    id: 'column',
    name: 'Column table',
    category: 'Tables',
    image: '/images/offday-objects.webp',
    note: 'Simple lines. A useful little companion. This fictional object demonstrates how a considered detail page can help a customer look closer.',
  },
  {
    id: 'corner',
    name: 'Reading corner',
    category: 'Lighting',
    image: '/images/forma-space.webp',
    note: 'Warm materials and light in the right place. An editorial view of how objects can work together in a space.',
  },
]

function ShopDemo() {
  const [category, setCategory] = useState('All objects')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [showSaved, setShowSaved] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const detailTitle = useRef<HTMLHeadingElement>(null)
  const returnTarget = useRef('')
  useLayoutEffect(() => {
    if (active) detailTitle.current?.focus()
    else if (returnTarget.current)
      (
        document.getElementById(returnTarget.current) ?? document.getElementById('shop-saved')
      )?.focus()
  }, [active])
  const product = objects.find((item) => item.id === active)
  const visible = objects.filter(
    (item) =>
      (category === 'All objects' || item.category === category) &&
      (!showSaved || saved.includes(item.id)) &&
      item.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  function favorite(id: string) {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }
  return (
    <div className="shop-demo demo-surface">
      <header className="demo-nav">
        <strong>
          OFFDAY<span> OBJECTS</span>
        </strong>
        <div>
          <button
            aria-pressed={!showSaved}
            onClick={() => {
              setShowSaved(false)
              setActive(null)
              setCategory('All objects')
              setQuery('')
            }}
          >
            Collection
          </button>
          <button
            id="shop-saved"
            aria-pressed={showSaved}
            onClick={() => {
              setShowSaved(true)
              setActive(null)
              setCategory('All objects')
              setQuery('')
            }}
          >
            <Icon name="heart" size={16} />
            Saved ({saved.length})
          </button>
        </div>
      </header>
      {product ? (
        <div className="product-detail">
          <button className="demo-back" onClick={() => setActive(null)}>
            <Icon name="back" size={16} />
            Back to collection
          </button>
          <div className="product-detail-grid">
            <img src={product.image} alt={product.name + ' concept photograph'} />
            <div>
              <span className="eyebrow">{product.category} / CONCEPT OBJECT</span>
              <h3 ref={detailTitle} tabIndex={-1}>
                {product.name}
              </h3>
              <p>{product.note}</p>
              <button
                className="demo-button"
                aria-pressed={saved.includes(product.id)}
                onClick={() => favorite(product.id)}
              >
                <Icon name={saved.includes(product.id) ? 'check' : 'heart'} size={17} />
                {saved.includes(product.id) ? 'Saved to your favorites' : 'Save to favorites'}
              </button>
              <p className="demo-disclaimer">Illustrative collection. Products are not for sale.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="shop-intro">
            <span className="eyebrow">OBJECTS WITH A POINT OF VIEW</span>
            <h3>A little less ordinary.</h3>
            <p>Considered things for the places you call yours.</p>
          </div>
          <div className="shop-controls">
            <div className="demo-filters" aria-label="Object category">
              {['All objects', 'Seating', 'Tables', 'Lighting'].map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="demo-search">
              <Icon name="search" size={16} />
              <input
                aria-label="Search objects"
                placeholder="Find an object…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="product-grid">
            {visible.map((item) => (
              <article className={'product-card product-' + item.id} key={item.id}>
                <div className="product-photo">
                  <button
                    id={'product-photo-' + item.id}
                    aria-label={'View ' + item.name}
                    onClick={(event) => {
                      returnTarget.current = event.currentTarget.id
                      setActive(item.id)
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name + ' concept photograph'}
                      width="1104"
                      height="736"
                    />
                  </button>
                  <button
                    className="favorite-button"
                    aria-label={(saved.includes(item.id) ? 'Unsave ' : 'Save ') + item.name}
                    aria-pressed={saved.includes(item.id)}
                    onClick={() => favorite(item.id)}
                  >
                    <Icon name="heart" size={18} />
                  </button>
                </div>
                <button
                  id={'product-name-' + item.id}
                  className="product-name"
                  onClick={(event) => {
                    returnTarget.current = event.currentTarget.id
                    setActive(item.id)
                  }}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </span>
                  <Icon name="diagonal" size={18} />
                </button>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="demo-empty">
              <h4>
                {showSaved && !saved.length ? 'Nothing saved here yet.' : 'No objects found.'}
              </h4>
              <p>
                {showSaved && !saved.length
                  ? 'Save an object from the collection to keep it here while you explore.'
                  : 'Try another name or category.'}
              </p>
              <button
                className="demo-back"
                onClick={() => {
                  setShowSaved(false)
                  setCategory('All objects')
                  setQuery('')
                }}
              >
                View the full collection
                <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </>
      )}
      <p className="demo-disclaimer">
        Interactive concept · Search, filter, and save favorites · No checkout or ordering
      </p>
    </div>
  )
}

const menu = [
  { name: 'Flat white', group: 'Coffee', note: 'Espresso, steamed milk, a little morning ritual.' },
  { name: 'Cold brew', group: 'Coffee', note: 'Slow steeped. Served over ice.' },
  { name: 'Butter croissant', group: 'Bakery', note: 'Golden layers and a flaky finish.' },
  { name: 'Almond morning bun', group: 'Bakery', note: 'Something sweet for a slower start.' },
]
function CafeDemo() {
  const [category, setCategory] = useState('All')
  return (
    <div className="cafe-demo demo-surface">
      <header className="demo-nav">
        <strong>
          morrow<span> coffee</span>
        </strong>
        <span className="demo-nav-note">A GOOD PLACE TO PAUSE.</span>
      </header>
      <div className="cafe-hero">
        <div>
          <span className="eyebrow">TAKE YOUR TIME.</span>
          <h3>
            Better mornings.
            <br />
            One cup at a time.
          </h3>
          <p>Good coffee. Something from the oven. A little room in your day.</p>
          <button
            className="demo-button"
            onClick={() => {
              setCategory('Coffee')
              document.getElementById('sample-menu')?.scrollIntoView({ block: 'nearest' })
            }}
          >
            Find your coffee
            <Icon name="arrow" size={17} />
          </button>
        </div>
        <img
          src="/images/morrow-coffee.webp"
          alt="Coffee and a croissant on a sunlit café counter"
          width="1104"
          height="736"
        />
      </div>
      <div className="cafe-menu" id="sample-menu">
        <div>
          <span className="eyebrow">FROM THE COUNTER</span>
          <h4>A little of what we love.</h4>
        </div>
        <div className="demo-filters" aria-label="Menu category">
          {['All', 'Coffee', 'Bakery'].map((item) => (
            <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <ul>
          {menu
            .filter((item) => category === 'All' || category === item.group)
            .map((item) => (
              <li key={item.name}>
                <span>{item.group === 'Coffee' ? '↗' : '✳'}</span>
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.note}</p>
                </div>
                <span className="menu-category">{item.group}</span>
              </li>
            ))}
        </ul>
      </div>
      <p className="demo-disclaimer">
        Fictional café & sample menu · No ordering, booking, location, or opening hours implied
      </p>
    </div>
  )
}

function StudioDemo() {
  const [view, setView] = useState('Spaces')
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="studio-demo demo-surface">
      <header className="demo-nav">
        <strong>forma.</strong>
        <div>
          {['Spaces', 'Approach'].map((item) => (
            <button aria-pressed={view === item} onClick={() => setView(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
      </header>
      {view === 'Spaces' ? (
        <>
          <div className="studio-intro">
            <span className="eyebrow">CONSIDERED SPACES / EVERYDAY LIVING</span>
            <h3>
              Room to
              <br />
              <i>feel at home.</i>
            </h3>
            <p>A studio concept for spaces that feel as good as they look.</p>
          </div>
          <button
            className="studio-project"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <img
              src="/images/forma-space.webp"
              alt="Warm timber, steel, and natural light in a sample interior"
              width="1104"
              height="736"
            />
            <span>
              <span>
                <strong>A quiet corner</strong>
                <span>Residential concept / Interior direction</span>
              </span>
              <Icon name={expanded ? 'minus' : 'plus'} size={23} />
            </span>
          </button>
          {expanded && (
            <div className="studio-project-detail">
              <h4>Start with the way a space feels.</h4>
              <p>
                Warm timber. An honest material palette. Light with somewhere to land. This
                fictional project shows how a portfolio can pair a strong image with the thinking
                behind it.
              </p>
              <span className="eyebrow">CONCEPT / NOT A COMPLETED CLIENT PROJECT</span>
            </div>
          )}
        </>
      ) : (
        <div className="studio-approach">
          <span className="eyebrow">THE APPROACH</span>
          <h3>
            Less noise.
            <br />
            More meaning.
          </h3>
          {[
            [
              '01',
              'Understand the everyday.',
              'Begin with the people using the space and what they need from it.',
            ],
            [
              '02',
              'Find the right balance.',
              'Bring materials, light, and proportion into one considered direction.',
            ],
            [
              '03',
              'Work through the details.',
              'Turn the direction into something clear enough to discuss and develop.',
            ],
          ].map(([number, name, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h4>{name}</h4>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="demo-disclaimer">
        Interactive studio concept · Explore the project story and approach
      </p>
    </div>
  )
}

const portfolioWork = [
  {
    name: 'A different kind of everyday.',
    type: 'Identity / Art direction',
    color: 'identity',
    title: 'Make the familiar feel new.',
    text: 'A fictional identity exercise exploring bold typography, useful words, and a clear visual system. Open the work, understand the idea, and see how the pieces belong together.',
  },
  {
    name: 'Words that find their people.',
    type: 'Writing / Digital',
    color: 'words',
    title: 'Give a good idea a clear voice.',
    text: 'A concept editorial project about making complex ideas easier to understand. A portfolio story can explain the thinking behind the outcome, not just show a thumbnail.',
  },
]
function PortfolioDemo() {
  const [active, setActive] = useState<number | null>(null)
  const detailTitle = useRef<HTMLHeadingElement>(null)
  const returnTarget = useRef('')
  useLayoutEffect(() => {
    if (active !== null) detailTitle.current?.focus()
    else if (returnTarget.current) document.getElementById(returnTarget.current)?.focus()
  }, [active])
  const work = active !== null ? portfolioWork[active] : null
  return (
    <div className="portfolio-demo demo-surface">
      <header className="demo-nav">
        <strong>alex morgan.</strong>
        <span className="demo-nav-note">INDEPENDENT CREATIVE</span>
      </header>
      {work ? (
        <div className="portfolio-detail">
          <button className="demo-back" onClick={() => setActive(null)}>
            <Icon name="back" size={16} />
            All selected work
          </button>
          <span className="eyebrow">{work.type}</span>
          <h3 ref={detailTitle} tabIndex={-1}>
            {work.title}
          </h3>
          <div className={'portfolio-art art-' + work.color}>
            {active === 0 ? (
              <>
                Every
                <br />
                <span>other</span>
                <br />
                day.
              </>
            ) : (
              <>
                Good ideas.
                <br />
                <span>Clear words.</span>
              </>
            )}
          </div>
          <p>{work.text}</p>
        </div>
      ) : (
        <>
          <div className="portfolio-intro">
            <span className="eyebrow">WORDS. IDENTITY. A DIFFERENT PERSPECTIVE.</span>
            <h3>
              Good ideas
              <br />
              deserve a<br />
              <i>clear voice.</i>
            </h3>
            <div>
              <span className="portfolio-monogram">am.</span>
              <p>
                An illustrative portfolio for an independent creative, with work worth a closer
                look.
              </p>
            </div>
          </div>
          <div className="portfolio-works">
            {portfolioWork.map((item, index) => (
              <button
                id={'portfolio-work-' + index}
                key={item.name}
                onClick={(event) => {
                  returnTarget.current = event.currentTarget.id
                  setActive(index)
                }}
              >
                <span className="portfolio-number">0{index + 1}</span>
                <span>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </span>
                <Icon name="diagonal" size={23} />
              </button>
            ))}
          </div>
        </>
      )}
      <p className="demo-disclaimer">
        Fictional personal brand · Concept stories, not client deliveries
      </p>
    </div>
  )
}

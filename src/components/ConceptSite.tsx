import type { Concept } from '../content'

/** Original, code-drawn website compositions. All business names are illustrative. */
export function ConceptSite({ concept, compact = false }: { concept: Concept; compact?: boolean }) {
  return (
    <div
      className={`concept-site concept-${concept.id}${compact ? ' compact' : ''}`}
      aria-label={`${concept.name} illustrative website design`}
    >
      <div className="concept-nav">
        <strong>{concept.name}.</strong>
        <span>
          {concept.id === 'morrow'
            ? 'Our story  ·  The menu'
            : concept.id === 'offday'
              ? 'Objects  ·  Our world'
              : 'About  ·  Selected work'}
          <span className="concept-nav-dot">↗</span>
        </span>
      </div>
      <div className="concept-main">
        <div className="concept-copy">
          <span className="concept-eyebrow">
            {concept.category === 'Food & drink'
              ? 'YOUR DAILY PAUSE'
              : concept.category === 'Services'
                ? 'THOUGHTFULLY DESIGNED'
                : concept.category === 'Shops'
                  ? 'MADE FOR EVERYDAY'
                  : 'INDEPENDENT CREATIVE'}
          </span>
          <h3>{concept.headline}</h3>
          <p>{concept.subline}</p>
          <span className="concept-button">
            {concept.action} <span>↗</span>
          </span>
        </div>
        <div className="concept-art" aria-hidden="true">
          {concept.id === 'morrow' && (
            <div className="coffee-art">
              <div className="coffee-orbit" />
              <div className="coffee-saucer">
                <div className="coffee-cup">
                  <span />
                </div>
              </div>
              <span className="coffee-caption">MADE WITH A LITTLE MORE CARE.</span>
            </div>
          )}
          {concept.id === 'forma' && (
            <div className="room-art">
              <div className="room-window" />
              <div className="room-sun" />
              <div className="room-plinth" />
              <div className="room-vase">
                <span />
              </div>
              <div className="room-shadow" />
            </div>
          )}
          {concept.id === 'offday' && (
            <div className="lamp-art">
              <div className="lamp-halo" />
              <div className="lamp-stem" />
              <div className="lamp-shade" />
              <div className="lamp-base" />
              <span className="product-label">THE EVERYDAY LAMP / 01</span>
            </div>
          )}
          {concept.id === 'alex' && (
            <div className="type-art">
              <span>a</span>
              <span>m</span>
              <i>
                WORDS THAT MAKE
                <br />
                SOMETHING HAPPEN.
              </i>
            </div>
          )}
        </div>
      </div>
      <div className="concept-bottom">
        <span>
          {concept.id === 'morrow'
            ? 'SIP SLOW. STAY A WHILE.'
            : concept.id === 'forma'
              ? 'SPACES WITH A SENSE OF YOU.'
              : concept.id === 'offday'
                ? 'A LITTLE DIFFERENT BY DESIGN.'
                : 'A LITTLE STRATEGY. A LOT OF HEART.'}
        </span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  )
}

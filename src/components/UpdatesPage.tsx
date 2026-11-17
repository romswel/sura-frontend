import Icon from './Icon'
import { releases } from '../updates'

export default function UpdatesPage() {
  return (
    <main id="main" tabIndex={-1} className="updates-page container">
      <a className="text-link desk-back" href="#">
        <Icon name="back" size={17} /> Back to Sura
      </a>
      <div className="updates-heading">
        <span className="eyebrow">THE BUILD, AS IT GROWS</span>
        <h1>
          A little better,
          <br />
          with every update.
        </h1>
        <p>
          New things to try, thoughtful changes, and fixes to the details. Here’s what’s happening
          at Sura.
        </p>
      </div>
      <div className="release-list">
        {releases.map((release) => (
          <article
            className="release"
            key={release.version}
            aria-labelledby={'release-' + release.version}
          >
            <div className="release-meta">
              <span className="release-version">{release.version}</span>
              <time dateTime={release.date}>{release.dateLabel}</time>
              <span className="eyebrow">{release.label}</span>
            </div>
            <div className="release-content">
              <h2 id={'release-' + release.version}>{release.title}</h2>
              <p className="release-intro">{release.summary}</p>
              {release.groups.map((group) => (
                <section key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
              <a className="text-link" href={release.link.href}>
                {release.link.label}
                <Icon name="diagonal" size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

import { Mark } from './Brand'
import Icon from './Icon'

export default function TeamPage() {
  return (
    <main id="main" tabIndex={-1} className="team-page container">
      <a className="text-link desk-back" href="#">
        <Icon name="back" size={17} />
        Back to Sura
      </a>
      <div className="team-intro">
        <span className="eyebrow">BEHIND THE WEBSITES</span>
        <h1>
          A home for
          <br />
          the work ahead.
        </h1>
        <p>
          We’re growing toward one place for clients, projects, tasks, and the conversations that
          move work forward.
        </p>
        <span className="outline-label">TEAM WORKSPACE / PLANNED</span>
      </div>
      <div className="workspace-plan">
        <div className="workspace-symbol">
          <Mark />
          <span>
            ONE TEAM.
            <br />A CLEARER PICTURE.
          </span>
        </div>
        <div>
          {[
            [
              '01',
              'Client context',
              'Inquiries, the agreed scope, and the next follow-up in one place.',
            ],
            [
              '02',
              'Work in motion',
              'Projects, task ownership, files, and decisions connected to the work.',
            ],
            ['03', 'A shared view', 'The right updates and review material for each client.'],
          ].map(([number, name, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h2>{name}</h2>
                <p>{text}</p>
              </div>
              <span className="muted">Planned</span>
            </article>
          ))}
        </div>
      </div>
      <div className="team-access">
        <div>
          <h2>Team sign-in is not open yet.</h2>
          <p>
            Private accounts, shared records, and messaging need their storage and access controls
            connected first. This page is public planning information.
          </p>
        </div>
        <a className="button button-primary" href="#/planner">
          Try the personal project desk
          <Icon name="diagonal" size={18} />
        </a>
      </div>
    </main>
  )
}

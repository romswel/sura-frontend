import { Arrow, Mark, ServiceIcon } from './Brand'

export default function TeamPage() {
  return (
    <main id="main" className="team-page container">
      <a className="text-link muted" href="#">
        ← Back to Sura
      </a>
      <div className="team-intro">
        <div className="team-mark">
          <Mark />
        </div>
        <span className="eyebrow">THE NEXT CHAPTER</span>
        <h1>
          One team.
          <br />
          <span className="muted">A little less scattered.</span>
        </h1>
        <p>
          We are building a home for the work behind the websites. A shared place for our team and,
          eventually, the clients we work with.
        </p>
        <span className="status-pill">
          <span />
          In the planning stage
        </span>
      </div>
      <div className="team-plan">
        <article>
          <ServiceIcon type="window" />
          <h2>Clients & projects</h2>
          <p>Keep inquiries, project details, and next steps in one place.</p>
          <span>Planned</span>
        </article>
        <article>
          <ServiceIcon type="layers" />
          <h2>A shared workspace</h2>
          <p>Organize tasks, decisions, and the small details that move a project forward.</p>
          <span>Planned</span>
        </article>
        <article>
          <ServiceIcon type="spark" />
          <h2>Conversations</h2>
          <p>Bring project conversations closer to the work, with access for the right people.</p>
          <span>Planned</span>
        </article>
      </div>
      <div className="team-access">
        <h2>Team sign-in is not open yet.</h2>
        <p>
          Accounts and private workspaces will be available after secure sign-in and data storage
          are connected. There are no accounts to create at this stage.
        </p>
        <a className="button button-light" href="#start">
          Have a website idea? <Arrow />
        </a>
      </div>
    </main>
  )
}

import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  budgetOptions,
  featureOptions,
  pageOptions,
  projectTypes,
  timelineOptions,
} from '../content'
import type { ProjectDraft } from '../project'
import { downloadText, makeBrief } from '../project'
import { contactEmail } from '../config'
import Icon from './Icon'

const steps = ['The project', 'The details', 'About you', 'Your brief']
const typeNotes = [
  'A clear home for your business.',
  'A place to discover your products.',
  'A tool built around a workflow.',
  'A fresh direction for an existing site.',
  'We can find the starting point together.',
]

export type PlannerProps = {
  draft: ProjectDraft
  updateDraft: (patch: Partial<ProjectDraft>) => void
  step: number
  setStep: (step: number) => void
  saveDraft: () => void
  saved: boolean
  notice: string
  openChecklist: () => void
}

export default function ProjectPlanner({
  draft,
  updateDraft,
  step,
  setStep,
  saveDraft,
  saved,
  notice,
  openChecklist,
}: PlannerProps) {
  const [copyNotice, setCopyNotice] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    heading.current?.focus({ preventScroll: true })
    heading.current?.scrollIntoView({ block: 'nearest' })
  }, [step])
  const brief = makeBrief(draft)

  function toggle(field: 'features' | 'pages', value: string) {
    const list = draft[field]
    updateDraft({
      [field]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
    })
  }
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === 2) {
      const name = event.currentTarget.elements.namedItem('name') as HTMLInputElement
      const idea = event.currentTarget.elements.namedItem('idea') as HTMLTextAreaElement
      name.setCustomValidity(draft.name.trim() ? '' : 'Please enter your name.')
      idea.setCustomValidity(
        draft.idea.trim().length >= 10
          ? ''
          : 'Tell us a little more about your idea, using at least 10 characters.',
      )
      if (!event.currentTarget.reportValidity()) return
    }
    setStep(Math.min(3, step + 1))
    setCopyNotice('')
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopyNotice('Brief copied. It is ready to share.')
    } catch {
      setCopyNotice('Copy is unavailable. Select the brief text below, or download a copy.')
    }
  }
  return (
    <div className="planner" aria-label="Project brief builder">
      <ol className="planner-steps" aria-label="Brief progress">
        {steps.map((name, index) => (
          <li
            key={name}
            className={index === step ? 'is-current' : index < step ? 'is-complete' : ''}
            aria-current={index === step ? 'step' : undefined}
          >
            <span className="step-dot">
              {index < step ? <Icon name="check" size={13} /> : '0' + (index + 1)}
            </span>
            <span>{name}</span>
          </li>
        ))}
      </ol>
      <div className="planner-body">
        <div className="planner-main">
          <div className="planner-section-heading">
            <span className="eyebrow">LET’S MAKE A START / 0{step + 1}</span>
            <h3 id="planner-step-title" ref={heading} tabIndex={-1}>
              {
                [
                  'What are we building?',
                  'What should it include?',
                  'Tell us about your idea.',
                  'A clear starting point.',
                ][step]
              }
            </h3>
            <p>
              {
                [
                  'Choose the closest fit. You can change this later.',
                  'Pick what matters. These are things to scope together.',
                  'A few useful details. No technical plan needed.',
                  'Your choices, brought together in one useful brief.',
                ][step]
              }
            </p>
          </div>
          {draft.reference && (
            <div className="reference-note">
              <Icon name="window" size={16} />
              <span>
                Inspired by <strong>{draft.reference}</strong>
              </span>
              <button
                type="button"
                className="icon-button small"
                onClick={() => updateDraft({ reference: '' })}
                aria-label="Remove concept direction"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
          )}
          <form onSubmit={next}>
            {step === 0 && (
              <fieldset className="type-choices">
                <legend className="sr-only">Project type</legend>
                {projectTypes.map((type, index) => (
                  <button
                    type="button"
                    key={type}
                    className={'type-choice ' + (draft.kind === type ? 'is-selected' : '')}
                    aria-pressed={draft.kind === type}
                    onClick={() => updateDraft({ kind: type })}
                  >
                    <span>
                      <strong>{type}</strong>
                      <span>{typeNotes[index]}</span>
                    </span>
                    <span className="choice-radio">{draft.kind === type && <span />}</span>
                  </button>
                ))}
              </fieldset>
            )}
            {step === 1 && (
              <div className="scope-options">
                <fieldset>
                  <legend>
                    Useful features <span>Choose any, or decide together.</span>
                  </legend>
                  <div className="choice-chips">
                    {featureOptions.map((feature) => (
                      <button
                        type="button"
                        key={feature}
                        aria-pressed={draft.features.includes(feature)}
                        onClick={() => toggle('features', feature)}
                      >
                        <Icon
                          name={draft.features.includes(feature) ? 'check' : 'plus'}
                          size={15}
                        />
                        {feature}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>
                    Pages to consider <span>A starting point, not a final sitemap.</span>
                  </legend>
                  <div className="choice-chips">
                    {pageOptions.map((page) => (
                      <button
                        type="button"
                        key={page}
                        aria-pressed={draft.pages.includes(page)}
                        onClick={() => toggle('pages', page)}
                      >
                        <Icon name={draft.pages.includes(page) ? 'check' : 'plus'} size={15} />
                        {page}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
            {step === 2 && (
              <div className="brief-fields">
                <div className="form-row">
                  <label>
                    Your name <span aria-hidden="true">*</span>
                    <input
                      name="name"
                      required
                      maxLength={100}
                      autoComplete="given-name"
                      value={draft.name}
                      onChange={(e) => {
                        e.target.setCustomValidity('')
                        updateDraft({ name: e.target.value })
                      }}
                      placeholder="What should we call you?"
                    />
                  </label>
                  <label>
                    Business name <span className="optional">(optional)</span>
                    <input
                      name="business"
                      maxLength={120}
                      autoComplete="organization"
                      value={draft.business}
                      onChange={(e) => updateDraft({ business: e.target.value })}
                      placeholder="Your business or project"
                    />
                  </label>
                </div>
                <label>
                  Tell us a little about your idea <span aria-hidden="true">*</span>
                  <textarea
                    name="idea"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={4}
                    value={draft.idea}
                    onChange={(e) => {
                      e.target.setCustomValidity('')
                      updateDraft({ idea: e.target.value })
                    }}
                    placeholder="What do you do, and what would you like the website to help with?"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Your timeline
                    <select
                      value={draft.timeline}
                      onChange={(e) => updateDraft({ timeline: e.target.value })}
                    >
                      {timelineOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Budget in mind
                    <select
                      value={draft.budget}
                      onChange={(e) => updateDraft({ budget: e.target.value })}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="form-note">
                  Leave out passwords, payment details, and sensitive information. This prepares a
                  brief; it does not send an inquiry.
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="brief-result">
                <div className="brief-ready">
                  <span className="round-icon">
                    <Icon name="check" size={19} />
                  </span>
                  <div>
                    <strong>Your brief is ready.</strong>
                    <p>
                      {contactEmail
                        ? 'Copy it, download it, or send it from your email app.'
                        : 'Keep a copy. Our contact details are being prepared, so nothing has been sent.'}
                    </p>
                  </div>
                </div>
                <label htmlFor="prepared-brief" className="sr-only">
                  Prepared project brief
                </label>
                <textarea
                  id="prepared-brief"
                  className="brief-text"
                  value={brief}
                  readOnly
                  rows={11}
                />
                <div className="brief-export">
                  <button type="button" className="button button-primary" onClick={copy}>
                    <Icon name="copy" size={17} />
                    Copy brief
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => downloadText(brief, 'sura-project-brief.txt')}
                  >
                    <Icon name="download" size={17} />
                    Download .txt
                  </button>
                  {contactEmail && (
                    <a
                      className="button button-secondary"
                      href={
                        'mailto:' +
                        contactEmail +
                        '?subject=' +
                        encodeURIComponent('A project for Sura') +
                        '&body=' +
                        encodeURIComponent(brief)
                      }
                    >
                      Open email app
                      <Icon name="diagonal" size={17} />
                    </a>
                  )}
                </div>
                <p className="inline-status" role="status">
                  {copyNotice}
                </p>
                <button type="button" className="text-link checklist-link" onClick={openChecklist}>
                  Plan your next steps with the launch checklist
                  <Icon name="diagonal" size={17} />
                </button>
              </div>
            )}
            <div className="planner-controls">
              {step > 0 ? (
                <button type="button" className="text-link" onClick={() => setStep(step - 1)}>
                  <Icon name="back" size={17} />
                  {step === 3 ? 'Edit details' : 'Back'}
                </button>
              ) : (
                <span className="form-note">No account needed.</span>
              )}
              {step < 3 && (
                <button type="submit" className="button button-primary">
                  {step === 2 ? 'Prepare my brief' : 'Continue'}
                  <Icon name="arrow" size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
        <aside className="planner-summary">
          <div className="summary-label">
            <Icon name="folder" size={18} />
            <span>YOUR PROJECT FILE</span>
            <span className="local-badge">LOCAL</span>
          </div>
          <h4>{draft.business.trim() || 'Something worth building.'}</h4>
          <dl>
            <div>
              <dt>Project</dt>
              <dd>{draft.kind}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{draft.pages.length ? draft.pages.join(', ') : 'Let’s work it out'}</dd>
            </div>
            <div>
              <dt>Features</dt>
              <dd>{draft.features.length ? draft.features.join(', ') : 'Open to ideas'}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{draft.timeline}</dd>
            </div>
          </dl>
          <div className="summary-bottom">
            <p>
              A plan first.
              <br />
              <strong>A quote after we talk.</strong>
            </p>
            <button
              type="button"
              className="button button-secondary save-draft"
              onClick={saveDraft}
            >
              <Icon name={saved ? 'check' : 'download'} size={16} />
              {saved ? 'Saved in this browser' : 'Save draft in this browser'}
            </button>
            <p className="form-note">
              Saving is your choice. Saved drafts expire after 30 days. Nothing is sent to Sura.
            </p>
            <p className="inline-status" role="status">
              {notice}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

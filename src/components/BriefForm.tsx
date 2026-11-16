import { useState } from 'react'
import type { FormEvent } from 'react'
import { Arrow } from './Brand'
import { projectTypes } from '../content'
import { contactEmail } from '../config'

export default function BriefForm({
  projectType,
  onTypeChange,
}: {
  projectType: string
  onTypeChange: (value: string) => void
}) {
  const [brief, setBrief] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = (key: string) => String(data.get(key) ?? '').trim()
    setBrief(
      `Hello Sura! I'd like to talk about a website.\n\nName: ${text('name')}\nBusiness: ${text('business') || 'Still taking shape'}\nBusiness type: ${projectType}\n\nMy idea:\n${text('idea')}\n\nTimeline: ${text('timeline')}\nBudget: ${text('budget')}\n\nPrepared on the Sura website. Please reply through the channel I send this from.`,
    )
    setCopyStatus('')
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopyStatus('Brief copied. You can share it when you are ready.')
    } catch {
      setCopyStatus('Copy is unavailable in this browser. Select and copy the text below.')
    }
  }

  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'sura-project-brief.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="brief-card">
      <div className="brief-card-top">
        <span className="small-label">A GOOD PLACE TO START</span>
        <span className="step-count">01 / YOUR IDEA</span>
      </div>
      <form onSubmit={prepareBrief}>
        <div className="form-row">
          <label>
            Your name <span aria-hidden="true">*</span>
            <input
              name="name"
              placeholder="What should we call you?"
              required
              maxLength={100}
              autoComplete="name"
            />
          </label>
          <label>
            Business name <span className="optional">(optional)</span>
            <input
              name="business"
              placeholder="Big ideas start somewhere"
              maxLength={120}
              autoComplete="organization"
            />
          </label>
        </div>
        <label>
          What kind of business?
          <select
            name="type"
            value={projectType}
            onChange={(event) => onTypeChange(event.target.value)}
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Tell us a little about your idea <span aria-hidden="true">*</span>
          <textarea
            name="idea"
            placeholder="What do you do? What would you love your website to help with?"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
          />
        </label>
        <div className="form-row">
          <label>
            Your timeline
            <select name="timeline">
              <option>Just exploring</option>
              <option>Within a month</option>
              <option>In 1–3 months</option>
              <option>Flexible</option>
            </select>
          </label>
          <label>
            Budget in mind
            <select name="budget">
              <option>Let's work it out together</option>
              <option>I have a range to discuss</option>
              <option>Start small, grow later</option>
            </select>
          </label>
        </div>
        <button className="button button-light form-submit" type="submit">
          Prepare my project brief <Arrow />
        </button>
        <p className="form-note">
          This prepares a brief on your device. Nothing is sent or saved to our servers. Please
          leave out sensitive information.
        </p>
      </form>
      {brief && (
        <section className="brief-result" aria-labelledby="brief-result-title">
          <div role="status">
            <h3 id="brief-result-title">Your idea, ready for the next step.</h3>
            <p>
              {contactEmail
                ? 'Copy your brief or open your email app. Send the email there to reach us.'
                : 'Your brief is ready. Our contact channel is being set up, so it has not been sent. Copy or download it to keep for later.'}
            </p>
          </div>
          <label className="sr-only" htmlFor="prepared-brief">
            Prepared project brief
          </label>
          <textarea id="prepared-brief" value={brief} readOnly rows={9} />
          <div className="brief-actions">
            <button className="button button-light" type="button" onClick={copyBrief}>
              Copy brief <Arrow />
            </button>
            <button className="button button-outline" type="button" onClick={downloadBrief}>
              Download .txt
            </button>
            {contactEmail && (
              <a
                className="text-link"
                href={`mailto:${contactEmail}?subject=${encodeURIComponent('A website idea for Sura')}&body=${encodeURIComponent(brief)}`}
              >
                Open email app <Arrow diagonal />
              </a>
            )}
          </div>
          <p className="form-note" role="status">
            {copyStatus}
          </p>
        </section>
      )}
    </div>
  )
}

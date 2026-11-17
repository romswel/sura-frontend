import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { PlanTask, ProjectDraft, TaskStatus } from '../project'
import { downloadText, makeBrief, taskStatuses } from '../project'
import ProjectPlanner from './ProjectPlanner'
import type { PlannerProps } from './ProjectPlanner'
import Modal from './Modal'
import Icon from './Icon'

type Props = PlannerProps & {
  view: 'brief' | 'checklist'
  setView: (view: 'brief' | 'checklist') => void
  clearDraft: () => boolean
}

export default function ProjectDesk(props: Props) {
  const [confirmClear, setConfirmClear] = useState(false)
  const [resetVersion, setResetVersion] = useState(0)
  return (
    <main id="main" tabIndex={-1} className="desk-page container">
      <a className="text-link desk-back" href="#">
        <Icon name="back" size={17} />
        Back to Sura
      </a>
      <div className="desk-heading">
        <div>
          <span className="eyebrow">A LITTLE SPACE TO GET ORGANIZED</span>
          <h1>Your project desk.</h1>
          <p>
            A brief and a checklist for your next website. Keep a copy in this browser, or take it
            with you.
          </p>
        </div>
        <span className="desk-local">
          <span className="status-dot" />
          Personal planner · Browser only
        </span>
      </div>
      <div className="desk-toolbar">
        <div className="segmented" aria-label="Project desk view">
          <button aria-pressed={props.view === 'brief'} onClick={() => props.setView('brief')}>
            Project brief
          </button>
          <button
            aria-pressed={props.view === 'checklist'}
            onClick={() => props.setView('checklist')}
          >
            Launch checklist
          </button>
        </div>
        <button className="text-link muted" onClick={() => setConfirmClear(true)}>
          Clear project
          <Icon name="close" size={15} />
        </button>
      </div>
      <div hidden={props.view !== 'brief'} key={'brief-' + resetVersion}>
        <ProjectPlanner {...props} />
      </div>
      <div hidden={props.view !== 'checklist'} key={'checklist-' + resetVersion}>
        <Checklist
          draft={props.draft}
          updateDraft={props.updateDraft}
          saveDraft={props.saveDraft}
          notice={props.notice}
          saved={props.saved}
        />
      </div>
      <p className="desk-footnote">
        This is your personal planning tool. Team sharing, client accounts, and online submission
        are not connected yet.{' '}
        <a href="#/team">
          About the future workspace <Icon name="diagonal" size={14} />
        </a>
      </p>
      {confirmClear && (
        <Modal titleId="clear-title" onClose={() => setConfirmClear(false)}>
          <div className="confirm-body">
            <span className="eyebrow">START FRESH</span>
            <h2 id="clear-title">Clear this project?</h2>
            <p>
              Your brief, checklist changes, and saved browser draft will be removed. Download a
              copy first if you need it.
            </p>
            <div className="confirm-actions">
              <button className="button button-secondary" onClick={() => setConfirmClear(false)}>
                Keep project
              </button>
              <button
                className="button button-primary"
                onClick={() => {
                  if (props.clearDraft()) {
                    props.setStep(0)
                    setResetVersion((version) => version + 1)
                    setConfirmClear(false)
                  }
                }}
              >
                Clear project
              </button>
            </div>
            <p role="status" className="inline-status">
              {props.notice}
            </p>
          </div>
        </Modal>
      )}
    </main>
  )
}

function Checklist({
  draft,
  updateDraft,
  saveDraft,
  notice,
  saved,
}: {
  draft: ProjectDraft
  updateDraft: (patch: Partial<ProjectDraft>) => void
  saveDraft: () => void
  notice: string
  saved: boolean
}) {
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All steps')
  const [removed, setRemoved] = useState<{ task: PlanTask; index: number } | null>(null)
  const undoButton = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    if (removed) undoButton.current?.focus({ preventScroll: true })
  }, [removed])
  const completed = draft.tasks.filter((task) => task.status === 'Done').length
  const visible = draft.tasks.filter(
    (task) =>
      (filter === 'All steps' || task.status === filter) &&
      task.title.toLowerCase().includes(search.trim().toLowerCase()),
  )
  function removeTask(task: PlanTask) {
    setRemoved({ task, index: draft.tasks.findIndex((item) => item.id === task.id) })
    updateDraft({ tasks: draft.tasks.filter((item) => item.id !== task.id) })
  }
  function undoRemove() {
    if (!removed || draft.tasks.length >= 50) return
    const tasks = [...draft.tasks]
    tasks.splice(removed.index, 0, removed.task)
    updateDraft({ tasks })
    setRemoved(null)
    requestAnimationFrame(() => {
      const target =
        document.getElementById('complete-' + removed.task.id) ??
        document.getElementById('new-task')
      target?.focus({ preventScroll: true })
    })
  }
  function add(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || draft.tasks.length >= 50) return
    updateDraft({
      tasks: [...draft.tasks, { id: crypto.randomUUID(), title: title.trim(), status: 'To do' }],
    })
    setTitle('')
  }
  return (
    <section className="checklist-panel" aria-labelledby="checklist-title">
      <div className="checklist-heading">
        <div>
          <span className="eyebrow">FROM AN IDEA TO A USEFUL WEBSITE</span>
          <h2 id="checklist-title" tabIndex={-1}>
            Make the next step clear.
          </h2>
          <p>A starting checklist you can make your own.</p>
        </div>
        <div className="checklist-progress">
          <strong>
            {completed}
            <span> / {draft.tasks.length}</span>
          </strong>
          <span>steps complete</span>
          <progress
            value={completed}
            max={Math.max(1, draft.tasks.length)}
            aria-label="Checklist progress"
          />
        </div>
      </div>
      <div className="checklist-filters">
        <label className="search-field">
          <Icon name="search" size={17} />
          <input
            type="search"
            aria-label="Find a checklist step"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a step…"
          />
        </label>
        <label className="sr-only" htmlFor="task-filter">
          Filter checklist status
        </label>
        <select id="task-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All steps</option>
          {taskStatuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="task-list">
        {visible.map((task) => (
          <div className={'task-row ' + (task.status === 'Done' ? 'is-done' : '')} key={task.id}>
            <button
              id={'complete-' + task.id}
              className="task-check"
              aria-label={(task.status === 'Done' ? 'Reopen ' : 'Complete ') + task.title}
              aria-pressed={task.status === 'Done'}
              onClick={() =>
                updateDraft({
                  tasks: draft.tasks.map((t) =>
                    t.id === task.id ? { ...t, status: t.status === 'Done' ? 'To do' : 'Done' } : t,
                  ),
                })
              }
            >
              {task.status === 'Done' && <Icon name="check" size={15} />}
            </button>
            <span className="task-title">{task.title}</span>
            <select
              aria-label={'Status for ' + task.title}
              value={task.status}
              onChange={(e) =>
                updateDraft({
                  tasks: draft.tasks.map((t) =>
                    t.id === task.id ? { ...t, status: e.target.value as TaskStatus } : t,
                  ),
                })
              }
            >
              {taskStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <button
              className="icon-button small"
              aria-label={'Remove ' + task.title}
              onClick={() => removeTask(task)}
            >
              <Icon name="close" size={15} />
            </button>
          </div>
        ))}
        {!visible.length && (
          <div className="empty-state">
            <Icon name="search" size={26} />
            <h3>No steps match.</h3>
            <p>Try another search or status.</p>
            <button
              className="text-link"
              onClick={() => {
                setSearch('')
                setFilter('All steps')
              }}
            >
              Show all steps
              <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
      </div>
      {removed && (
        <div className="task-undo" role="status">
          <span>Step removed.</span>
          <button
            ref={undoButton}
            className="text-link"
            disabled={draft.tasks.length >= 50}
            onClick={undoRemove}
          >
            Undo
            <Icon name="back" size={15} />
          </button>
        </div>
      )}
      <form className="add-task" onSubmit={add}>
        <label className="sr-only" htmlFor="new-task">
          Add a checklist step
        </label>
        <input
          id="new-task"
          placeholder="Add your own next step…"
          required
          maxLength={180}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={draft.tasks.length >= 50}
        />
        <button className="button button-secondary" disabled={draft.tasks.length >= 50}>
          <Icon name="plus" size={17} />
          Add step
        </button>
      </form>
      {draft.tasks.length >= 50 && (
        <p className="form-note">This checklist has reached its 50-step limit.</p>
      )}
      <div className="checklist-bottom">
        <div>
          <button className="button button-primary" onClick={saveDraft}>
            <Icon name={saved ? 'check' : 'download'} size={16} />
            {saved ? 'Saved in this browser' : 'Save project in this browser'}
          </button>
          <button
            className="button button-secondary"
            onClick={() => downloadText(makeBrief(draft, true), 'sura-project-plan.txt')}
          >
            <Icon name="download" size={16} />
            Export project plan
          </button>
        </div>
        <p className="form-note">
          Changes stay in this tab until you choose to save. Saving does not send them to Sura.
        </p>
        <p className="inline-status" role="status">
          {notice}
        </p>
      </div>
    </section>
  )
}

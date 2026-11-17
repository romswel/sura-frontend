import {
  budgetOptions,
  featureOptions,
  pageOptions,
  projectTypes,
  timelineOptions,
} from './content'
import type { ProjectKind } from './content'

export type TaskStatus = 'To do' | 'In progress' | 'Done'
export type PlanTask = { id: string; title: string; status: TaskStatus }
export type ProjectDraft = {
  kind: ProjectKind
  features: string[]
  pages: string[]
  name: string
  business: string
  idea: string
  timeline: string
  budget: string
  reference: string
  tasks: PlanTask[]
}

export const taskStatuses: TaskStatus[] = ['To do', 'In progress', 'Done']
export const DRAFT_KEY = 'sura.project-draft.v1'
const MAX_AGE = 30 * 24 * 60 * 60 * 1000
// Covers the maximum field bounds, including JSON's six-character control escapes.
export const MAX_DRAFT_BYTES = 128000

export function createDraft(): ProjectDraft {
  return {
    kind: 'Not sure yet',
    features: [],
    pages: ['Home', 'About', 'Contact'],
    name: '',
    business: '',
    idea: '',
    timeline: 'Let’s discuss it',
    budget: 'Scope first, then a quote',
    reference: '',
    tasks: [
      { id: 'goals', title: 'Write down the main goal for the website', status: 'To do' },
      { id: 'content', title: 'Gather your business information and content', status: 'To do' },
      { id: 'assets', title: 'Collect your logo and images you may use', status: 'To do' },
      { id: 'scope', title: 'Agree on the pages, features, and scope', status: 'To do' },
      { id: 'review', title: 'Review the design and working website', status: 'To do' },
      { id: 'launch', title: 'Check the launch and handoff details', status: 'To do' },
    ],
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isText(value: unknown, limit: number): value is string {
  return typeof value === 'string' && value.length <= limit
}

/** Only read our bounded schema. Browser storage is never authentication or a server record. */
export function readDraft(): { draft: ProjectDraft; restored: boolean } {
  const empty = { draft: createDraft(), restored: false }
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw || raw.length > MAX_DRAFT_BYTES) return empty
    const saved: unknown = JSON.parse(raw)
    if (
      !isRecord(saved) ||
      typeof saved.at !== 'number' ||
      !Number.isFinite(saved.at) ||
      saved.at > Date.now() + 60000 ||
      Date.now() - saved.at > MAX_AGE ||
      !isRecord(saved.draft)
    ) {
      localStorage.removeItem(DRAFT_KEY)
      return empty
    }
    const d = saved.draft
    if (
      !projectTypes.includes(d.kind as ProjectKind) ||
      !isText(d.name, 100) ||
      !isText(d.business, 120) ||
      !isText(d.idea, 3000) ||
      !isText(d.timeline, 100) ||
      !timelineOptions.includes(d.timeline) ||
      !isText(d.budget, 200) ||
      !budgetOptions.includes(d.budget) ||
      !isText(d.reference, 150) ||
      !Array.isArray(d.features) ||
      d.features.length > featureOptions.length ||
      !d.features.every((f) => typeof f === 'string' && featureOptions.includes(f)) ||
      new Set(d.features).size !== d.features.length ||
      !Array.isArray(d.pages) ||
      d.pages.length > pageOptions.length ||
      !d.pages.every((p) => typeof p === 'string' && pageOptions.includes(p)) ||
      new Set(d.pages).size !== d.pages.length ||
      !Array.isArray(d.tasks) ||
      d.tasks.length > 50 ||
      !d.tasks.every(
        (t) =>
          isRecord(t) &&
          isText(t.id, 100) &&
          t.id.trim().length > 0 &&
          isText(t.title, 180) &&
          t.title.trim().length > 0 &&
          taskStatuses.includes(t.status as TaskStatus),
      ) ||
      new Set(d.tasks.map((t) => t.id)).size !== d.tasks.length
    )
      return empty
    // Construct only supported fields; extra storage properties never enter application state.
    return {
      draft: {
        kind: d.kind as ProjectKind,
        name: d.name,
        business: d.business,
        idea: d.idea,
        timeline: d.timeline,
        budget: d.budget,
        reference: d.reference,
        features: [...d.features],
        pages: [...d.pages],
        tasks: d.tasks.map((task) => ({ id: task.id, title: task.title, status: task.status })),
      },
      restored: true,
    }
  } catch {
    return empty
  }
}

export function makeBrief(draft: ProjectDraft, withChecklist = false): string {
  const lines = [
    'SURA / PROJECT BRIEF',
    '',
    'Name: ' + draft.name.trim(),
    'Business: ' + (draft.business.trim() || 'To be discussed'),
    'Project: ' + draft.kind,
    'Concept direction: ' + (draft.reference || 'An original direction'),
    '',
    'THE IDEA',
    draft.idea.trim(),
    '',
    'Pages: ' + (draft.pages.join(', ') || 'To be discussed'),
    'Features to discuss: ' + (draft.features.join(', ') || 'Let’s work these out together'),
    'Timeline: ' + draft.timeline,
    'Budget: ' + draft.budget,
    '',
    'Prepared with Sura’s project planner. This is a planning brief, not a quote or a submitted inquiry.',
  ]
  if (withChecklist)
    lines.push(
      '',
      'PROJECT CHECKLIST',
      ...draft.tasks.map((task) => '[' + task.status + '] ' + task.title),
    )
  return lines.join('\n')
}

export function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

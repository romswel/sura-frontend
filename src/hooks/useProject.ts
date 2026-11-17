import { useState } from 'react'
import { createDraft, DRAFT_KEY, MAX_DRAFT_BYTES, readDraft } from '../project'
import type { ProjectDraft } from '../project'

export function useProject() {
  const [initial] = useState(readDraft)
  const [draft, setDraft] = useState(initial.draft)
  const [savedVersion, setSavedVersion] = useState(
    initial.restored ? JSON.stringify(initial.draft) : '',
  )
  const [notice, setNotice] = useState(
    initial.restored ? 'Your saved draft is back. Nothing has been sent.' : '',
  )
  const saved = JSON.stringify(draft) === savedVersion

  function updateDraft(patch: Partial<ProjectDraft>) {
    setDraft((current) => ({ ...current, ...patch }))
    setNotice('')
  }
  function saveDraft() {
    try {
      const serialized = JSON.stringify({ at: Date.now(), draft })
      if (serialized.length > MAX_DRAFT_BYTES) throw new Error('Draft is too large')
      localStorage.setItem(DRAFT_KEY, serialized)
      setSavedVersion(JSON.stringify(draft))
      setNotice('Draft saved in this browser for up to 30 days. Nothing has been sent.')
    } catch {
      setNotice('This browser could not save the draft. You can still copy or download your brief.')
    }
  }
  function clearDraft(): boolean {
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      setNotice('This browser could not clear the saved draft. Please try again.')
      return false
    }
    setDraft(createDraft())
    setSavedVersion('')
    setNotice('Draft cleared from this browser.')
    return true
  }
  return { draft, updateDraft, saveDraft, clearDraft, notice, saved }
}

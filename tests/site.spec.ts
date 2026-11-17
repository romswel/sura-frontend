import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

async function openConcept(page: Page, name: string) {
  await page
    .locator('.work-grid')
    .getByRole('button', { name: new RegExp('^Explore ' + name + ',') })
    .click()
  return page.getByRole('dialog')
}
async function aboutStep(page: Page) {
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
}
async function fillIdea(page: Page) {
  await page.getByLabel('Your name').fill('A Visitor')
  await page.getByLabel('Business name').fill('Example & Co')
  await page
    .getByLabel('Tell us a little about your idea')
    .fill('A café website — literal <b>text</b>, new lines,\nand a little ☕.')
}

test('the rebuilt site loads local assets without runtime failures', async ({ page }, info) => {
  const errors: string[] = []
  const external: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Your business.Built for the web.',
  )
  await expect(page.locator('.work-card')).toHaveCount(4)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({
    path: '.artifacts/rebuild/' + info.project.name + '-home.png',
    fullPage: true,
  })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(
    await page
      .locator('.hero-featured img')
      .evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0)
  expect(errors).toEqual([])
  expect(external).toEqual([])
})

test('the workbench switches the featured concept and opens its working menu', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '02 Coffee' }).click()
  await page.getByRole('button', { name: 'Explore Morrow Coffee concept', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Morrow Coffee' })).toBeVisible()
  await page.getByRole('dialog').getByRole('button', { name: 'Bakery', exact: true }).click()
  await expect(page.locator('.cafe-menu li')).toHaveCount(2)
})

test('filters, native dialog dismissal, focus return, and concept-to-brief context work', async ({
  page,
}) => {
  await page.goto('/#showcase')
  await page.getByRole('button', { name: 'Online shops', exact: true }).click()
  await expect(page.locator('.work-card')).toHaveCount(1)
  const opener = page
    .locator('.work-grid')
    .getByRole('button', { name: /^Explore Offday Objects,/ })
  await opener.click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
  await opener.click()
  await page.getByRole('button', { name: 'Use this direction' }).click()
  await expect(page).toHaveURL(/#start$/)
  await expect(page.getByRole('heading', { name: 'What should it include?' })).toBeVisible()
  await expect(page.locator('.reference-note')).toContainText('Offday Objects')
  await expect(page.getByRole('button', { name: 'Product catalog', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('the shop searches, filters, saves favorites, and opens product details', async ({ page }) => {
  await page.goto('/#showcase')
  const dialog = await openConcept(page, 'Offday Objects')
  await expect(dialog.locator('.product-card')).toHaveCount(3)
  await dialog.getByRole('button', { name: 'Seating', exact: true }).click()
  await expect(dialog.locator('.product-card')).toHaveCount(1)
  await dialog.getByLabel('Search objects').fill('does not exist')
  await expect(dialog.getByRole('heading', { name: 'No objects found.' })).toBeVisible()
  await dialog.getByRole('button', { name: 'View the full collection' }).click()
  await dialog.getByRole('button', { name: 'Save Arc chair', exact: true }).click()
  await dialog.getByRole('button', { name: 'Lighting', exact: true }).click()
  await dialog.getByLabel('Search objects').fill('corner')
  await dialog.getByRole('button', { name: 'Saved (1)' }).click()
  await expect(dialog.locator('.product-card')).toHaveCount(1)
  await expect(dialog.getByLabel('Search objects')).toHaveValue('')
  await expect(dialog.getByRole('button', { name: 'All objects', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await dialog.getByRole('button', { name: 'View Arc chair', exact: true }).click()
  await expect(dialog.getByRole('heading', { name: 'Arc chair', exact: true })).toBeFocused()
  await dialog.getByRole('button', { name: 'Back to collection' }).click()
  await expect(dialog.getByRole('button', { name: 'View Arc chair', exact: true })).toBeFocused()
  await dialog.getByRole('button', { name: 'View Arc chair', exact: true }).click()
  await dialog.getByRole('button', { name: 'Saved to your favorites' }).click()
  await dialog.getByRole('button', { name: 'Back to collection' }).click()
  await expect(dialog.getByRole('heading', { name: 'Nothing saved here yet.' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Saved (0)' })).toBeFocused()
  await dialog.getByRole('button', { name: 'Collection', exact: true }).click()
  await dialog.getByRole('button', { name: 'Save Arc chair', exact: true }).click()
  await dialog.getByRole('button', { name: 'Saved (1)' }).click()
  await dialog.getByLabel('Search objects').fill('missing')
  await expect(dialog.getByRole('heading', { name: 'No objects found.' })).toBeVisible()
})

test('café menu controls show the requested items', async ({ page }) => {
  await page.goto('/#showcase')
  const dialog = await openConcept(page, 'Morrow Coffee')
  await expect(dialog.locator('.cafe-menu li')).toHaveCount(4)
  await dialog.getByRole('button', { name: 'Bakery', exact: true }).click()
  await expect(dialog.locator('.cafe-menu li')).toHaveCount(2)
  await expect(dialog.locator('.cafe-menu')).not.toContainText('Flat white')
  await dialog.getByRole('button', { name: 'Find your coffee' }).click()
  await expect(dialog.locator('.cafe-menu')).toContainText('Flat white')
  await expect(dialog.locator('.cafe-menu')).not.toContainText('Butter croissant')
})

test('studio and portfolio concepts have distinct, working detail views', async ({ page }) => {
  await page.goto('/#showcase')
  let dialog = await openConcept(page, 'Forma Studio')
  await dialog.getByRole('button', { name: /A quiet corner/ }).click()
  await expect(
    dialog.getByRole('heading', { name: 'Start with the way a space feels.' }),
  ).toBeVisible()
  await dialog.getByRole('button', { name: 'Approach', exact: true }).click()
  await expect(dialog.getByRole('heading', { name: 'Understand the everyday.' })).toBeVisible()
  await page.keyboard.press('Escape')
  dialog = await openConcept(page, 'Alex Morgan')
  await dialog.getByRole('button', { name: /Words that find their people/ }).click()
  await expect(
    dialog.getByRole('heading', { name: 'Give a good idea a clear voice.' }),
  ).toBeFocused()
  await dialog.getByRole('button', { name: 'All selected work' }).click()
  await expect(dialog.locator('.portfolio-works > button')).toHaveCount(2)
  await expect(dialog.getByRole('button', { name: /Words that find their people/ })).toBeFocused()
})

test('a full brief preserves literal Unicode text, copies, downloads, and never submits', async ({
  page,
  context,
}) => {
  const writes: string[] = []
  page.on('request', (request) => {
    if (request.method() !== 'GET') writes.push(request.url())
  })
  await page.goto('/#start')
  await page.getByRole('button', { name: /^Online shop A place/ }).click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Product catalog', exact: true }).click()
  await page.getByRole('button', { name: 'Shop', exact: true }).click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Prepare my brief' }).click()
  await expect(page.getByLabel('Your name')).toBeFocused()
  await page.getByLabel('Your name').fill('   ')
  await page.getByLabel('Tell us a little about your idea').fill('              ')
  await page.getByRole('button', { name: 'Prepare my brief' }).click()
  await expect(page.getByLabel('Prepared project brief')).toHaveCount(0)
  await fillIdea(page)
  await page.getByRole('button', { name: 'Prepare my brief' }).click()
  const brief = await page.getByLabel('Prepared project brief').inputValue()
  expect(brief).toContain('Project: Online shop')
  expect(brief).toContain('Product catalog')
  expect(brief).toContain('literal <b>text</b>, new lines,\nand a little ☕.')
  await expect(page.getByText(/so nothing has been sent/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open email app' })).toHaveCount(0)
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: 'Copy brief', exact: true }).click()
  // Windows normalizes OS clipboard line endings to CRLF.
  expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
    brief,
  )
  const downloading = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download .txt' }).click()
  const file = await downloading
  expect(file.suggestedFilename()).toBe('sura-project-brief.txt')
  expect(await readFile((await file.path())!, 'utf8')).toBe(brief)
  expect(writes).toEqual([])
  expect(await page.evaluate(() => localStorage.getItem('sura.project-draft.v1'))).toBeNull()
  await page.reload()
  await expect(page.getByLabel('Prepared project brief')).toHaveCount(0)
})

test('draft saving is explicit, restores the full brief, and does not autosave later edits', async ({
  page,
}) => {
  await page.goto('/#/planner')
  await aboutStep(page)
  await fillIdea(page)
  await page.getByRole('button', { name: 'Save draft in this browser', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Draft saved in this browser')
  await page.getByLabel('Business name').fill('An unsaved change')
  await expect(
    page.getByRole('button', { name: 'Save draft in this browser', exact: true }),
  ).toBeVisible()
  await page.reload()
  await expect(page.getByRole('status')).toContainText('Your saved draft is back')
  await aboutStep(page)
  await expect(page.getByLabel('Business name')).toHaveValue('Example & Co')
  await expect(page.getByLabel('Tell us a little about your idea')).toHaveValue(
    /literal <b>text<\/b>/,
  )
})

test('the checklist adds, moves, completes, removes with undo, filters, saves, and exports', async ({
  page,
}) => {
  await page.goto('/#/planner')
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await page.getByLabel('Add a checklist step').fill('Review café copy & literal <b>text</b> ☕')
  await page.getByRole('button', { name: 'Add step', exact: true }).click()
  const title = 'Review café copy & literal <b>text</b> ☕'
  await page.getByLabel('Status for ' + title, { exact: true }).selectOption('In progress')
  await page.getByRole('button', { name: 'Complete ' + title, exact: true }).click()
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '1')
  await page.getByRole('button', { name: 'Remove ' + title, exact: true }).click()
  await expect(page.getByLabel('Status for ' + title, { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Undo', exact: true }).click()
  await page.getByLabel('Filter checklist status').selectOption('Done')
  await expect(page.locator('.task-row')).toHaveCount(1)
  await page.getByLabel('Find a checklist step').fill('nonsense')
  await expect(page.getByRole('heading', { name: 'No steps match.' })).toBeVisible()
  await page.getByRole('button', { name: 'Show all steps' }).click()
  await expect(page.locator('.task-row')).toHaveCount(7)
  await page.getByRole('button', { name: 'Save project in this browser' }).click()
  const downloading = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export project plan' }).click()
  const file = await downloading
  expect(await readFile((await file.path())!, 'utf8')).toContain('[Done] ' + title)
  await page.reload()
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await expect(page.getByLabel('Status for ' + title, { exact: true })).toHaveValue('Done')
})

test('clearing a project requires confirmation and clears the saved browser record', async ({
  page,
}) => {
  await page.goto('/#/planner')
  await page.getByRole('button', { name: 'Save draft in this browser', exact: true }).click()
  await page.getByRole('button', { name: 'Clear project', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Keep project' }).click()
  expect(await page.evaluate(() => localStorage.getItem('sura.project-draft.v1'))).not.toBeNull()
  await page.getByRole('button', { name: 'Clear project', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Clear project', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  expect(await page.evaluate(() => localStorage.getItem('sura.project-draft.v1'))).toBeNull()
})

for (const invalid of ['malformed', 'expired']) {
  test('a ' + invalid + ' saved draft cannot break the planner', async ({ page }) => {
    await page.addInitScript(
      (kind) =>
        localStorage.setItem(
          'sura.project-draft.v1',
          kind === 'malformed' ? '{bad-json' : JSON.stringify({ at: 1, draft: {} }),
        ),
      invalid,
    )
    await page.goto('/#/planner')
    await expect(page.getByRole('heading', { name: 'What are we building?' })).toBeVisible()
    await expect(page.locator('.planner-summary')).toContainText('Not sure yet')
  })
}

test('blocked storage and clipboard show recovery paths without losing the brief', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Unavailable', 'QuotaExceededError')
    }
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Unavailable')) },
    })
  })
  await page.goto('/#start')
  await aboutStep(page)
  await fillIdea(page)
  await page.getByRole('button', { name: 'Prepare my brief' }).click()
  await page.getByRole('button', { name: 'Save draft in this browser', exact: true }).click()
  await expect(page.getByText(/This browser could not save the draft/)).toBeVisible()
  await page.getByRole('button', { name: 'Copy brief', exact: true }).click()
  await expect(page.getByText(/Copy is unavailable/)).toBeVisible()
  await expect(page.getByLabel('Prepared project brief')).toHaveValue(/literal <b>text<\/b>/)
})

test('the shared theme persists and the mobile menu supports Escape and navigation', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await page.setViewportSize({ width: 320, height: 800 })
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('navigation').getByRole('link', { name: 'What we do' }).click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page).toHaveURL(/#services$/)
})

test('services prefill the project and process navigation reveals its deliverables', async ({
  page,
}) => {
  await page.goto('/#approach')
  await page
    .locator('.process-navigation')
    .getByRole('button', { name: /Handoff/ })
    .click()
  await expect(page.getByRole('heading', { name: 'Launch with a clear handoff.' })).toBeVisible()
  await page.getByRole('button', { name: /A better place to shop/ }).click()
  await page.getByRole('button', { name: 'Plan an online shop' }).click()
  await expect(page.locator('.planner-summary')).toContainText('Online shop')
  await expect(page.getByRole('button', { name: 'Search & filters', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('old team bookmarks remain public planning information and link to the real planner', async ({
  page,
}) => {
  await page.goto('/#/team')
  await expect(page.getByRole('heading', { name: 'Team sign-in is not open yet.' })).toBeVisible()
  await expect(page.locator('input[type="password"]')).toHaveCount(0)
  await page.getByRole('link', { name: 'Try the personal project desk' }).click()
  await expect(page).toHaveURL(/#\/planner$/)
  await expect(page.getByRole('heading', { name: 'Your project desk.' })).toBeVisible()
})

test('layout remains contained from narrow phones to wide screens in both themes', async ({
  page,
}, info) => {
  test.skip(info.project.name === 'mobile', 'Desktop run exercises this viewport matrix.')
  await page.goto('/')
  for (const width of [320, 768, 1024, 2560]) {
    await page.setViewportSize({ width, height: 900 })
    for (const theme of ['dark', 'light']) {
      await page.evaluate((value) => {
        localStorage.setItem('sura.theme', value)
        document.documentElement.dataset.theme = value
      }, theme)
      for (const route of ['/', '/#/planner', '/#/team', '/#/updates']) {
        await page.goto(route)
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          route + ' at ' + width,
        ).toBe(true)
      }
    }
  }
})

test('skip navigation and back to top preserve every public page', async ({ page }) => {
  for (const route of ['/#/planner', '/#/team', '/#/updates']) {
    await page.goto(route)
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await skip.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('main')).toBeFocused()
    expect(new URL(page.url()).hash).toBe(route.slice(1))
    await page.getByRole('link', { name: 'Back to top', exact: true }).click()
    expect(new URL(page.url()).hash).toBe(route.slice(1))
    await expect(page.locator('main')).toBeFocused()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  }
})

test('checklist tabs preserve pending text and undo, and clear resets all temporary state', async ({
  page,
}) => {
  await page.goto('/#/planner')
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await page.getByLabel('Add a checklist step').fill('Keep this unfinished step')
  const first = 'Write down the main goal for the website'
  await page.getByRole('button', { name: 'Remove ' + first, exact: true }).click()
  await expect(page.getByRole('button', { name: 'Undo', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Project brief', exact: true }).click()
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await expect(page.getByLabel('Add a checklist step')).toHaveValue('Keep this unfinished step')
  await page.getByRole('button', { name: 'Undo', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Complete ' + first, exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Remove ' + first, exact: true }).click()
  await page.getByLabel('Find a checklist step').fill('a filter to clear')
  await page.getByRole('button', { name: 'Clear project', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Clear project', exact: true }).click()
  await expect(page.getByLabel('Add a checklist step')).toHaveValue('')
  await expect(page.getByLabel('Find a checklist step')).toHaveValue('')
  await expect(page.getByRole('button', { name: 'Undo', exact: true })).toHaveCount(0)
  await expect(page.locator('.task-row')).toHaveCount(6)
})

test('repeated concept prefill and brief-to-checklist navigation focus their new content', async ({
  page,
}) => {
  await page.goto('/#showcase')
  for (let attempt = 0; attempt < 2; attempt++) {
    await openConcept(page, 'Offday Objects')
    await page.getByRole('button', { name: 'Use this direction' }).click()
    await expect(page.getByRole('heading', { name: 'What should it include?' })).toBeFocused()
  }
  await page.goto('/#/planner')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await fillIdea(page)
  await page.getByRole('button', { name: 'Prepare my brief' }).click()
  await page.getByRole('button', { name: 'Plan your next steps with the launch checklist' }).click()
  await expect(page.getByRole('heading', { name: 'Make the next step clear.' })).toBeFocused()
})

test('a saved draft above the old JSON size limit restores without losing checklist text', async ({
  page,
}) => {
  await page.goto('/#/planner')
  await page.getByRole('button', { name: 'Save draft in this browser', exact: true }).click()
  // Escaped control characters expand in JSON. Seed a schema-valid large record,
  // then exercise an actual UI edit, save, and reload rather than only the reader.
  await page.evaluate(() => {
    const key = 'sura.project-draft.v1'
    const record = JSON.parse(localStorage.getItem(key)!)
    record.draft.tasks = Array.from({ length: 44 }, (_, index) => ({
      id: 'large-' + index,
      title: String.fromCharCode(1).repeat(180),
      status: 'To do',
    }))
    localStorage.setItem(key, JSON.stringify(record))
  })
  await page.reload()
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await expect(page.locator('.task-row')).toHaveCount(44)
  await page.getByLabel('Add a checklist step').fill('A readable final step')
  await page.getByRole('button', { name: 'Add step', exact: true }).click()
  await page.getByRole('button', { name: 'Save project in this browser' }).click()
  expect(
    await page.evaluate(() => localStorage.getItem('sura.project-draft.v1')!.length),
  ).toBeGreaterThan(40000)
  await page.reload()
  await page.getByRole('button', { name: 'Launch checklist', exact: true }).click()
  await expect(page.locator('.task-row')).toHaveCount(45)
  await expect(page.getByLabel('Status for A readable final step', { exact: true })).toBeVisible()
})

test('updates are discoverable, readable in both themes, and link to the project desk', async ({
  page,
}) => {
  await page.goto('/')
  await page.locator('footer').getByRole('link', { name: 'Updates', exact: true }).click()
  await expect(page).toHaveTitle('Updates — Sura')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('with every update.')
  await expect(page.getByText('0.2.0', { exact: true })).toBeVisible()
  for (const title of ['New', 'Changed', 'Fixed', 'What is still being built'])
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('link', { name: 'Try your project desk' }).click()
  await expect(page).toHaveURL(/#\/planner$/)
})

test('the production content security policy permits the real site and its interactions', async ({
  page,
}) => {
  const headersFile = await readFile(new URL('../public/_headers', import.meta.url), 'utf8')
  const csp = headersFile.match(/Content-Security-Policy: (.+)/)![1]!.trim()
  const violations: string[] = []
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      /Content Security Policy|violates|Refused to/i.test(message.text())
    )
      violations.push(message.text())
  })
  await page.route('http://127.0.0.1:4173/', async (route) => {
    const response = await route.fetch()
    await route.fulfill({
      response,
      headers: { ...response.headers(), 'Content-Security-Policy': csp },
    })
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await openConcept(page, 'Offday Objects')
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Save Arc chair', exact: true })
    .click()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  expect(violations).toEqual([])
})

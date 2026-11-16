import { expect, test } from '@playwright/test'

test('public site renders without runtime errors or horizontal overflow', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Your next chapter, online/ })).toBeVisible()
  await expect(page.locator('.concept-card')).toHaveCount(4)
  await page.screenshot({ path: `.artifacts/${testInfo.project.name}-home.png`, fullPage: true })
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(overflow).toBe(false)
  expect(errors).toEqual([])
})

test('visitors can filter a concept, dismiss its dialog, and start a relevant brief', async ({
  page,
}) => {
  await page.goto('/#showcase')
  await page.getByRole('button', { name: 'Shops', exact: true }).click()
  await expect(page.locator('.concept-card')).toHaveCount(1)
  const explore = page.getByRole('button', { name: 'Explore Offday, Shops website concept' })
  await explore.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Offday', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(explore).toBeFocused()
  await explore.click()
  await page.getByRole('button', { name: 'Start with this idea' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByLabel('What kind of business?')).toHaveValue('Shops')
  await expect(page).toHaveURL(/#start$/)
})

test('brief stays local, preserves typed text, and offers copy and a real text download', async ({
  page,
  context,
}) => {
  const writes: string[] = []
  page.on('request', (request) => {
    if (request.method() !== 'GET') writes.push(request.url())
  })
  await page.goto('/#start')
  await page.getByLabel('Your name').fill('A Visitor')
  await page.getByLabel('Business name').fill('Example & Co')
  const idea = 'A café website — with a menu, opening hours, and literal <b>text</b>. ☕'
  await page.getByLabel('Tell us a little about your idea').fill(idea)
  await page.getByRole('button', { name: 'Prepare my project brief' }).click()
  await expect(page.getByLabel('Prepared project brief')).toHaveValue(new RegExp('Example & Co'))
  await expect(page.getByLabel('Prepared project brief')).toHaveValue(
    new RegExp('literal <b>text</b>'),
  )
  expect(await page.getByLabel('Prepared project brief').inputValue()).toContain(idea)
  await expect(page.getByText(/it has not been sent/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open email app' })).toHaveCount(0)
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: 'Copy brief', exact: true }).click()
  await expect(page.getByText('Brief copied. You can share it when you are ready.')).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(idea)
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download .txt' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('sura-project-brief.txt')
  expect(await download.failure()).toBeNull()
  expect(writes).toEqual([])
  await page.reload()
  await expect(page.getByLabel('Prepared project brief')).toHaveCount(0)
})

test('team planning page is public and returns to the gallery through navigation', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Team space' }).click()
  await expect(page.getByRole('heading', { name: 'Team sign-in is not open yet.' })).toBeVisible()
  await expect(page.locator('input[type="password"]')).toHaveCount(0)
  const menu = page.getByRole('button', { name: 'Open navigation' })
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('navigation').getByRole('link', { name: 'Explore concepts' }).click()
  await expect(page.getByRole('heading', { name: /See your business/ })).toBeVisible()
  await expect(page.locator('.concept-card')).toHaveCount(4)
})

test('narrow layout and FAQ remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'Our approach' }).click()
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.getByText('I only have an idea. Is that enough?').click()
  await expect(page.getByText(/You do not need a technical plan/)).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
})

import { readFile, writeFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

test('the complete homepage renders, stays responsive, and supports its controls', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  const response = await page.goto('/')
  expect(response?.ok()).toBeTruthy()
  const contentResponse = await page.request.get('/content/homepage.json')
  const content = await contentResponse.json() as { hero: { title: string } }
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.hero.title)
  await expect(page.getByRole('heading', { name: 'Frequently asked questions.' })).toBeVisible()
  await expect(page.locator('.community-photos img')).toHaveCount(22)

  const gallery = page.locator('.feature-photo figcaption')
  const initialPhoto = await gallery.textContent()
  await page.getByRole('button', { name: 'Next photo' }).click()
  await expect(gallery).not.toHaveText(initialPhoto ?? '')

  await page.getByText('How do I choose my outfit?', { exact: true }).click()
  await expect(page.getByText(/Explore the collection gallery/)).toBeVisible()
  await expect(page.locator('.faq-list details[open]')).toHaveCount(1)

  for (const width of [320, 390, 768, 1465]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  }
  expect(pageErrors).toEqual([])
})

test('the local editor publishes content that the site reads on refresh', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'CMS write round-trip runs once.')
  const path = 'apps/web/public/content/homepage.json'
  const backup = await readFile(path)
  const content = JSON.parse(backup.toString()) as { hero: { title: string } }
  const originalTitle = content.hero.title
  const updatedTitle = `CMS verified title ${Date.now()}`
  const readPublishedTitle = async () => {
    const response = await page.request.get('/content/homepage.json')
    const published = await response.json() as { hero: { title: string } }
    return published.hero.title
  }

  try {
    await page.goto('/admin/')
    await page.getByRole('button', { name: 'Login', exact: true }).click()
    await page.getByText('Homepage', { exact: true }).click()
    await page.locator('#hero-field-8').getByRole('button', { name: 'Expand' }).first().click()
    await page.locator('input[id^="title-field-"]').first().fill(updatedTitle)
    await page.getByRole('button', { name: 'Publish', exact: true }).click()
    await page.getByText('Publish now', { exact: true }).click()
    await expect.poll(readPublishedTitle).toBe(updatedTitle)
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(updatedTitle)

    expect(await readPublishedTitle()).toBe(updatedTitle)
  } finally {
    // CMS integration test content is always rolled back, including a failed assertion.
    await writeFile(path, backup)
  }
})

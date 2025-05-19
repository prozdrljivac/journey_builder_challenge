import { expect, test } from '@playwright/test'

test.use({ baseURL: 'http://localhost:5173' })

test.describe('Journey Builder App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders list of form nodes', async ({ page }) => {
    const heading = page.locator('h1.title')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Nodes')

    const items = page.getByTestId('node-list-item')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
  })

  test('opens sidebar when clicking on a node list item', async ({ page }) => {
    const heading = page.locator('h1.title')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Nodes')

    const items = page.getByTestId('node-list-item')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)

    const firstItem = items.first()
    await expect(firstItem).toBeVisible()
    await firstItem.click()

    const sidebar = page.locator('aside.sidebar.open')
    await expect(sidebar).toBeVisible()

    await expect(sidebar.locator('h1', { hasText: 'Prefill' })).toBeVisible()
  })
})

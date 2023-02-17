import { test, expect } from '@playwright/test'

test('should open the app correctly', async ({ page }) => {
    await page.goto('/')
    const titleLocator = page.locator('h1')
    await expect(titleLocator).toHaveText('Welcome to PokeApp!')
})

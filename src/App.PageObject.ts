import { Locator, Page } from '@playwright/test'

const AppPO = (page: Page) => {
    const goToRoot = async () => {
        await page.goto('/')
    }

    const getWelcomeTitle = () => {
        const titleLocator: Locator = page.locator(
            '[data-testid="poke-app-welcome"]'
        )

        return titleLocator.innerText()
    }

    return {
        goToRoot,
        getWelcomeTitle,
    }
}

export default AppPO

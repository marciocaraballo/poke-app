import { Page } from '@playwright/test'

const PokeDetailsPO = (page: Page) => {
    /** Wait for any data piece to appear */
    const waitForDetails = async () => {
        return await page
            .locator('[data-testid="pokemon-details-name"]')
            .waitFor({ state: 'visible' })
    }

    const getName = async () => {
        const pokemonNameLocator = page.locator(
            '[data-testid="pokemon-details-name"]'
        )

        return await pokemonNameLocator.innerText()
    }

    return {
        waitForDetails,
        getName,
    }
}

export default PokeDetailsPO

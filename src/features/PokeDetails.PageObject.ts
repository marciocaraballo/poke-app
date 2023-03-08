import { Page } from '@playwright/test'

const NAME_TID = 'pokemon-details-name'

const PokeDetailsPO = (page: Page) => {
    /** Wait for any data piece to appear */
    const waitForDetails = async () => {
        return await page
            .locator(`[data-testid=${NAME_TID}]`)
            .waitFor({ state: 'visible' })
    }

    const getName = async () => {
        const pokemonNameLocator = page.locator(`[data-testid=${NAME_TID}]`)

        return await pokemonNameLocator.innerText()
    }

    return {
        waitForDetails,
        getName,
    }
}

export default PokeDetailsPO

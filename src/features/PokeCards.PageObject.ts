import { Locator, Page } from '@playwright/test'
import CardPO, { CardPageObject } from '../components/Card.PageObject'

const PokeCardsPO = (page: Page) => {
    /** Wait for any card to be visible, so API loaded as expected and cards can be located */
    const waitForACardIsVisibile = async () => {
        return await page
            .locator('[data-testid="poke-card"]')
            .nth(0)
            .waitFor({ state: 'visible' })
    }

    const getCardByIndex = (index: number): CardPageObject => {
        const cards: Locator = page.locator('[data-testid="poke-card"]')

        const cardPO = CardPO(cards.nth(index))

        return cardPO
    }

    return {
        waitForACardIsVisibile,
        getCardByIndex,
    }
}

export default PokeCardsPO

import { Locator, Page } from '@playwright/test'
import CardPO, { CardPageObject } from '../components/Card.PageObject'

const POKE_CARD_TID = 'poke-card'
const POKE_CARDS_LOADING_TID = 'poke-cards-loading'

const PokeCardsPO = (page: Page) => {
    /** Wait for any card to be visible, so API loaded as expected and cards can be located */
    const waitForACardIsVisibile = async () => {
        await page
            .locator(`[data-testid=${POKE_CARD_TID}]`)
            .nth(0)
            .waitFor({ state: 'visible' })
    }

    const getCardByIndex = (index: number): CardPageObject => {
        const cards: Locator = page.locator(`[data-testid=${POKE_CARD_TID}]`)

        const cardPO = CardPO(cards.nth(index))

        return cardPO
    }

    const waitForCardsLoading = async () => {
        await page
            .locator(`[data-testid=${POKE_CARDS_LOADING_TID}]`)
            .waitFor({ state: 'attached' })
    }

    const waitForCardsFinishedLoading = async () => {
        await page
            .locator(`[data-testid=${POKE_CARDS_LOADING_TID}]`)
            .waitFor({ state: 'detached' })
    }

    return {
        waitForCardsLoading,
        waitForCardsFinishedLoading,
        waitForACardIsVisibile,
        getCardByIndex,
    }
}

export default PokeCardsPO

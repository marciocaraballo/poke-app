import { Locator } from '@playwright/test'

interface CardPageObject {
    readonly getName: () => Promise<string>
    readonly click: Function
}

const CardPO = (card: Locator): CardPageObject => {
    const getName = async () => {
        return await card.innerText()
    }

    const click = () => {
        card.click()
    }

    return {
        getName,
        click,
    }
}

export default CardPO
export type { CardPageObject }

import { test, expect } from '@playwright/test'
import AppPO from '../App.PageObject'
import PokeCardsPO from './PokeCards.PageObject'
import PokeDetailsPO from './PokeDetails.PageObject'

test.describe('PokeDetails', () => {
    test('should render a details panel for a selected pokemon', async ({
        page,
    }) => {
        let appPO = AppPO(page)
        let pokeCardsPO = PokeCardsPO(page)
        let pokeDetailsPO = PokeDetailsPO(page)

        await appPO.goToRoot()

        await pokeCardsPO.waitForACardIsVisibile()

        pokeCardsPO.getCardByIndex(1).click()

        await pokeDetailsPO.waitForDetails()

        await expect(await pokeDetailsPO.getName()).toEqual('Ivysaur')
    })
})

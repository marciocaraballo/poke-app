import { test, expect } from '@playwright/test'
import AppPO from './App.PageObject'
import PokeCardsPO from './features/PokeCards.PageObject'

test.describe('App', () => {
    test('should open the app correctly', async ({ page }) => {
        let appPO = AppPO(page)

        await appPO.goToRoot()

        const title = await appPO.getWelcomeTitle()

        await expect(title).toEqual('Welcome to PokeApp!')
    })

    test('should render a pokemon list', async ({ page }) => {
        let appPO = AppPO(page)
        let pokeCardsPO = PokeCardsPO(page)

        await appPO.goToRoot()

        await pokeCardsPO.waitForACardIsVisibile()

        const firstPokemon = pokeCardsPO.getCardByIndex(0)

        await expect(await firstPokemon.getName()).toEqual('Bulbasaur')
    })
})

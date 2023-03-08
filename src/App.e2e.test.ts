import { test, expect } from '@playwright/test'
import AppPO from './App.PageObject'
import PokeCardsPO from './features/PokeCards.PageObject'
import PokeDetailsPO from './features/PokeDetails.PageObject'
import PokeAbilitiesPO from './features/PokeAbilities.PageObject'

test.describe('App.e2e.test', () => {
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

    test('should filter pokemon list by abilities', async ({ page }) => {
        let appPO = AppPO(page)
        let pokeCardsPO = PokeCardsPO(page)
        let pokeFiltersPO = PokeAbilitiesPO(page)

        await appPO.goToRoot()

        await pokeCardsPO.waitForACardIsVisibile()

        await pokeFiltersPO.chooseAbility('stench')

        await pokeFiltersPO.clickApply()

        await pokeCardsPO.waitForCardsLoading()

        await pokeCardsPO.waitForCardsFinishedLoading()

        const firstPokemon = pokeCardsPO.getCardByIndex(0)

        await expect(await firstPokemon.getName()).toEqual('Gloom')
    })
})

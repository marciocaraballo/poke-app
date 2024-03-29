import { test, expect } from '@playwright/test'
import AppPO from '../App.PageObject'
import PokeCardsPO from './PokeCards.PageObject'
import PokeAbilitiesPO from './PokeAbilities.PageObject'

test.describe('PokeFilters', () => {
    test('should filter pokemon list by abilities', async ({ page }) => {
        let appPO = AppPO(page)
        let pokeCardsPO = PokeCardsPO(page)
        let pokeAbilitiesPO = PokeAbilitiesPO(page)

        await appPO.goToRoot()

        await pokeCardsPO.waitForACardIsVisibile()

        await pokeAbilitiesPO.chooseAbility('stench')

        await pokeCardsPO.waitForCardsLoading()

        await pokeCardsPO.waitForCardsFinishedLoading()

        const firstPokemon = pokeCardsPO.getCardByIndex(0)

        await expect(await firstPokemon.getName()).toEqual('Gloom')
    })
})

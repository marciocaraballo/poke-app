import { Page } from '@playwright/test'

import SelectPO from '../components/Select.PageObject'

const ABILITIES_SELECT_TID = 'abilities-select'

const PokeAbilitiesPO = (page: Page) => {
    const abilitiesSelectPO = SelectPO(page, ABILITIES_SELECT_TID)

    const chooseAbility = async (ability: string) => {
        await abilitiesSelectPO.open()
        await abilitiesSelectPO.select(ability)
    }

    const clickApply = async () => {
        const applyButton = page.getByRole('button', { name: 'Apply' })

        await applyButton.click()
    }

    return {
        chooseAbility,
        clickApply,
    }
}

export default PokeAbilitiesPO

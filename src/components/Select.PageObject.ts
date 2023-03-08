import { Page } from '@playwright/test'

const SelectPO = (page: Page, rootTestId: string) => {
    const selectLocator = page.locator(`[data-testid=${rootTestId}]`)

    const open = async () => {
        await selectLocator.click()
    }

    const select = async (option: string) => {
        const options = selectLocator.getByText(option, { exact: true })

        await options.click()
    }

    return {
        open,
        select,
    }
}

export default SelectPO

import { render, screen, fireEvent } from '@testing-library/react'
import PokeFilters, { PokeFiltersProps } from './PokeFilters'

jest.mock('./PokeAbilities', () => () => 'PokeAbilities')

describe('<PokeFilters/>', () => {
    let props: PokeFiltersProps

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        props = {
            pageSize: 10,
            setPageSize: jest.fn(),
            nameOrIdFilter: '',
            setNameOrIdFilter: jest.fn(),
            setPokemonList: jest.fn(),
            setIsApiDown: jest.fn(),
            setPokemonListIsLoading: jest.fn(),
            pokemonListIsLoading: false,
        }
    })

    it('should call setPageSize() with expected params when changing select', () => {
        render(<PokeFilters {...props} />)

        const select = screen.getByTestId('page-size-select')

        fireEvent.change(select, { target: { value: '50' } })

        expect(props.setPageSize).toHaveBeenCalledWith(50)
    })

    it('should call setNameOrIdFilter() with expected params when changing nameOrFilter input', () => {
        render(<PokeFilters {...props} />)

        const input = screen.getByPlaceholderText('Enter Pokemon name or ID')

        fireEvent.change(input, { target: { value: 'abra' } })

        expect(props.setNameOrIdFilter).toHaveBeenCalledWith('abra')
    })

    it('should call setNameOrIdFilter() with expected params when clicking Clear button', () => {
        render(<PokeFilters {...props} nameOrIdFilter="nameOrIdFilter" />)

        const button = screen.getByRole('button', { name: 'Clear' })

        fireEvent.click(button)

        expect(props.setNameOrIdFilter).toHaveBeenCalledWith('')
    })

    it('should set Clear button disabled when nameOrIdFilter is empty string', () => {
        render(<PokeFilters {...props} nameOrIdFilter="" />)

        const button = screen.getByRole('button', { name: 'Clear' })

        fireEvent.click(button)

        expect(button).toBeDisabled()
    })
})

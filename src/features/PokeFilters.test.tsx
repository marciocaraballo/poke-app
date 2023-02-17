import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PokeFilters, { PokeFiltersProps } from './PokeFilters'

import { listPokemons, getPokemonsByAbilities } from '../utils/fetch'

const mockListPokemons = listPokemons as jest.MockedFunction<
    typeof listPokemons
>
const mockGetPokemonsByAbilities =
    getPokemonsByAbilities as jest.MockedFunction<typeof getPokemonsByAbilities>

jest.mock('../utils/fetch')

describe('<PokeFilters/>', () => {
    let props: PokeFiltersProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            pageSize: 10,
            setPageSize: jest.fn(),
            nameOrIdFilter: '',
            setNameOrIdFilter: jest.fn(),
            abilitiesFilter: '',
            setAbilitiesFilter: jest.fn(),
            setPokemonList: jest.fn(),
            setIsApiDown: jest.fn(),
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

    it('should call setAbilitiesFilter() with expected params when changing nameOrFilter input', () => {
        render(<PokeFilters {...props} />)

        const input = screen.getByPlaceholderText(
            'Enter abilities comma separated list'
        )

        fireEvent.change(input, { target: { value: 'overgrow,run' } })

        expect(props.setAbilitiesFilter).toHaveBeenCalledWith('overgrow,run')
    })

    it('should call setPokemonList() when appliedFilters is empty', async () => {
        await mockListPokemons.mockResolvedValue({
            count: 1,
            next: null,
            previous: null,
            results: [{ name: 'abra', url: 'url/abra' }],
        })

        render(<PokeFilters {...props} />)

        const button = screen.getByTestId('apply-button')

        fireEvent.click(button)

        await waitFor(() => {
            expect(props.setPokemonList).toHaveBeenCalled()
        })
    })

    it('should call setPokemonList() when abilitiesFilter is not empty', async () => {
        await mockGetPokemonsByAbilities.mockResolvedValue([
            { name: 'abra', url: 'url/abra' },
        ])

        render(<PokeFilters {...props} abilitiesFilter="overgrow" />)

        const button = screen.getByTestId('apply-button')

        fireEvent.click(button)

        await waitFor(() => {
            expect(props.setPokemonList).toHaveBeenCalledWith([
                { name: 'abra', url: 'url/abra' },
            ])
        })
    })
})

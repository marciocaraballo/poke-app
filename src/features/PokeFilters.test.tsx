import { render, screen, fireEvent } from '@testing-library/react'
import PokeFilters, { PokeFiltersProps } from './PokeFilters'

jest.mock('../utils/fetch')
jest.mock('./PokeAbilities', () => () => 'PokeAbilities')

describe('<PokeFilters/>', () => {
    let props: PokeFiltersProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            pageSize: 10,
            setPageSize: jest.fn(),
            nameOrIdFilter: '',
            setNameOrIdFilter: jest.fn(),
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
})

import { render, screen, fireEvent } from '@testing-library/react'
import PokeGrid, { PokeGridProps } from './PokeGrid'
import filterPokemonList from '../utils/filterPokemonList'

jest.mock('../utils/filterPokemonList')

const mockFilterPokemonList = filterPokemonList as jest.MockedFunction<
    typeof filterPokemonList
>

describe('<PokeGrid/>', () => {
    let props: PokeGridProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            nameOrIdFilter: '',
            pokemonList: [],
            setSelectedPokemonUrl: jest.fn(),
            pageSize: 10,
        }
    })

    it('should render a message if filtered pokemon list is empty', () => {
        mockFilterPokemonList.mockReturnValue([])

        render(<PokeGrid {...props} />)

        expect(
            screen.getByText('No pokemons are available!')
        ).toBeInTheDocument()
    })

    it('should render a pokemon card', () => {
        mockFilterPokemonList.mockReturnValue([
            { name: 'pokemonName', url: 'url' },
        ])

        render(<PokeGrid {...props} />)

        expect(screen.getByText('pokemonName')).toBeInTheDocument()
    })

    it('should call setSelectedPokemonUrl() with expected params on card click', () => {
        mockFilterPokemonList.mockReturnValue([
            { name: 'pokemonName', url: 'url' },
        ])

        render(<PokeGrid {...props} />)

        const card = screen.getByText('pokemonName')

        fireEvent.click(card)

        expect(props.setSelectedPokemonUrl).toHaveBeenCalledWith('url')
    })
})

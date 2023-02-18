import { render, screen, fireEvent } from '@testing-library/react'
import PokeCards, { PokeCardsProps } from './PokeCards'
import filterPokemonList from '../utils/filterPokemonList'

jest.mock('../utils/filterPokemonList')

const mockFilterPokemonList = filterPokemonList as jest.MockedFunction<
    typeof filterPokemonList
>

describe('<PokeCards/>', () => {
    let props: PokeCardsProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            nameOrIdFilter: '',
            pokemonList: [],
            setSelectedPokemonUrl: jest.fn(),
            pageSize: 10,
            pokemonListIsLoading: false,
        }
    })

    it('should render a message if filtered pokemon list is empty', () => {
        mockFilterPokemonList.mockReturnValue([])

        render(<PokeCards {...props} />)

        expect(
            screen.getByText('No pokemons are available!')
        ).toBeInTheDocument()
    })

    it('should render a pokemon card', () => {
        mockFilterPokemonList.mockReturnValue([
            { name: 'pokemonName', url: 'url' },
        ])

        render(<PokeCards {...props} />)

        expect(screen.getByText('pokemonName')).toBeInTheDocument()
    })

    it('should call setSelectedPokemonUrl() with expected params on card click', () => {
        mockFilterPokemonList.mockReturnValue([
            { name: 'pokemonName', url: 'url' },
        ])

        render(<PokeCards {...props} />)

        const card = screen.getByText('pokemonName')

        fireEvent.click(card)

        expect(props.setSelectedPokemonUrl).toHaveBeenCalledWith('url')
    })

    it('should render loading state when pokemonListIsLoading=true', () => {
        render(<PokeCards {...props} pokemonListIsLoading={true} />)

        expect(screen.getByTestId('poke-cards-loading')).toBeInTheDocument()
    })
})

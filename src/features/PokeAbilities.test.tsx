import selectEvent from 'react-select-event'
import { render, screen, fireEvent } from '@testing-library/react'
import PokeAbilities, { PokeAbilitiesProps } from './PokeAbilities'

import {
    listAbilities,
    listPokemons,
    getPokemonsByAbilities,
} from '../utils/fetch'

jest.mock('../utils/fetch')

const mockListAbilities = listAbilities as jest.MockedFunction<
    typeof listAbilities
>

const mockGetPokemonsByAbilities =
    getPokemonsByAbilities as jest.MockedFunction<typeof getPokemonsByAbilities>

const mockListPokemon = listPokemons as jest.MockedFunction<typeof listPokemons>

describe('<PokeAbilities/>', () => {
    let props: PokeAbilitiesProps

    beforeEach(() => {
        jest.resetModules()

        props = {
            setIsApiDown: jest.fn(),
            setPokemonList: jest.fn(),
        }
    })

    it('should render without breaking', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: '' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        expect(screen.getByText('ability-2')).toBeInTheDocument()
    })

    it('should call getPokemonsByAbilities() with selected abilities', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        const apply = screen.getByTestId('apply-button')

        fireEvent.click(apply)

        expect(mockGetPokemonsByAbilities).toHaveBeenCalledWith(['ability-2'])
    })

    it('should call listPokemons() when no abilities selected', async () => {
        await mockListAbilities.mockResolvedValue([
            {
                name: 'ability-1',
                url: 'url/ability-1',
            },
            {
                name: 'ability-2',
                url: 'url/ability-2',
            },
            {
                name: 'ability-3',
                url: 'url/ability-3',
            },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        await selectEvent.clearAll(
            await screen.findByLabelText('Filter by abilities:')
        )

        const apply = screen.getByTestId('apply-button')

        fireEvent.click(apply)

        expect(mockListPokemon).toHaveBeenCalled()
    })
})

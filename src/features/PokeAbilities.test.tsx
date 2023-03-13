import selectEvent from 'react-select-event'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PokeAbilities, { PokeAbilitiesProps } from './PokeAbilities'
import toast from 'react-hot-toast'

import {
    listAbilities,
    listPokemons,
    getPokemonsByAbilities,
} from '../api/fetch'

jest.mock('../api/fetch')
jest.mock('react-hot-toast')

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
        jest.resetAllMocks()

        toast.error = jest.fn()

        props = {
            setIsApiDown: jest.fn(),
            setPokemonList: jest.fn(),
            setPokemonListIsLoading: jest.fn(),
            pokemonListIsLoading: false,
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

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        expect(mockGetPokemonsByAbilities).toHaveBeenCalledWith(['ability-2'])
    })

    it('should call setPokemonList() with API call response when abilities are selected', async () => {
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

        await mockGetPokemonsByAbilities.mockResolvedValue([
            { name: 'abra', url: 'url/abra' },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setPokemonList).toHaveBeenCalledWith([
                { name: 'abra', url: 'url/abra' },
            ])
        })
    })

    it('should call setApiDown(false) when API call was successful and abilities are selected', async () => {
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

        await mockGetPokemonsByAbilities.mockResolvedValue([
            { name: 'abra', url: 'url/abra' },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setIsApiDown).toHaveBeenCalledWith(false)
        })
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

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        expect(mockListPokemon).toHaveBeenCalled()
    })

    it('should call setPokemonList() with API Call response when no abilities are selected', async () => {
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

        await mockListPokemon.mockResolvedValue([
            { name: 'pikachu', url: 'url/pikachu' },
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

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setPokemonList).toHaveBeenCalledWith([
                { name: 'pikachu', url: 'url/pikachu' },
            ])
        })
    })

    it('should call setIsApiDown(false) when API call was successful and no abilities are selected', async () => {
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

        await mockListPokemon.mockResolvedValue([
            { name: 'pikachu', url: 'url/pikachu' },
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

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setIsApiDown).toHaveBeenCalledWith(false)
        })
    })

    it('should call toast.error() when listAbilities() rejects', async () => {
        await mockListAbilities.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<PokeAbilities {...props} />)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Something went wrong with API call'
            )
        })
    })

    it('should call setIsApiDown(true) when listAbilities() rejects', async () => {
        await mockListAbilities.mockRejectedValue(
            new Error('Something went wrong', { cause: 500 })
        )

        render(<PokeAbilities {...props} />)

        await waitFor(() => {
            expect(props.setIsApiDown).toHaveBeenCalledWith(true)
        })
    })

    it('should call setPokemonListIsLoading(true) when clicking Apply', async () => {
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

        await mockGetPokemonsByAbilities.mockResolvedValue([
            { name: 'abra', url: 'url/abra' },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setPokemonListIsLoading).toHaveBeenCalledWith(true)
        })
    })

    it('should call setPokemonListIsLoading(false) when api call resolves', async () => {
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

        await mockGetPokemonsByAbilities.mockResolvedValue([
            { name: 'abra', url: 'url/abra' },
        ])

        render(<PokeAbilities {...props} />)

        fireEvent.change(await screen.findByLabelText('Filter by abilities:'), {
            target: { value: 'ability' },
        })

        await selectEvent.select(
            await screen.findByLabelText('Filter by abilities:'),
            'ability-2'
        )

        const apply = screen.getByText('Apply')

        fireEvent.click(apply)

        await waitFor(() => {
            expect(props.setPokemonListIsLoading).toHaveBeenCalledWith(false)
        })
    })
})
